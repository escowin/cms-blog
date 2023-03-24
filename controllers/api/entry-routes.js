const router = require("express").Router();
const { Entry, Journal, EntryTag, Tag } = require("../../models");
const withAuth = require("../../utils/auth");

// restful api | comments | /api/comments/
// - read
router.get("/", (req, res) => {
  Entry.findAll()
    .then((dbEntryData) => res.json(dbEntryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - create | accessible only to session user
router.post("/", withAuth, (req, res) => {
  // only logged in users can comment on posts as the user id is tied to the corresponding session user id
  if (req.session) {
    Entry.create({
      entry_date: req.body.entry_date,
      entry_weight: req.body.entry_weight,
      entry_text: req.body.entry_text,
      journal_id: req.body.journal_id,
      user_id: req.session.user_id,
    })
      .then((dbEntryData) => res.json(dbEntryData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// - get an entry
router.get("/:id", withAuth, (req, res) => {
  if (req.session) {
    Entry.findOne({
      where: { id: req.params.id },
      attributes: ["id", "entry_date", "entry_weight", "entry_text", "user_id", "journal_id"],
      include: [
        {
          model: Journal,
          attributes: ["id", "title"],
        },
        {
          model: Tag,
          through: EntryTag,
        }
      ],
    })
      .then((dbEntryData) => res.json(dbEntryData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});
// - update
router.put("/:id", withAuth, (req, res) => {
  Entry.update(
    {
      title: req.body.title,
      entry_text: req.body.entry_text,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbEntryData) => {
      if (!dbEntryData) {
        req.status(404).json({ message: "comment does not exist" });
        return;
      }
      res.json(dbEntryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
