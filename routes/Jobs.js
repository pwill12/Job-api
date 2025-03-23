const router = require("express").Router();

const Jobs = require("../models/Jobs");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndEmployer,
} = require("./jwtverify");

router.post("/jobs", verifyTokenAndEmployer, async function (req, res) {
    const newJobsPost = new Jobs(req.body);
    try {
        const JobsPost = await newJobsPost.save();
        res.status(200).json(JobsPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/findjobs/:id", async function (req, res) {
    try {
        const getJobs = await Jobs.findById(req.params.id);
        // res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(getJobs);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/findjobs", async function (req, res) {
    // let qNews = req.query.new;
    const query = req.query
    const qtags = req.query.tags;

    const searchFilter = {
        title: { $regex: query.search, $options: "i" }
    }

    try {

        if (searchFilter) {
            // const Jobs = await Jobs.find().sort({ createdAt: -1 }).limit(1);
            const jobs = await Jobs.find(query.search ? searchFilter : null)
            res.status(200).json(jobs)
            // res.header("Access-Control-Allow-Origin", "*");
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
                        // res.header("Access-Control-Allow-Origin", "*");
                        res.status(200).json(data);
                    }
                }
            );
        }
        else {
            const getJobs = await Jobs.find();
            // res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(getJobs);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/jobsemployee", async function (req, res) {
    const qtags = req.query.jobs;
    try {
        const users = await Jobs.find({
            employerId: qtags
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
});

router.get('/findjob', async (req,res) => {
    const searchFilter = {
        title: { $regex: query.search, $options: "i" }
    }
    try {
        if (searchFilter) {
            const jobs = await Jobs.find(searchFilter)
            res.status(200).json(jobs)
        }
        res.status(404).json('no jobs found')
        
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;