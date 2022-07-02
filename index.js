const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Jobsroute = require("./routes/Jobs");
const authorization = require("./routes/Auth");
const userprofiles = require("./routes/Users");
const userskills = require("./routes/UsersSkills");
const SavedJobs = require("./routes/Saved");
const applyJobs = require("./routes/ApplyJobs");
const cors = require("cors");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.Keypass)
  .then(() => console.log("successful"))
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: "https://willjobs.netlify.app",
  methods: ["GET", "POST", "PUT", "PATCH"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", Jobsroute);
app.use("/api", userskills);
app.use("/api", authorization);
app.use("/api", userprofiles);
app.use("/api", SavedJobs);
app.use("/api", applyJobs);

app.listen(process.env.PORT, function () {
  console.log("started");
});
