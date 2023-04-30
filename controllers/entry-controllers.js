const { Entry, EntryTag, Tag } = require("../models");

// crud methods
const entryController = {
  async getAllEntries(req, res) {
    if (!req.session) {
      return;
    }

    try {
      const dbEntryData = await Entry.findAll({
        attributes: [
          "id",
          "entry_date",
          "entry_weight",
          "user_id",
          "journal_id",
        ],
        include: [
          {
            model: Tag,
            through: EntryTag,
            attributes: ["id", "tag_name"],
          },
        ],
        order: [["entry_date", "DESC"]],
      });
      res.json(dbEntryData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async getEntryById(req, res) {
    if (!req.session) {
      return;
    }

    try {
      const dbEntryData = await Entry.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Tag,
            through: EntryTag,
            attributes: ["id", "tag_name"],
          },
        ],
      });
      res.json(dbEntryData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async createEntry(req, res) {
    if (!req.session) {
      return;
    }

    try {
      const dbEntryData = await Entry.create({
        entry_date: req.body.entry_date,
        entry_weight: req.body.entry_weight,
        entry_text: req.body.entry_text,
        user_id: req.session.user_id,
        journal_id: req.body.journal_id,
      });

      if (req.body.tags && req.body.tags.length) {
        const entryTagIdArr = req.body.tags.map((tag_id) => {
          return {
            entry_id: dbEntryData.id,
            tag_id,
          };
        });
        await EntryTag.bulkCreate(entryTagIdArr);

        const entry = await Entry.findByPk(dbEntryData.id, {
          include: [
            {
              model: Tag,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return res.status(200).json(entry);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async updateEntry(req, res) {
    if (!req.session.user_id) {
      return;
    }

    try {
      await Entry.update(
        {
          entry_date: req.body.entry_date,
          entry_weight: req.body.entry_weight,
          entry_text: req.body.entry_text,
        },
        {
          where: { id: req.params.id },
        }
      );
      await EntryTag.destroy({ where: { entry_id: req.params.id } });

      if (req.body.tags && req.body.tags.length) {
        const entryTags = req.body.tags.map((tag_id) => {
          return {
            entry_id: req.params.id,
            tag_id,
          };
        });
        await EntryTag.bulkCreate(entryTags);
      }

      const dbEntryData = await Entry.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Tag,
            through: EntryTag,
            attributes: ["id", "tag_name"],
          },
        ],
      });
      res.status(200).json(dbEntryData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async deleteEntry(req, res) {
    if (!req.session.user_id) {
      return;
    }

    try {
      const dbEntryData = await Entry.destroy({ where: { id: req.params.id } });
      if (!dbEntryData) {
        res.status(404).json({ message: "entry not found" });
        return;
      }
      res.json(dbEntryData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err); // internal server error
    }
  },
};

module.exports = entryController;
