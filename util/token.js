import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });

async function issueJWT(userId, provider, remember) {
  let access_expired = process.env.JWT_SHORT_EXPIRE;
  if (remember == "on") {
    access_expired = process.env.JWT_LONG_EXPIRE;
  }
  const token = jwt.sign({ userId, provider }, process.env.JWT_SECRET, {
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
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
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
