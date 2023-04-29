const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../../controllers/api/tag-controllers");

// api endpoints
router.route("/").get(getAllTags).post(createTag);
router.route("/:id").get(getTagById).put(updateTag).delete(deleteTag);

module.exports = router;
