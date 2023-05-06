import { createClick } from "../models/ad_model.js";

let deviceArr = ["Macintosh", "Windows", "iPhone", "Android", "iPad"];
let ipArr = ["TW", "US", "JP", "IN"];
let idArr = [1, 2, 3];
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
  const time =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
  timeArr.push(time);
  now.setHours(now.getHours() - 1);
}


for (let i = 0; i < timeArr.length; i++) {
  for (let j = 0; j < 10; j++) {
    let count = mathRandom(1,1000)
    let id = randomArr(idArr);
    let time = timeArr[i];
    let referrer = randomArr(referrerArr);
    let device = randomArr(deviceArr);
    let ip = randomArr(ipArr);
    await createClick(id, time, referrer, device, ip, count);
  }
}

function randomArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function mathRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log("----insert end------");
