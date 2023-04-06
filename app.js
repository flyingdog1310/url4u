import dotenv from "dotenv";
dotenv.config();
const { PORT, API_VERSION } = process.env;
const port = PORT;

// Express Initialization
import express from "express";
import cors from "cors";
const app = express();

app.set("view engine", "pug");
app.set("trust proxy", true);
app.set("json spaces", 2);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS allow all
app.use(cors());

//Temp main page
app.get("/", function (req, res) {
  res.json("Hello World!");
});

//route under root
import root from "./server/routes/root.js";
app.use("/", root);

// API routes

// Page not found
app.use(function (req, res, next) {
  res.status(404).json("404 Not Found");
});

// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json("500 Internal Server Error");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
