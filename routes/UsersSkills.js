const router = require("express").Router();

const Skills = require("../models/UserSkills");
const { verifyTokenAndAuthorization, verifyToken } = require("./jwtverify");

router.post("/skills",verifyToken, async function (req, res) {
  const newUserSkills = new Skills(req.body);
  try {
    const Userskills = await newUserSkills.save();
    res.status(200).json(Userskills);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getskills", async function (req, res) {
  try {
      const getSkills = await Skills.find()
      res.status(200).json(getSkills);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
