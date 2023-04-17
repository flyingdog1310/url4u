import { createUrl, updateCustomUrl, getUrlById } from "../models/url_model.js";
import { shortUrlGenerator } from "../../util/shortUrlGenerator.js";

const createShortUrl = async (req, res) => {
  const { long_url } = req.body;
  let company_id = 1;
  if (req.body.company_id) {
    company_id = req.body.company_id;
  }
  if (req.headers["referer"].split("/")[4]) {
    company_id = req.headers["referer"].split("/")[4];
  }
  const short_url = shortUrlGenerator();
  const url = await createUrl(company_id, short_url, long_url);
  return res.status(200).redirect(`/url/modify/${url.insertId}`);
};

const updateShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const { short_url, long_url, title, description } = req.body;
  let picture = "";
  if (req.file) {
    picture = req.file.key;
  }
  const url = await updateCustomUrl(
    url_id,
    short_url,
    long_url,
    picture,
    title,
    description
  );
  return res.status(200).redirect("/");
};

const getShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const url = await getUrlById(url_id);
  return res.status(200).json(url);
};

export { createShortUrl, updateShortUrl, getShortUrl };