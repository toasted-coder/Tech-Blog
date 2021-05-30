const router = require("express").Router();
const { Posts } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll();
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one post
router.get("/:id", async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id);

    if (!postsData) {
      res.status(404).json({ message: "No post found." });
      return;
    }
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update given post
router.put("/:id", withAuth, (req, res) => {
  Posts.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => res.json(err));
});

// Create a new post
router.post("/", withAuth, async (req, res) => {
  console.log("Route getting hit");
  try {
    const newPost = await Posts.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postsData) {
      res.status(404).json({ message: "No post found." });
      return;
    }

    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
