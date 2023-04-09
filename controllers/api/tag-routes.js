const router = require("express").Router();
const { Tag, Entry, EntryTag } = require("../../models");

// rest api
router.get("/", (req, res) => {
  Tag.findAll({
    // include: [
    //   {
    //     model: Entry,
    //     through: EntryTag,
    //     attributes: ["id"],
    //   },
    // ],
    attributes: ["id", "tag_name"],
    order: [["tag_name", "ASC"]]
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", ({ params }, res) => {
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
});

router.post("/", ({ body }, res) => {
  Tag.create({
    tag_name: body.tag_name
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});


router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", ({ params }, res) => {
  Tag.destroy({
    where: {
      id: params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
