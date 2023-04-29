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
} = require("../../controllers/user-controllers");

// public & authguarded api endpoints
router.route("/").get(withAuth, getAllUsers).post(createUser);
router
  .route("/:id")
  .get(withAuth, getUserById)
  .put(withAuth, updateUser)
  .delete(withAuth, deleteUser);
router.route("/login").post(login);
router.route("/logout").post(withAuth, logout);

module.exports = router;
