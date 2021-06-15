const sequelize = require("../config/connection");
const { Posts } = require("../models");
const { Users } = require("../models");
const { Comments } = require("../models");

const PostData = require("./postData.json");
const UserData = require("./userData.json");
const CommentData = require("./commentData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    await Users.bulkCreate(UserData, {
      individualHooks: true,
      returning: true,
    });

    await Posts.bulkCreate(PostData);

    await Comments.bulkCreate(CommentData);
  } catch (error) {}
  process.exit(0);
};

seedAll();
