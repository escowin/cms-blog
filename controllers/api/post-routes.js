const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// get | posts | /api/posts
router.get("/", (req, res) => {
  console.log("=== get all posts ====");
  Post.findAll({
    attributes: ["id", "content", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        // including the user model here allows the username to be attached to the comment
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// restful api | specific post | /api/posts/:id
// - create | accessible only to session user
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - read
router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        // including the user model here allows the username to be attached to the comment
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
        res.status(404).json({ message: "post does not exist" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - update | accessible only to session user
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        req.status(404).json({ message: "post does not exist" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - delete | accessible only to session user
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "post does not exist" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
