import * as cheerio from "cheerio";
import axios from "axios";

async function crawImgs(url) {
  console.log("Visiting page " + url);
  try {
    const pageHTML = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      timeout: 1000,
    });
    const $ = cheerio.load(pageHTML.data);
    const images = await collectImages(url, $);
    const meta = collectTitleDescription($);
    meta.images = images;
    return meta;
  } catch (err) {
    console.log(err);
    return;
  }
}

function collectImages(url, $) {
  let images = $("meta[property = 'og:image']")
    .map(function () {
      let image = $(this).prop("content");
      return image;
    })
    .get();

  $("img").map(function () {
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
    images.push(image);
  });

  return images;
}

function collectTitleDescription($) {
  let titles = $("meta[property = 'og:title']")
    .map(function () {
      let title = $(this).prop("content");
      return title;
    })
    .get();

  let descriptions = $("meta[property = 'og:description']")
    .map(function () {
      let description = $(this).prop("content");
      return description;
    })
    .get();

  return { title: titles, description: descriptions };
}

export { crawImgs };
