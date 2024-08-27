// Q1nkWUVzBZPU5eaj;
// mongodb+srv://sagarmanchakatla01:Q1nkWUVzBZPU5eaj@cluster0.ufjo7.mongodb.net/

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const user_routes = require("./Routes/route");

mongoose
  .connect(
    "mongodb+srv://sagarmanchakatla01:Q1nkWUVzBZPU5eaj@cluster0.ufjo7.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", user_routes);

app.listen(8000, () => {
  console.log(`http://localhost:8000`);
});
