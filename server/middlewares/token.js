import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

async function verifyJWT(req, res, next) {
  let reqHeader = req.headers;
  let token;
  try {
    token = await reqHeader.authorization.split(" ")[1];
  } catch (err) {
    res.status(401).json("No token");
    return;
  }
  jwt.verify(token, JWT_SECRET, async function (err, decoded) {
    if (err) {
      res.status(403).json("Invalid token");
      return;
    }
    res.locals.decoded = decoded;
    next();
  });
}

export { verifyJWT };
