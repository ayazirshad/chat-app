const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    `${process.env.MONGODB_URI}`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("failed to connect");
    console.log(err);
  });
