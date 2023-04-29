const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("../../controllers/api/user-controllers");

// api endpoints
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById, updateUser, deleteUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
