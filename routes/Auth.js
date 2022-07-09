const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register Route

router.post("/register", async(req, res) => {

    const newUser = new User({
        img: req.body.img,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        skills: req.body.skills,
        website: req.body.website,
        number: req.body.number,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linked: req.body.linked,
        github: req.body.github,
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

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json("Wrong User Name")
        }
        // else{
        //   res.status(200).json("Wrong User Name")
        // }

        // !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        let originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        let inputPassword = req.body.password;

        if (originalPassword === inputPassword) {
            const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
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