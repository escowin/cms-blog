// mvc | view routes
const router = require("express").Router();
// const sequelize = require("../config/connection");
const { User, Journal, Entry } = require("../models");

// rendering views
// - homepage template
router.get("/", (req, res) => {
  console.log(req.session);

  Journal.findAll({
    attributes: ["id", "description", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Entry,
        attributes: ["id", "entry_text", "journal_id", "user_id", "created_at"],
        // include: {
        //   model: User,
        //   attributes: ["username"],
        // },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbJournalData) => {
      // to display every post without issue
      const journals = dbJournalData.map((journal) => journal.get({ plain: true }));
      res.render("homepage", {
        journals,
        loggedIn: req.session.loggedIn,
        customstyle: '<link rel="stylesheet" href="/css/homepage.css">',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - login template
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    customstyle: '<link rel="stylesheet" href="/css/login.css">',
  });
});

// - single post template
router.get("/post/:id", (req, res) => {
  Journal.findOne({
    where: { id: req.params.id },
    attributes: ["id", "description", "title", "created_at"],
    include: [
      {
        model: Entry,
        attributes: ["id", "entry_text", "journal_id", "user_id", "created_at"],
        // include: {
        //   model: User,
        //   attributes: ["username"],
        // },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbJournalData) => {
      if (!dbJournalData) {
        res.status(404).json({ message: "post not found" });
        return;
      }

      // serializes data
      const post = dbJournalData.get({ plain: true });

      // passes data to template, loggedIn allows for conditional rendering within the template
      res.render("single-journal", {
        post,
        loggedIn: req.session.loggedIn,
        customstyle: '<link rel="stylesheet" href="/css/single-journal.css">',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
