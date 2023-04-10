import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });

const shortUrlLength = process.env.SHORT_URL_LENGTH;

const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function shortUrlGenerator() {
  let shortUrl = "";
  for (let i = 0; i < shortUrlLength; i++) {
    const randomNumber = Math.floor(Math.random() * 62);
    shortUrl += base62.charAt(randomNumber);
  }
  return shortUrl;
}

export { shortUrlGenerator };
