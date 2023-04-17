import dotenv from "dotenv";
dotenv.config({ path: process.ENV });
import { getUrlByShortUrl } from "../models/url_model.js";
import { createClick } from "../models/ad_model.js";
import { clickEvent } from "../../util/kafka-producer.js";
import geoIp from "geoip-lite";

const redirectUrl = async (req, res) => {
  const url = await getUrlByShortUrl(req.url.split("?")[0].substring(1));

  if (!url[0]) {
    //when short url not found
    console.log("ip:", req.ip, "notfound url:", req.url);
    return res.status(404).render("notfound");
  }
  const device = req.headers["user-agent"].split("(")[1].split(";")[0] || "";
  if (!req.headers["referer"]) {
    req.headers["referer"] = "native";
  }
  const ip = geoIp.lookup(req.ip) || {};
  const time = new Date().toISOString().slice(0, 19).replace('T', ' ');

  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "device",
    device,
    "referrer:",
    req.headers["referer"],
    "ip:",
    ip,
    "time",
    time
  );
  if (!ip.region) {
    ip.region = "";
    ip.city = "";
  }
  createClick(
    url[0].id,
    time,
    req.headers["referer"],
    device,
    `${ip.region}/${ip.city}`,
    1
  );
  // clickEvent(
  //   "clicks",
  //   `${url.id}/${time}/${req.headers["referer"]}/${req.headers["user-agent"]}/${ip}`
  // );
  return res.status(307).redirect(url[0].long_url);
};

const previewUrl = async (req, res) => {
  const url = await getUrlByShortUrl(req.url.split("?")[0].substring(1));
  if (!url[0]) {
    //when short url not found
    return res.status(404).render("notfound");
  }
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.headers["referer"],
    "ip:",
    geoIp.lookup(req.ip)
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
    req.headers["user-agent"].startsWith("facebookexternalhit") ||
    req.headers["user-agent"].startsWith("Facebot") ||
    req.headers["user-agent"].startsWith("Mozilla/5.0 (compatible; Discord") ||
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
