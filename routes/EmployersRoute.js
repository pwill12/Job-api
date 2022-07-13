const router = require("express").Router();

const CryptoJS = require("crypto-js");

const Employers = require("../models/Employers");

router.put("/updatepassword/:id", async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();

        res.status(200).json('updated password');
    }
    try {
        const updatedUser = await Employers.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    email: req.body.email,
                    website: req.body.website,
                },
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});