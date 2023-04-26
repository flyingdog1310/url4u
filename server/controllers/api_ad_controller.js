import {
  getTotalClickFromSQL,
  getTotalClickFromRedis,
  getDeviceClickFromSQL,
  getRegionClickFromSQL,
  getReferrerClickFromSQL,
  getTimeClickFromSQL,
} from "../models/ad_model.js";

const getUrlClicks = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCountFromSQL = await getTotalClickFromSQL(url_id);
  const urlCountFromRedis = await getTotalClickFromRedis(url_id);
  let sqlCount = +urlCountFromSQL[0].total;
  let urlCount = +urlCountFromRedis;
  let result = sqlCount + urlCount;
  return res.status(200).json({ "total": result });
};

const getUrlClickByDevice = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getDeviceClickFromSQL(url_id);
  return res.status(200).json(urlCount);
};
const getUrlClickByRegion = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getRegionClickFromSQL(url_id);
  return res.status(200).json(urlCount);
};

const getUrlClickByReferrer = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const urlCount = await getReferrerClickFromSQL(url_id);
  return res.status(200).json(urlCount);
};

const getUrlClickByTime = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];

  let method = "day";
  let lastDay = new Date();
  if (req.body.stop) {
    lastDay = new Date(req.body.stop);
  }
  if (req.body.method) {
    method = req.body.method;
  }

  const timeReverse = [];
  lastDay.setDate(lastDay.getDate() + 1);
  if (method == "day") {
    for (let i = 0; i < 30; i++) {
      lastDay.setDate(lastDay.getDate() - 1);
      const start =
        lastDay.toISOString().slice(0, 19).split("T")[0] + " 00:00:00";
      const stop =
        lastDay.toISOString().slice(0, 19).split("T")[0] + " 23:59:59";
      timeReverse[i] = { start, stop };
    }
  }
  if (method == "hour") {
    for (let i = 0; i < 30; i++) {
      lastDay.setHours(lastDay.getHours() - 1);
      const start =
        lastDay.toISOString().slice(0, 19).replace("T", " ").split(":")[0] +
        ":00:00";
      const stop =
        lastDay.toISOString().slice(0, 19).replace("T", " ").split(":")[0] +
        ":59:59";
      timeReverse[i] = { start, stop };
    }
  }

  const time = timeReverse.reverse();
  const urlCount = await getTimeClickFromSQL(url_id, time);
  timeModify(urlCount, method);
  //compare url if exist
  let compareUrlCount;
  if (req.body.url_id) {
    let compareUrl = req.body.url_id;
    compareUrlCount = await getTimeClickFromSQL(compareUrl, time);
    timeModify(compareUrlCount, method);
  }
  console.log([urlCount, compareUrlCount]);
  return res.status(200).json([urlCount, compareUrlCount]);
};

function timeModify(arr, method) {
  if (method == "day") {
    for (let i = 0; i < arr.length; i++) {
      const time = `${arr[i].time.split("-")[1]}/${arr[i].time.split("-")[2]}`;
      const finalTime = time.split(" ")[0];
      arr[i].time = finalTime;
    }
  }

  if (method == "hour") {
    for (let i = 0; i < arr.length; i++) {
      const time = `${arr[i].time.split("-")[1]}/${arr[i].time.split("-")[2]}`;
      const finalTime = time.split(":")[0];
      arr[i].time = finalTime;
    }
  }
}

export {
  getUrlClicks,
  getUrlClickByDevice,
  getUrlClickByRegion,
  getUrlClickByReferrer,
  getUrlClickByTime,
};
