// models
const User = require("./User");
const Journal = require("./Journal");
const Entry = require("./Entry");
const Tag = require("./Tag");
const EntryTag = require("./EntryTag");

// relationships
// - 1:M | User:Journal
User.hasMany(Journal, {
  foreignKey: "user_id",
});

Journal.belongsTo(User, {
  foreignKey: "user_id",
});

// - 1:M | User:Entry
User.hasMany(Entry, {
  foreignKey: "user_id",
});

Entry.belongsTo(User, {
  foreignKey: "user_id",
});

// - 1:M | Journal:Entry
Journal.hasMany(Entry, {
  foreignKey: "journal_id",
});

Entry.belongsTo(Journal, {
  foreignKey: "journal_id",
});

// M:M | Entry:Tag
Entry.belongsToMany(Tag, {
  through: EntryTag,
  foreignKey: "entry_id",
});

Tag.belongsToMany(Entry, {
  through: EntryTag,
  foreignKey: 'tag_id'
});

module.exports = { User, Journal, Entry, Tag, EntryTag };
