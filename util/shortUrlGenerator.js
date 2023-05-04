const { SHORT_URL_LENGTH } = process.env;

const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function shortUrlGenerator() {
  let shortUrl = "";
  for (let i = 0; i < SHORT_URL_LENGTH; i++) {
    const randomNumber = Math.floor(Math.random() * 62);
    shortUrl += base62.charAt(randomNumber);
  }
  return shortUrl;
}

export { shortUrlGenerator };
