import express from "express";
import pkg from "body-parser";
import dotenv from "dotenv";
import router from "./routes/allRoutes.js";

// instance of express
dotenv.config();
const { json } = pkg;
const app = express();
const PORT = process.env.PORT || 4000;

// bodyparser middleware
app.use(json());

// router

app.use("/", router);

// listen server on port
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
