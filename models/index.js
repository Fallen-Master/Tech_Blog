const Comment = require('./comment');
const Post = require('./post');
const User = require('./users')

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'userId'
})

Post.hasMany(Comment, {
    foreignKey: 'postId'
})

Comment.belongsTo(Post, {
    foreignKey: 'postId'
})

User.hasMany(Comment, {
    foreignKey: 'userId'
})
Comment.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    Comment,
    Post,
    User
}