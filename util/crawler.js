import * as cheerio from "cheerio";
import axios from "axios";

async function crawImgs(url) {
  console.log("Visiting page " + url);
  const pageHTML = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    timeout: 1000,
  });
  const $ = cheerio.load(pageHTML.data);
  const images = await collectImages(url, $);
  console.log(images);
  return images;
}

function collectImages(url, $) {
  const images = $("img")
    .map(function () {
      let image = $(this).prop("src");
      if (image.startsWith("//")) {
        image = "https:" + image;
      }
      if (image.startsWith("/")) {
        if (url.endsWith("/")) {
          url = url.slice(0, -1);
        }
        image = url + image;
      }
      return image;
    })
    .get();
  return images;
}

export { crawImgs };
