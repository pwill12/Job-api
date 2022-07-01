const router = require("express").Router();
const Favorite = require("../models/Savedjobs");
const { verifyTokenAndAuthorization } = require("./jwtverify");

router.post("/saved", verifyTokenAndAuthorization, async (req, res) => {
  const newSaved = new Favorite(req.body);
  try {
    Favorite.find({ JobId: req.body.JobId, userId: req.body.userId }).exec(
      (err, favorite) => {
        if (err) return res.status(400).send(err);

        //How can we know if I already favorite this movie or not ?
        let result = false;
        if (favorite.length !== 0) {
          result = true;
        }

        res.status(200).json({ success: true, favorited: result });
      }
    );
    // const JobsPost = await newSaved.save();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/favorite",
  verifyTokenAndAuthorization,
  async function (req, res) {
    // const newFavourite = new Favorite({
    //   userId: req.body.userId,
    //   JobId: req.body.JobId,
    //   jobs: req.body.jobs,
    // });
    try {
      // const myfav = await newFavourite.save();
      // const mypost = req.params.userId;
      const userId = req.body.userId;
      const jobs = req.body.jobs;

      Favorite.find({
        JobId: req.body.JobId,
        userFrom: req.body.userId,
      }).exec((err, favorite) => {
        if (err) return res.status(400).send(err);

        //How can we know if I already favorite this movie or not ?
        let result = false;
        if (Favorite.length !== 0) {
          result = true;
        }

        res.status(200).json({ success: true, favorited: result });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
