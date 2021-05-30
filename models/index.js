const Posts = require("./Posts");
const Users = require("./Users");
const Comments = require("./Comments");

Users.hasMany(Posts, {
  foreignKey: "user_id",
});

Posts.belongsTo(Users, {
  foreignKey: "user_id",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
});

Comments.belongsTo(Users, {
  foreignKey: "user_id",
});

module.exports = { Users, Posts, Comments };
