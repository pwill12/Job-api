const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Jobsroute = require("./routes/Jobs");
const authorization = require('./routes/Auth')
const userprofiles = require('./routes/Users')
const userskills = require('./routes/UsersSkills')
const cors = require('cors')
const app = express();

dotenv.config();

mongoose
  .connect(process.env.Keypass)
  .then(() => console.log("successful"))
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: "http://localhost:3000",
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

app.listen(8000, function () {
  console.log("started");
});
