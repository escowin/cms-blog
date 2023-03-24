const router = require("express").Router();
const { Tag, Entry, EntryTag } = require("../../models");

// rest api
router.post("/", ({ body }, res) => {
  Tag.create(body)
    .then(tag => res.status(200).json(tag))
    .catch(err => res.status(404).json(err));
});

router.get("/", (req, res) => {
    Tag.fineAll({
        include: [
            {
                model: Entry,
                through: EntryTag
            }
        ]
    })
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(404).json(err));
});

router.get("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
