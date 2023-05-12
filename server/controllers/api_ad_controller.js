import {
  getTotalClickFromSQL,
  getTotalClickFromRedis,
  getDeviceClickFromSQL,
  getDeviceClickFromRedis,
  getRegionClickFromSQL,
  getRegionClickFromRedis,
  getReferrerClickFromSQL,
  getReferrerClickFromRedis,
  getTimeClickFromSQL,
  getWeekClickFromSQL,
  getTopClickFromSQL,
} from "../models/ad_model.js";
import { getRoleByUserUrl } from "../models/user_model.js";

const getUrlClicks = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }

  const urlCountFromSQL = await getTotalClickFromSQL(url_id);
  const urlCountFromRedis = await getTotalClickFromRedis(url_id);
  let sqlCount = +urlCountFromSQL.total;
  let urlCount = +urlCountFromRedis;
  let total = sqlCount + urlCount;
  return res.status(200).json({ total });
};

const getUrlClickByDevice = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  const urlCountFromSQL = await getDeviceClickFromSQL(url_id);
  const urlCountFromRedis = await getDeviceClickFromRedis(url_id);
  const result = mergeArrays(urlCountFromRedis, urlCountFromSQL);
  return res.status(200).json(result);
};

const getUrlClickByRegion = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  const urlCountFromSQL = await getRegionClickFromSQL(url_id);
  const urlCountFromRedis = await getRegionClickFromRedis(url_id);
  const result = mergeArrays(urlCountFromRedis, urlCountFromSQL);
  return res.status(200).json(result);
};

const getUrlClickByReferrer = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  const urlCountFromSQL = await getReferrerClickFromSQL(url_id);
  const urlCountFromRedis = await getReferrerClickFromRedis(url_id);
  const result = mergeArrays(urlCountFromRedis, urlCountFromSQL);
  return res.status(200).json(result);
};

const getUrlClickByWeek = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  const urlCountFromSQL = await getWeekClickFromSQL(url_id);
  const urlCountFromRedis = await getTotalClickFromRedis(url_id);
  const today = new Date().getDay();
  if (urlCountFromRedis) {
    const weekdayMap = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 };
    const todayWeekday = weekdayMap[today];
    const todayDataIndex = urlCountFromSQL.findIndex(
      (data) => data.weekday === todayWeekday
    );
    if (todayDataIndex !== -1) {
      urlCountFromSQL[todayDataIndex].total_count = String(
        Number(urlCountFromSQL[todayDataIndex].total_count) +
          Number(urlCountFromRedis)
      );
    } else {
      urlCountFromSQL.push({
        weekday: todayWeekday,
        total_count: String(urlCountFromRedis),
      });
    }
    urlCountFromSQL.sort((a, b) => a.weekday - b.weekday);
  }
  return res.status(200).json(urlCountFromSQL);
};

const getTopUrlClick = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  const urlCountFromSQL = await getTopClickFromSQL(url_id);
  const urlCountFromRedis = await getTotalClickFromRedis(url_id);
  const now = new Date().toISOString().slice(0, 14) + "00:00.000Z";
  if (urlCountFromRedis) {
    const urlCountNow = { time_range: now, count: urlCountFromRedis };
    urlCountFromSQL.push(urlCountNow);
    urlCountFromSQL.sort((a, b) => b.count - a.count);
    if (urlCountFromSQL[5]) {
      urlCountFromSQL.pop();
    }
  }
  return res.status(200).json(urlCountFromSQL);
};

const getUrlClickByTime = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const url_id = req.originalUrl.split("/")[4];
  const isAuthorized = await getRoleByUserUrl(user_id, url_id);
  if (!isAuthorized) {
    return res.status(403).json("Unauthorized");
  }
  let range = 30;
  let startDate = new Date();
  let method = "day";
  let result = [];
  if (req.body.stop) {
    startDate = new Date(req.body.stop);
  }
  if (req.body.method) {
    method = req.body.method;
  }
  if (req.body.range) {
    let defaultRange = req.body.range;
    let addRange = startDate.getUTCHours();
    range = Number(defaultRange) + Number(addRange) - 23;
  }
  const time = generateTimeRange(startDate, range, method);
  const urlCount = await getTimeClickFromSQL(url_id, time);
  timeModify(urlCount, method);
  let urlClickFromRedis = await getTotalClickFromRedis(url_id);
  let currentClick = urlCount[urlCount.length - 1].total;
  urlCount[urlCount.length - 1].total =
    Number(currentClick) + Number(urlClickFromRedis);
  result.push(urlCount);
  //compare url if exist
  if (req.body.url_id != 0) {
    let compareUrl = req.body.url_id;
    let compareUrlCount = await getTimeClickFromSQL(compareUrl, time);
    timeModify(compareUrlCount, method);
    let compareUrlClickFromRedis = await getTotalClickFromRedis(compareUrl);
    let compareUrlCurrentClick =
      compareUrlCount[compareUrlCount.length - 1].total;
    compareUrlCount[compareUrlCount.length - 1].total =
      Number(compareUrlCurrentClick) + Number(compareUrlClickFromRedis);
    result.push(compareUrlCount);
  }
  return res.status(200).json(result);
};

function generateTimeRange(startDate, range, method) {
  let now = new Date(startDate);
  let timeReverse = [];

  if (method == "day") {
    for (let i = 0; i < range; i++) {
      const startTime =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1 < 10 ? "0" : "") +
        (now.getMonth() + 1) +
        "-" +
        (now.getDate() < 10 ? "0" : "") +
        now.getDate() +
        " 00:00:00";
      const stopTime =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1 < 10 ? "0" : "") +
        (now.getMonth() + 1) +
        "-" +
        (now.getDate() < 10 ? "0" : "") +
        now.getDate() +
        " 23:59:59";
      timeReverse[i] = { start: startTime, stop: stopTime };
      now.setDate(now.getDate() - 1);
    }
  }
  if (method == "hour") {
    for (let i = 0; i < range; i++) {
      const startTime =
        now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] +
        ":00:00";
      const stopTime =
        now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] +
        ":59:59";
      timeReverse[i] = { start: startTime, stop: stopTime };
      now.setHours(now.getHours() - 1);
    }
  }
  return timeReverse.reverse();
}

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
      const finalTime = `${time.split(":")[0]}:00`;
      arr[i].time = finalTime;
    }
  }
}

function mergeArrays(fromRedis, fromSql) {
  const merged = [];

  for (let i = 0; i < fromRedis.length; i++) {
    let source = fromRedis[i][0];
    let total = fromRedis[i][1];
    merged.push({ source, total });
  }

  for (let i = 0; i < fromSql.length; i++) {
    let source = fromSql[i].source;
    let total = fromSql[i].total;
    let found = false;

    for (let j = 0; j < merged.length; j++) {
      if (merged[j].source === source) {
        merged[j].total = String(Number(merged[j].total) + Number(total));
        found = true;
        break;
      }
    }

    if (!found) {
      merged.push({ source, total });
    }
  }

  return merged;
}

export {
  getUrlClicks,
  getUrlClickByDevice,
  getUrlClickByRegion,
  getUrlClickByReferrer,
  getUrlClickByTime,
  getUrlClickByWeek,
  getTopUrlClick,
};
