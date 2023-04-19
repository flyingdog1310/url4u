const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // handle success response
    console.log(xhr.responseText);
    const url = JSON.parse(xhr.responseText);
    insertDefault(url);
    addCrawImgs(url);
  } else if (this.readyState === 4) {
    // handle error response
    console.log(xhr.status);
  }
};
xhr.open("GET", `/api/1.0/url/${window.location.pathname.split("/")[3]}`);
xhr.setRequestHeader("Authorization", `Bearer ${null}`);
xhr.send();

function insertDefault(url) {
  document.getElementById(
    "update-short-url"
  ).action = `/api/1.0/url/${url[0].id}`;
  document.getElementById("short_url").value = url[0].short_url;
  document.getElementById("long_url").value = url[0].long_url;
  document.getElementById("title").value = url[0].title;
  document.getElementById("description").value = url[0].description;
}

function addCrawImgs(url) {
  const imgs = document.createElement("div");
  let imgsHTML = "";
  for (let i = 0; i < url[0].imgs.length; i++) {
    imgsHTML += `<img src=${url[0].imgs[i]} width="200px">`;
  }
  imgs.innerHTML = imgsHTML;
  document.getElementById("craw-img-list").appendChild(imgs);
}
