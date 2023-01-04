const router = require("express").Router();
const { User } = require("../../models");

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
// - read
router.get("/:id", (req, res) => {
  // SELECT * FROM users WHERE id = ?;
  User.findOne({
    where: { id: req.params.id },
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

// - create
router.post("/", (req, res) => {
  // INSERT INTO users (username, email, password)
  // VALUES ('?', '?', '?');
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
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
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      // res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// logging in & out | create & destroy sessions
router.post("/login", (req, res) => {
  // finds user via email query. if found, that query is passed as dbUserData. 
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'user not found with this email'});
      return;
    }

    // verifies dbUserData's password by comparing the plain text with the object's stored hashed password.
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'incorrect password' });
      return;
    }

    // req.session.save(() => {
    //   // declared session variables
    //   req.session.user_id = dbUserData.id;
    //   req.session.username = dbUserData.username;
    //   req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'you are now logged in' });
    // });
  });
});
router.delete("/logout", (req, res) => {});

module.exports = router;
