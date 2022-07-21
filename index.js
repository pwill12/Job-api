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
const Stripe = require("./routes/Stripe");
const Employers = require("./routes/EmployersAuth");
const employerscandidate = require("./routes/employerscandidate");




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
    origin: "*",
    // methods: ["GET", "POST", "PUT", "PATCH"],
    "Access-Control-Allow-Credentials": true,
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
app.use("/api", Stripe);
app.use("/api", Employers);
app.use("/api", employerscandidate);

app.listen(process.env.PORT, function() {
    console.log("started");
});