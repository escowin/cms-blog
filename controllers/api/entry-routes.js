const router = require("express").Router();
const { Entry, Journal, EntryTag, Tag } = require("../../models");
const withAuth = require("../../utils/auth");

// restful api end point | /api/entries/
// - read
router.get("/", (req, res) => {
  if (req.session) {
    Entry.findAll({
      attributes: [
        "id",
        "entry_date",
        "entry_weight",
        "entry_text",
        "user_id",
        "journal_id",
      ],
      include: [
        {
          model: Tag,
          through: EntryTag,
          attributes: ["id", "tag_name"],
        },
      ],
    })
      .then((dbEntryData) => res.json(dbEntryData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// - create | accessible only to session user
router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Entry.create({
      entry_date: req.body.entry_date,
      entry_weight: req.body.entry_weight,
      entry_text: req.body.entry_text,
      user_id: req.session.user_id,
      journal_id: req.body.journal_id,
    })
      .then((dbEntryData) => {
        if (req.body.tags && req.body.tags.length) {
          const entryTagIdArr = req.body.tags.map((tag_id) => {
            return {
              entry_id: dbEntryData.id,
              tag_id,
            };
          });
          return EntryTag.bulkCreate(entryTagIdArr);
        }
        res.status(200).json(dbEntryData);
      })
      .then((entryTagIds) => res.status(200).json(entryTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// restful api end point | /api/entries/:id
// - get an entry
router.get("/:id", withAuth, (req, res) => {
  if (req.session) {
    Entry.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Tag,
          through: EntryTag,
          attributes: ["id", "tag_name"],
        },
      ],
    })
      .then((dbEntryData) => res.json(dbEntryData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// - update by id
router.put("/:id", withAuth, (req, res) => {
  // updates an entry's key-value properties, locating it by its api endpoint
  Entry.update(
    {
      entry_date: req.body.entry_date,
      entry_weight: req.body.entry_weight,
      entry_text: req.body.entry_text,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbEntryData) => {
      // Remove old entry tags. the anon function  object is used as a placeholder to satisfy the returning a resolved promise requirement 
      return EntryTag.destroy({ where: { entry_id: req.params.id } });
    })
    .then(() => {
      // entry that includes an array of tags
      if (req.body.tags && req.body.tags.length) {
        // mapping the `tag_id` key-value to that of the `PUT` request body json `tags` array's matching key
        const entryTags = req.body.tags.map((tag_id) => {
          // objects in the array of tags are formatted to the EntryTag through table. this is how an association between tags & entries is possible.
          return {
            entry_id: req.params.id,
            tag_id,
          };
        });
        // creates a new array of tags in place of the old. this array
        return EntryTag.bulkCreate(entryTags);
      }
    })
    .then(() =>{
      return Entry.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Tag,
            through: EntryTag,
            attributes: ["id", "tag_name"]
          }
        ]
      });
    })
    .then(dbEntryData => res.status(200).json(dbEntryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// - delete
router.delete("/:id", withAuth, (req, res) => {
  Entry.destroy({
    where: { id: req.params.id },
  })
    .then((dbEntryData) => {
      if (!dbEntryData) {
        res.status(404).json({ message: "comment with this id not found" });
        return;
      }
      res.json(dbEntryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
