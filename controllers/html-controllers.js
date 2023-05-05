const { User, Tag, Journal, Entry, EntryTag } = require("../models");

const htmlController = {
  editEntryView(req, res) {
    Entry.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "entry_text",
        "entry_date",
        "entry_weight",
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
      .then((dbEntryData) => {
        if (!dbEntryData) {
          res.status(404).json({ message: "entry not found" });
          return;
        }
        const entry = dbEntryData.get({ plain: true });
        res.render("edit-entry", {
          entry,
          loggedIn: true,
          viewStyle: '<link rel="stylesheet" href="/css/edit-view.css">',
          viewScript: '<script defer src="/javascript/edit-entry.js"></script>',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  editJournalView(req, res) {
    Journal.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "title",
        "description",
        "start_date",
        "end_date",
        "duration",
      ],
    })
      .then((dbJournalData) => {
        if (!dbJournalData) {
          console.log(err);
          res.status(404).json({ message: `journal #${id} not found` });
          return;
        }
        const journal = dbJournalData.get({ plain: true });
        res.render("edit-journal", {
          journal,
          loggedIn: true,
          viewStyle: '<link rel="stylesheet" href="/css/edit-view.css">',
          viewScript:
            '<script defer src="/javascript/edit-journal.js"></script>',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  editTagView(req, res) {
    Tag.findOne({
      where: { id: req.params.id },
      attributes: ["id", "tag_name"],
    })
      .then((dbTagData) => {
        if (!dbTagData) {
          res.status(404).json({ message: "tag does not exist" });
          return;
        }
        const tag = dbTagData.get({ plain: true });
        res.render("edit-tag", {
          tag,
          loggedIn: true,
          viewStyle: '<link rel="stylesheet" href="/css/edit-view.css">',
          viewScript: '<script defer src="/javascript/edit-tag.js"></script>',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  homepageView(req, res) {
    if (req.session.user_id) {
      // only journals belonging to the user are retrieved
      User.findOne({
        where: { id: req.session.user_id },
        attributes: ["id", "username"],
        include: [
          {
            model: Journal,
            attributes: [
              "id",
              "title",
              "description",
              "start_date",
              "end_date",
              "duration",
            ],
            order: [["end_date", "DESC"]],
            include: Entry,
          },
        ],
      })
        .then((dbUserData) => {
          const user = dbUserData.get({ plain: true });
          res.render("homepage", {
            user,
            loggedIn: req.session.loggedIn,
            viewStyle: `
            <link rel="stylesheet" href="/css/homepage.css">
            <link rel="stylesheet" href="/css/partial-journal-form.css">`,
            viewScript: `
            <script defer src="/javascript/add-journal.js"></script>
            <script defer src="/javascript/delete-journal.js"></script>`,
          });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      res.render("homepage");
    }
  },
  journalView(req, res) {
    Journal.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "title",
        "description",
        "start_date",
        "end_date",
        "duration",
      ],
      include: [
        {
          model: Entry,
          attributes: ["id", "entry_date", "entry_weight", "entry_text"],
          include: [
            {
              model: Tag,
              through: EntryTag,
              attributes: ["id", "tag_name"],
            },
          ],
          order: [["entry_date", "DESC"]],
        },
      ],
      order: [[Entry, "entry_date", "DESC"]],
    })
      .then((dbJournalData) => {
        if (!dbJournalData) {
          res.status(404).json({ message: "post not found" });
          return;
        }

        // serializes data
        const journal = dbJournalData.get({ plain: true });
        res.render("journal", {
          journal,
          loggedIn: req.session.loggedIn,
          viewStyle: `
            <link rel="stylesheet" href="/css/journal.css">
            <link rel="stylesheet" href="/css/partial-entry-form.css" />
            <link rel="stylesheet" href="/css/partial-entry-info.css" />
          `,
          viewScript: '<script defer src="/javascript/add-entry.js"></script>',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  profileView(req, res) {
    User.findOne({
      where: { id: req.session.user_id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Journal,
          attributes: ["id", "title", "end_date"],
          include: [
            {
              model: Entry,
              attributes: ["id", "entry_text"],
            },
          ],
          order: [["end_date", "DESC"]],
        },
        {
          model: Entry,
          attributes: [
            "id",
            "entry_text",
            "entry_date",
            "journal_id",
            "user_id",
          ],
          order: [["entry_date", "DESC"]],
        },
      ],
    })
      .then((dbUserData) => {
        // serializes user data before passing to template
        const user = dbUserData.get({ plain: true });
        res.render("profile", {
          user,
          loggedIn: true,
          viewStyle: '<link rel="stylesheet" href="/css/profile.css">',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  tagsView(req, res) {
    Tag.findAll({
      attributes: ["id", "tag_name"],
      order: [["tag_name", "ASC"]],
    })
      .then((dbTagData) => {
        const tags = dbTagData.map((tag) => tag.get({ plain: true }));
        res.render("tags", {
          tags,
          loggedIn: true,
          viewStyle: '<link rel="stylesheet" href="/css/tags.css">',
          viewScript: `
           <script defer src="/javascript/add-tag.js"></script>
           <script defer src="/javascript/delete-tag.js"></script>`,
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  entriesView(req, res) {
    User.findOne({
      where: { id: req.session.user_id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Entry,
          attributes: ["id", "entry_date", "entry_weight", "entry_text"],
          include: [
            {
              model: Journal,
              attributes: ["id", "title"],
            },
            {
              model: Tag,
              through: EntryTag,
              attributes: ["id", "tag_name"],
            },
          ],
          order: [["entry_date", "DESC"]],
        },
      ],
      order: [[Entry, "entry_date", "DESC"]],
    })
      .then((dbUserData) => {
        const user = dbUserData.get({ plain: true });
        res.render("entries", {
          user,
          loggedIn: req.session.loggedIn,
          viewStyle: '<link rel="stylesheet" href="/css/entries.css">',
        });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = htmlController;
