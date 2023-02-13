const express = require("express");
require("dotenv").config();
const mainRouter = require('./src/routes/index')

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/", mainRouter)

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
