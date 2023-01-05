const router = require("express").Router();
const { Comment, Post } = require("../../models");

// restful api | comments | /api/comments/
// - read
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// - create
router.post("/", (req, res) => {
  // when logged in
  //   if (req.session) {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    // session id
    user_id: req.body.user_id,
    //   user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  //   }
});

// - update
router.put("/:id", (req, res) => {
  Comment.update(
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
router.delete("/:id", (req, res) => {
  Post.destroy({
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
