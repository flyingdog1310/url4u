import { getUrl } from "../models/url_model.js";

const redirectUrl = async (req, res) => {
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.referrer,
    "ip:",
    req.ip
  );
  res.status(307).redirect("https://school.appworks.tw/");
};
const previewUrl = async (req, res) => {
  const url = await getUrl("test");
  console.log(
    "user-agent:",
    req.headers["user-agent"],
    "referrer:",
    req.referrer,
    "ip:",
    req.ip
  );
  res.status(200).render("url", {
    url_title: url[0].title,
    url_short_url: url[0].short_url,
    url_picture: url[0].picture,
    url_description: url[0].description,
    url_long_url: url[0].long_url,
  });
};

export { redirectUrl, previewUrl };
