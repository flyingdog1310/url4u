import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });

async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
}

async function verifyPassword(hashedPassword, password) {
  try {
    if (await argon2.verify(hashedPassword, password)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export { hashPassword, verifyPassword };
