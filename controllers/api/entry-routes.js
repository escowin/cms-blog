const router = require("express").Router();
const { Entry } = require("../../models");
const withAuth = require('../../utils/auth');

// restful api | comments | /api/comments/
// - read
router.get("/", (req, res) => {
  Entry.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
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
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then((dbCommentData) => res.json(dbCommentData))
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
      comment_text: req.body.comment_text,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        req.status(404).json({ message: "comment does not exist" });
        return;
      }
      res.json(dbCommentData);
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
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "comment with this id not found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
