// models
const User = require('./User');
const Post = require('./Post');
// const Comment = require('./Comment');

// relationships
// - 1:M | User:Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// - 1:M | User:Comment
// User.hasMany(Comment, {
//     foreignKey: "user_id"
// });

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// - 1:M | Post:Comment
// Post.hasMany(Comment, {
//     foreignKey: "post_id"
// });

// Comment.belongsTo(Post, {
//     foreignKey: "post_id"
// });

module.exports = { User, Post }