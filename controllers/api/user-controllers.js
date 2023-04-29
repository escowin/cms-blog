// const router = require("express").Router();
const { User } = require("../../models");
// const withAuth = require('../../utils/auth');

// crud methods
const userController = {
  // read
  getAllUsers(req, res) {
    User.findAll({
      // reads user data aside from the password attribute
      attributes: { exclude: ["password"] },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUserById(req, res) {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.params.id },
      // include: [
      //   {
      //     model: Post,
      //     attributes: ['id', 'title', 'content', 'created_at']
      //   },
      //   {
      //     model: Comment,
      //     attributes: ['id', 'comment_text', 'created_at'],
      //     include: {
      //       model: Post,
      //       attributes: ['title']
      //     }
      //   },
      // ]
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
  },
  // create
  createUser(req, res) {
    User.create({
      username: req.body.username,
      // email: req.body.email,
      password: req.body.password,
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update
  updateUser(req, res) {
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
  },
  // delete
  deleteUser(req, res) {
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
  },

  // logging in & out | create & destroy sessions
  // - uses .post() & ../users/login endpoint
  login(req, res) {
    // finds user via email query. if found, that query is passed as dbUserData.
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "user not found" });
        return;
      }

      // verifies dbUserData's password by comparing the plain text with the object's stored hashed password.
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "incorrect password" });
        return;
      }

      // accesses the session information
      req.session.save(() => {
        // declared session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "you are now logged in" });
      });
    });
  },

  // - logout uses .post() and ../users/logout endpoint
  logout(req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }
};

module.exports = userController;
