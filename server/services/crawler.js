import * as cheerio from "cheerio";
import axios from "axios";
import playwright from "playwright";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const { USE_PLAYWRIGHT } = process.env;

async function crawImgs(url) {
  const pageHTML = await fetchData(url);
  if (!pageHTML) {
    return;
  }
  const $ = cheerio.load(pageHTML);
  const images = await collectImages(url, $);
  const meta = collectTitleDescription($);
  meta.images = images;
  return meta;
}

async function fetchData(url) {
  if (USE_PLAYWRIGHT == "false") {
    console.log("Visiting page " + url);
    try {
      const response = await getHtmlAxios(url);
      return response;
    } catch (err) {
      console.log("Error while using Axios to fetch HTML:", err);
    }
  } else {
    console.log("Using Playwright to fetch HTML...");
    try {
      const response = await getHtmlPlaywright(url);
      return response;
    } catch (err) {
      console.log("Error while using Playwright to fetch HTML:", err);
    }
  }
}

const getHtmlAxios = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      Accept: "text/plain,text/html,*/*",
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Accept-Encoding": "gzip,deflate,br",
    },
    timeout: 1000,
  });
  return data;
};

const getHtmlPlaywright = async (url) => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  let data = await page.content();
  await browser.close();
  return data;
};

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
