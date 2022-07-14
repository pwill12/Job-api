const Apply = require("../models/Apply");
const { verifyTokenAndAuthorization, verifyToken } = require("./jwtverify");
const router = require("express").Router();

router.post("/apply", async(req, res) => {
    try {
        Apply.findOne({ 'user': req.body.user }).exec((err, jobs) => {
            if (err) return res.status(400).json({ err });
            if (jobs) {
                const myjobs = req.body.jobitems.jobs;
                const alreadyapplied = jobs.jobitems.find((c) => c.jobs == myjobs);
                if (alreadyapplied) {
                    res.status(401).json("already applied");
                } else {
                    Apply.findOneAndUpdate({ user: req.body.user }, {
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
                const newApplied = new Apply(
                    req.body
                    //   email: req.body.email,
                    //   projectlinks: req.body.projectlinks,
                );
                const apply = newApplied.save()
                res.status(200).json(apply)
                    // newApplied.save((error, applieds) => {
                    //   if (error) return res.status(400).json({ error });
                    //   if (applieds) {
                    //     return res.status(201).json({ applieds });
                    //   }
                    // });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/findapplied/:id", async function(req, res) {
    const myuserid = req.params.id;
    try {
        const user = await Apply.findOne({ 'user': myuserid });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;