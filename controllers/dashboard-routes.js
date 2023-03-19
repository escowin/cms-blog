const router = require("express").Router();
const { User, Journal, Entry } = require("../models");
const withAuth = require("../utils/auth");

// get | dashboard | /dashboard/ | accessible only to session user
router.get("/", withAuth, (req, res) => {
  Journal.findAll({
    where: { user_id: req.session.user_id },
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "description", "created_at"],
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
      // serializes data before passing to template
      const journals = dbJournalData.map((journal) => journal.get({ plain: true }));
      res.render("dashboard", {
        journals,
        loggedIn: true,
        customstyle: '<link rel="stylesheet" href="/css/dashboard.css">'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Journal.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "description", "created_at"],
    include: [
      {
        model: Entry,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      // serializes data
      const post = dbPostData.get({ plain: true });

      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
