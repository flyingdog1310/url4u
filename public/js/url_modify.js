renderModifyPage();
renderCrawlImage();

function renderModifyPage() {
  let token = localStorage.getItem("jwtToken");
  fetch(`/api/1.0/url/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response not ok.");
    })
    .then((data) => {
      const url = data;
      if (!url[0].picture) {
        url[0].picture = "pic-undefined.jpg";
      }
      insertDefault(url);
      renderBack(url);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function renderCrawlImage() {
  let token = localStorage.getItem("jwtToken");
  fetch(`/api/1.0/url/crawl/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response not ok.");
    })
    .then((data) => {
      const url = data;
      if (url[0].meta) {
        addCrawImgs(url);
        insertSuggestion(url);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function insertDefault(url) {
  document.getElementById("update-short-url").action = `/api/1.0/url/${url[0].id}`;
  document.getElementById("short_url").value = url[0].short_url;
  document.getElementById("picturePreview").src = `https://d2zbleiceefv1c.cloudfront.net/${url[0].picture}`;
  document.getElementById("long_url").value = url[0].long_url;
  document.getElementById("title").value = url[0].title;
  document.getElementById("description").value = url[0].description;
}

function renderBack(url) {
  const backCompany = document.getElementById("back-company");
  backCompany.href = `/company/${url[0].company_id}`;
}

function addCrawImgs(url) {
  const imgs = document.createElement("div");
  let imgsHTML = "";
  for (let i = 0; i < url[0].meta.images.length; i++) {
    const img = new Image();
    img.src = url[0].meta.images[i];
    img.onload = function () {
      imgsHTML += `<button class="img-btn" data-img-url="${url[0].meta.images[i]}" style="background-image: url(${url[0].meta.images[i]});"></button>`;
      imgs.innerHTML = imgsHTML;
      document.getElementById("craw-img-list").appendChild(imgs);
    };
    img.onerror = function () {
      imgs.remove();
    };
  }

  $(document).ready(function () {
    $(document).on("click", ".img-btn", function () {
      const img_url = $(this).data("img-url");
      $("#picturePreview").attr("src", img_url);
      $("#picture_url").val(img_url);
    });
  });
}

function insertSuggestion(url) {
  if (!document.getElementById("title").value) {
    const crawlTitle = url[0].meta.title[0];
    if (crawlTitle) {
      document.getElementById("title").value = crawlTitle.slice(0, 128);
    }
  }
  if (!document.getElementById("description").value) {
    const crawlDescription = url[0].meta.description[0];
    if (crawlDescription) {
      document.getElementById("description").value = crawlDescription.slice(0, 128);
    }
  }
}

const picture = document.getElementById("picture");
const picturePreview = document.getElementById("picturePreview");
picture.onchange = (evt) => {
  const [file] = picture.files;
  if (file) {
    picturePreview.src = URL.createObjectURL(file);
  }
};

$("#copy-url").on("click", function () {
  const short_url = document.getElementById("short_url").value;
  const shortUrl = `https://url4u.today/${short_url}`;
  const textArea = $("<textarea>").val(shortUrl).appendTo("body");
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Copied to clipboard: " + shortUrl);
});

$("#update-short-url").submit(function (e) {
  e.preventDefault();
  const short_url = document.getElementById("short_url").value;
  const shortUrl = `https://url4u.today/${short_url}`;
  let token = localStorage.getItem("jwtToken");
  let formData = new FormData(this);
  $.ajax({
    url: this.action,
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
    success: function (data) {
      if (!token) {
        localStorage.setItem("createdUrl", data.url_id);
        alert(` Successfully modify ${shortUrl}\n Register now to store and track your Url`);
        location.href = "/user/register";
      } else {
        alert(`Successfully modify ${shortUrl}`);
        location.href = document.getElementById("back-company").href;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    },
  });
});
