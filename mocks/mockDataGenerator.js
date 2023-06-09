import { createClick } from "../server/models/ad_model.js";

let idArr = [1];
let method = 1;
mockDataGenerator(idArr, method);

function mockDataGenerator(idArr, method) {
  let deviceArr = ["Macintosh", "Windows", "iPhone", "Android", "iPad"];
  let ipArr = ["TW", "US", "JP", "IN"];
  let referrerArr = [
    "https://www.google.com",
    "https://www.youtube.com/",
    "https://l.facebook.com/",
    "https://m.facebook.com/",
    "https://l.instagram.com/",
    "https://m.instagram.com/",
  ];

  let now = new Date();
  let defaultRange = 720;
  let addRange = now.getUTCHours();
  let range = Number(defaultRange) + Number(addRange) - 23;
  let timeArr = [];

  for (let i = 0; i < range; i++) {
    const time = now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
    timeArr.push(time);
    now.setHours(now.getHours() - 1);
  }

  for (let i = 0; i < timeArr.length; i++) {
    let count = 0;
    if (method == 1) {
      if (timeArr[i].split(" ")[1].slice(0, 2) >= 0 && timeArr[i].split(" ")[1].slice(0, 2) < 11) {
        count = mathRandom(20, 80);
      } else if (timeArr[i].split(" ")[1].slice(0, 2) >= 11 && timeArr[i].split(" ")[1].slice(0, 2) < 16) {
        count = mathRandom(50, 300);
      } else {
        count = mathRandom(1, 50);
      }
    }
    if (method == 2) {
      count = mathRandom(1, 50);
    }

    let id = randomArr(idArr);
    let time = timeArr[i];
    let referrer = randomArr(referrerArr);
    let device = randomArr(deviceArr);
    let ip = randomArr(ipArr);
    createClick(id, time, referrer, device, ip, count);
  }

  function randomArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function mathRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

console.log("----insert end------");
