const { Journal, User, Entry } = require("../../models");

// crud methods
const journalController = {
  // read
  getAllJournals(req, res) {
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
        },
      ],
    })
      .then((dbJournalData) => res.json(dbJournalData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getJournalById(req, res) {
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
          order: [["entry_date", "DESC"]]
        },
      ],
      order: [[Entry, "entry_date", "DESC"]]
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
  },
  // create
  createJournal(req, res) {
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
  },
  // update
  updateJournal(req, res) {
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
  },
  // delete
  deleteJournal(req, res) {
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
  }
}

module.exports = journalController;
