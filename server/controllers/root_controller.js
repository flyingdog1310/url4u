import { getUrl } from "../models/url_model.js";

const redirectUrl = async (req, res) => {
  const url = await getUrl(req.url.substring(1));
  if (!url[0]) {
    //when short url not found
    return res.status(404).render("notfound");
  }
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.referrer,
    "ip:",
    req.ip
  );
  return res.status(307).redirect(url[0].long_url);
};

const previewUrl = async (req, res) => {
  const url = await getUrl(req.url);
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.referrer,
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
    req.headers["user-agent"].startsWith("Facebot")
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
