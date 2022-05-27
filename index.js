const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Jobsroute = require("./routes/Jobs");
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

app.listen(8000, function () {
  console.log("started");
});
