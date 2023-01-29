// mvc | view routes
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// rendering views
// - homepage template
router.get("/", (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ["id", "content", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
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
      // to display every post without issue
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
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
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
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

      // passes data to template, loggedIn allows for conditional rendering within the template
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        customstyle: '<link rel="stylesheet" href="/css/single-post.css">',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
