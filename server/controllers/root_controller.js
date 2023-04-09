import { getUrl } from "../models/url_model.js";
import geoip from 'geoip-lite'
const geo =geoip.lookup(ip)

const redirectUrl = async (req, res) => {
  const url = await getUrl(req.url.split("?")[0].substring(1));
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
    geo(req.ip)
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
    req.ip
  );
  res.status(200).render("crawler", {
    url_title: url[0].title,
    url_short_url: url[0].short_url,
    url_picture: url[0].picture,
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
    )
  ) {
    return true;
  }
  return false;
};

const visitUrl = async (req, res) => {
  if (isUserAgent(req, res)) {
    previewUrl(req, res);
  } else {
    //FIXME:called twice
    redirectUrl(req, res);
  }
};

export { visitUrl };
