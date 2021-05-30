const router = require("express").Router();
const { Posts, Users, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/posts", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((posts) => posts.get({ plain: true }));
    res.render("feed", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
        {
          model: Comments,
          attributes: ["comment"],
          include: [
            {
              model: Users,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("post", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
