import dotenv from "dotenv";
dotenv.config({ path: process.ENV });
import { getUrl } from "../models/url_model.js";
import { createClick } from "../models/ad_model.js";
import geoip from "geoip-lite";

const redirectUrl = async (req, res) => {
  const url = await getUrl(req.url.split("?")[0].substring(1));
  const device = req.headers["user-agent"].split("(")[1].split(";")[0];
  const ip = geoip.lookup(req.ip) || {};

  if (!url[0]) {
    //when short url not found
    return res.status(404).render("notfound");
  }
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "device",
    device,
    "referrer:",
    req.headers["referer"],
    "ip:",
    ip
  );
  if (!ip.region) {
    ip.region = "";
    ip.city = "";
  }
  createClick(
    url[0].id,
    "1995-01-01 00:00:00",
    req.headers["referer"],
    device,
    `${ip.region}/${ip.city}`,
    1
  );

  return res.status(307).redirect(url[0].long_url);
};

const previewUrl = async (req, res) => {
  const url = await getUrl(req.url.split("?")[0].substring(1));

  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.headers["referer"],
    "ip:",
    geoip.lookup(req.ip)
  );
  res.status(200).render("crawler", {
    url_title: url[0].title,
    url_short_url: url[0].short_url,
    url_picture: `${process.env.AWS_CLOUDFRONT}${url[0].picture}`,
    url_description: url[0].description,
    url_long_url: url[0].long_url,
  });
};

const isUserAgent = (req) => {
  if (
    req.headers["user-agent"].startsWith("facebookexternalhit/") ||
    req.headers["user-agent"].startsWith("Facebot") ||
    req.headers["user-agent"].startsWith(
      "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)"
    ) ||
    req.headers["user-agent"].startsWith("node-fetch")
  ) {
    return true;
  }
  return false;
};

const visitUrl = async (req, res) => {
  if (isUserAgent(req, res)) {
    previewUrl(req, res);
  } else {
    redirectUrl(req, res);
  }
};

export { visitUrl };
