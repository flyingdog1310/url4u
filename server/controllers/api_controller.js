import {
  createUrl,
  updateCustomUrl,
  getUrlsByCompany,
  getUrlById,
} from "../models/url_model.js";
import { shortUrlGenerator } from "../../util/shortUrlGenerator.js";

const createShortUrl = async (req, res) => {
  const { company_id, long_url } = req.body;
  const short_url = shortUrlGenerator();
  const url = await createUrl(company_id, short_url, long_url);
  return res.status(200).redirect(`/url/${url.insertId}`);
};

const updateShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const { short_url, long_url, title, description } = req.body;
  let picture = "";
  if (req.file.key) {
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

const getShortUrlList = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const url = await getUrlsByCompany(company_id);
  return res.status(200).json(url);
};

const getShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const url = await getUrlById(url_id);
  return res.status(200).json(url);
};

export { createShortUrl, updateShortUrl, getShortUrlList, getShortUrl };
