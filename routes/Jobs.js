const router = require("express").Router();

const Jobs = require("../models/Jobs");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndEmployer,
} = require("./jwtverify");

router.post("/jobs", verifyTokenAndEmployer, async function(req, res) {
    const newJobsPost = new Jobs(req.body);
    try {
        const JobsPost = await newJobsPost.save();
        res.status(200).json(JobsPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/findjobs/:id", async function(req, res) {
    try {
        const getJobs = await Jobs.findById(req.params.id);
        // res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(getJobs);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/findjobs", async function(req, res) {
    let qNews = req.query.new;
    const qtags = req.query.tags;

    try {

        if (qNews) {
            const Jobs = await Jobs.find().sort({ createdAt: -1 }).limit(1);
            // res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(Jobs);
        } else if (qtags) {
            Jobs.find({
                    // categories: {
                    //   $in: [qCategory],
                    // },
                    tag: qtags,
                },
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(data);
                        res.header("Access-Control-Allow-Origin", "*");
                        res.status(200).json(data);
                    }
                }
            );
        } else {
            const getJobs = await Jobs.find();
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(getJobs);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;