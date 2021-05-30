const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get one post from global posts list
router.get("/:id", withAuth, async (req, res) => {
  try {
    const commentsData = await Comments.findByPk(req.params.id);
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a comment to single post
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      comment: req.body.comment,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update given post
router.put("/:id", withAuth, (req, res) => {
  Comments.update(
    {
      comment: req.body.comment,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((err) => res.json(err));
});

// Delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentsData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
