import {
  getTotalClick,
  getDeviceClick,
  getRegionClick,
  getReferrerClick,
} from "../models/ad_model.js";

const getUrlClicks = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getTotalClick(url_id);
  return res.status(200).json(urlCount);
};
const getUrlClickByDevice = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getDeviceClick(url_id);
  return res.status(200).json(urlCount);
};
const getUrlClickByRegion = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getRegionClick(url_id);
  return res.status(200).json(urlCount);
};

const getUrlClickByReferrer = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getReferrerClick(url_id);
  return res.status(200).json(urlCount);
};

export {
  getUrlClicks,
  getUrlClickByDevice,
  getUrlClickByRegion,
  getUrlClickByReferrer,
};
