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

//route under root
import root from "./server/routes/root.js";
app.use("/", root);

import api_user from "./server/routes/api_user.js";
import api_company from "./server/routes/api_company.js";
import api_url from "./server/routes/api_url.js";
import api_analytic from "./server/routes/api_analytic.js";

app.use(`/api/${API_VERSION}/`, [api_user, api_company, api_url, api_analytic]);

import redirect from "./server/routes/redirect.js";
app.use("/", redirect);

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
