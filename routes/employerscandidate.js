const Employerscandidate = require("../models/Employerscandidates");
const { verifyTokenAndAuthorization, verifyToken } = require("./jwtverify");
const router = require("express").Router();

router.post("/candapply", async(req, res) => {
    try {
        Employerscandidate.findOne({ 'employerId': req.body.user }).exec((err, jobs) => {
            if (err) return res.status(400).json({ err });
            if (jobs) {
                const myjobs = req.body.jobitems.jobs;
                const alreadyapplied = jobs.jobitems.find((c) => c.jobs == myjobs);
                if (alreadyapplied) {
                    res.status(401).json("already applied");
                } else {
                    Employerscandidate.findOneAndUpdate({ employerId: req.body.employerId }, {
                        $push: {
                            jobitems: req.body.jobitems,
                        },
                    }).exec((err, jobs) => {
                        if (err) console.log(err);
                        if (jobs) {
                            return res.status(201).json({ applied: jobs });
                        }
                    });
                }
            } else {
                const newApplied = new Employerscandidate(
                    req.body
                    //   email: req.body.email,
                    //   projectlinks: req.body.projectlinks,
                );
                const apply = newApplied.save()
                res.status(200).json(apply)
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/candidateapplied/:id", async function(req, res) {
    const myuserid = req.params.employerId;
    try {
        const user = await Apply.findOne({ 'employerId': myuserid });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router