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
  return res.status(200).redirect("/modify_url");
};

const updateShortUrl = async (req, res) => {
  console.log(req.body);
  const { url_id, short_url, long_url, picture, title, description } = req.body;
  req.body.url_id = Number(req.body.url_id);
  const url = await updateCustomUrl(
    url_id,
    short_url,
    long_url,
    picture,
    title,
    description
  );
};
export { createShortUrl, updateShortUrl };
