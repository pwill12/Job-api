const router = require("express").Router();

const Jobs = require("../models/Jobs");

router.post("/jobs", async function (req, res) {
  const newJobsPost = new Jobs(req.body);
  try {
    const JobsPost = await newJobsPost.save();
    res.status(200).json(JobsPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/findjobs", async function (req, res) {
  let qNew = req.query.new;
  const qtags = req.query.tags;

  try {
    //   const getJobs = await Jobs.find()
    //   res.status(200).json(getJobs);

    if (qNew) {
      const Jobs = await Jobs.find().sort({ createdAt: -1 }).limit(1);
      res.status(200).json(Jobs);
    } else if (qtags) {
      Jobs.find(
        {
          // categories: {
          //   $in: [qCategory],
          // },
          tag: qtags,
        },
        (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            res.status(200).json(data);
          }
        }
      );
    } else {
      const getJobs = await Jobs.find();
      res.status(200).json(getJobs);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
