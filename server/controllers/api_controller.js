import {
  createUrl,
  updateCustomUrl,
  getUrlsByCompany,
  getUrl,
} from "../models/url_model.js";

const createShortUrl = async (req, res) => {
  console.log(req.body);
  const { company_id, short_url, long_url } = req.body;
  const url = await createUrl(company_id, short_url, long_url);
  return res.status(200).redirect(`/url/${short_url}`);
};

const updateShortUrl = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { url_id, short_url, long_url, title, description } = req.body;
  const picture = req.file.key;
  req.body.url_id = Number(req.body.url_id);
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
  console.log(req.body);
  const company_id = 1;
  const url = await getUrlsByCompany(company_id);
  return res.status(200).json(url);
};

const getShortUrl = async (req, res) => {
  const short_url = req.originalUrl.split("/")[4];
  const url = await getUrl(short_url);
  return res.status(200).json(url);
};

export { createShortUrl, updateShortUrl, getShortUrlList, getShortUrl };
