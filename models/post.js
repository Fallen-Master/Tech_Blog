const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connections');

class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dateCreated: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
      },
        userId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'user',
              key: 'id',
          }
      }
    },
    {
        hooks: {
          beforeCreate: async (newPostData) => {
            newPostData.content = await (newPostData.content);
            return newPostData;
          },
          beforeUpdate: async (updatedPostData) => {
            updatedPostData.content = await (updatedPostData.content );
            return updatedPostData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
      }
);

module.exports = Post;