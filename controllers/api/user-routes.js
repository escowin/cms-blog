const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get | users | /api/users
router.get("/", (req, res) => {
  // SELECT * FROM users;
  User.findAll({
    // reads user data aside from the password attribute
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// restful api | specific user | /api/users/:id
// - create
router.post("/:id", (req, res) => {
    // INSERT INTO users (username, email, password)
    // VALUES ('?', '?', '?');
    User.create({
        username: req.body.usernme,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// - read
router.get("/:id", (req, res) => {
    // SELECT * FROM users WHERE id = ?;
    User.findOne({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'user does not exist' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// - update
router.put("/:id", (req, res) => {
    // UPDATE users
    // SET username = '?', email='?', password='?'
    // WHERE id = ?;
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id,
        },
      })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "user does not exist" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
// - delete
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "user does not exist" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });

// logging in & out | create & destroy sessions
router.post("/login", (req, res) => {});
router.delete("/logout", (req, res) => {});

module.exports = router;
