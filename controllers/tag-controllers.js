const { Tag, Entry, EntryTag } = require("../models");

// crud methods
const tagController = {
  getAllTags(req, res) {
    Tag.findAll({
      attributes: ["id", "tag_name"],
      order: [["tag_name", "ASC"]]
    })
      .then((tags) => res.status(200).json(tags))
      .catch((err) => res.status(500).json(err));
  },
  getTagById({ params }, res) {
    Tag.findOne({
      where: {
        id: params.id,
      },
      include: [
        {
          model: Entry,
          through: EntryTag,
        },
      ],
      attributes: ["id", "tag_name"],
    })
      .then((tags) => res.status(200).json(tags))
      .catch((err) => res.status(500).json(err));
  },
  createTag({ body }, res) {
    Tag.create({
      tag_name: body.tag_name
    })
      .then((tag) => res.status(200).json(tag))
      .catch((err) => res.status(404).json(err));
  },
  updateTag(req, res) {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((tag) => res.status(200).json(tag))
      .catch((err) => res.status(404).json(err));
  },
  deleteTag({ params }, res) {
    Tag.destroy({
      where: {
        id: params.id,
      },
    })
      .then((tag) => res.status(200).json(tag))
      .catch((err) => res.status(404).json(err));
  }
}

module.exports = tagController;
