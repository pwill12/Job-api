const router = require("express").Router();
const Employers = require("../models/Employers");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/admindetails", async(req, res) => {

    const newUser = new Employers({
        website: req.body.website,
        location: req.body.location,
        email: req.body.email,
        name: req.body.email,
        // password: CryptoJS.AES.encrypt(
        //     req.body.password,
        //     process.env.PASS_SEC
        // ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/adminregister", async(req, res) => {

    const newUser = new Employers({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/loginadmin", async(req, res) => {
    try {
        const user = await Employers.findOne({ email: req.body.email });

        if (!user) {
            res.status(401).json("Wrong email")
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        let originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        let inputPassword = req.body.password;

        if (originalPassword === inputPassword) {
            const accessToken = jwt.sign({
                    id: user._id,
                    isEmployer: user.isEmployer,
                },
                process.env.JWT_SEC, { expiresIn: "3d" }
            );

            const { password, ...others } = user._doc;

            res.status(201).json({...others, accessToken });

        } else {

            res.status(401).json('wrong password')

        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;