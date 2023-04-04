const router = require("express").Router();
const { Journal, User, Entry, EntryTag, Tag } = require("../../models");
const withAuth = require("../../utils/auth");

// get | posts | /api/posts
router.get("/", (req, res) => {
  console.log("=== get all posts ====");
  Journal.findAll({
    attributes: [
      "id",
      "title",
      "start_date",
      "end_date",
      "duration",
      "description",
      "created_at",
    ],
    order: [["start_date", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Entry,
        attributes: ["id", "entry_date", "entry_weight", "entry_text", "created_at"],
        order: [["start_date", "DESC"]],
      },
    ],
  })
    .then((dbJournalData) => res.json(dbJournalData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// restful api | specific post | /api/posts/:id
// - create | accessible only to session user
router.post("/", withAuth, (req, res) => {
  Journal.create({
    title: req.body.title,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    duration: req.body.duration,
    description: req.body.description,
    user_id: req.session.user_id,
  })
    .then((dbJournalData) => res.json(dbJournalData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - read
router.get("/:id", (req, res) => {
  Journal.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "start_date",
      "end_date",
      "duration",
      "description",
      "created_at",
    ],
    include: [
      {
        model: Entry,
        attributes: ["id", "entry_date", "entry_weight", "entry_text", "created_at"],
        order: [["start_date", "DESC"]],
      },
    ],
  })
    .then((dbJournalData) => {
      if (!dbJournalData) {
        res.status(404).json({ message: "journal does not exist" });
        return;
      }
      res.json(dbJournalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - update | accessible only to session user
router.put("/:id", withAuth, (req, res) => {
  Journal.update(
    {
      title: req.body.title,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      duration: req.body.duration,
      description: req.body.description,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbJournalData) => {
      if (!dbJournalData) {
        req.status(404).json({ message: "post does not exist" });
        return;
      }
      res.json(dbJournalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - delete | accessible only to session user
router.delete("/:id", withAuth, (req, res) => {
  Journal.destroy({
    where: { id: req.params.id },
  })
    .then((dbJournalData) => {
      if (!dbJournalData) {
        res.status(404).json({ message: "journal does not exist" });
        return;
      }
      res.json(dbJournalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
