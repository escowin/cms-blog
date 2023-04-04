// models
const User = require("./User");
const Journal = require("./Journal");
const Entry = require("./Entry");
const Tag = require("./Tag");
const EntryTag = require("./EntryTag");

// models:
// - user, journal, entry.
// relationships:
// - 1:M | User:Journal, User:Entry, Journal:Entry,

// relationships
// - 1:M | User:Post
User.hasMany(Journal, {
  foreignKey: "user_id",
});

Journal.belongsTo(User, {
  foreignKey: "user_id",
});

// - 1:M | User:Comment
User.hasMany(Entry, {
  foreignKey: "user_id",
});

Entry.belongsTo(User, {
  foreignKey: "user_id",
});

// - 1:M | Post:Comment
Journal.hasMany(Entry, {
  foreignKey: "journal_id",
});

Entry.belongsTo(Journal, {
  foreignKey: "journal_id",
});

// M:M | Entry:Tag
// - to do : EntryTag through table
Entry.belongsToMany(Tag, {
  through: EntryTag,
  foreignKey: "entry_id",
});

Tag.belongsToMany(Entry, {
  through: EntryTag,
  foreignKey: 'tag_id'
});

module.exports = { User, Journal, Entry, Tag, EntryTag };
