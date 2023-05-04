import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname +"/../.env" });
import jwt from "jsonwebtoken";

const { JWT_SHORT_EXPIRE, JWT_LONG_EXPIRE, JWT_SECRET } = process.env;

async function issueJWT(userId, provider, remember) {
  let access_expired = JWT_SHORT_EXPIRE;
  if (remember == "on") {
    access_expired = JWT_LONG_EXPIRE;
  }
  const token = jwt.sign({ userId, provider }, JWT_SECRET, {
    expiresIn: access_expired,
  });

  return token;
}

async function verifyJWT(req, res, next) {
  let reqHeader = req.headers;
  let token;
  try {
    token = await reqHeader.authorization.split(" ")[1];
  } catch (err) {
    res.status(401).json("no token");
    return;
  }
  jwt.verify(token, JWT_SECRET, async function (err, decoded) {
    if (err) {
      res.status(403).json("invalid token");
      return;
    }
    console.log(decoded);
    res.locals.decoded = decoded;
    next();
  });
}

export { issueJWT, verifyJWT };
