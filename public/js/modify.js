const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // handle success response
    console.log(xhr.responseText);
    const url = JSON.parse(xhr.responseText);
    insertDefault(url);
  } else if (this.readyState === 4) {
    // handle error response
    console.log(xhr.status);
  }
};
xhr.open("GET", `/api/1.0${window.location.pathname}`);
xhr.setRequestHeader("Authorization", `Bearer ${null}`);
xhr.send();

function insertDefault(url) {
  document.getElementById("short_url").value = url[0].short_url;
  document.getElementById("long_url").value = url[0].long_url;
  document.getElementById("title").value = url[0].title;
  document.getElementById("description").value = url[0].description;
}
