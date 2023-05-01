const xhr = new XMLHttpRequest();
function getCompanyUrl() {
  const pwd = window.location.pathname.split("/")[2];
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr.responseText);
      const rawUrls = JSON.parse(xhr.responseText);
      renderTable(rawUrls);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr.status);
    }
  };
  xhr.open("GET", `/api/1.0/company/${pwd}`);
  let token = localStorage.getItem("jwtToken");
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.send();
}

function renderTable(rawUrls) {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("text-nowrap");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th>Url</th>
    <th style="width:120px">Picture</th>
    <th>Title</th>
    <th>Description</th>
    <th>Create Time</th>
    <th style="width:100px">Operate</th>
  `;
  const body = table.createTBody();
  for (let i = 0; i < rawUrls.length; i++) {
    const pwd = window.location.origin;
    const url = rawUrls[i];
    if (!url.picture) {
      url.picture = "pic-undefined.jpg";
    }
    const row = body.insertRow();
    row.innerHTML = `
      <td class='td'><a href=${url.long_url}>${url.long_url}</a><br>
      <a href=https://url4u.today/${url.short_url} id="${url.short_url}-link">https://url4u.today/${url.short_url}    </a><button class="copy-button btn btn-secondary btn-xs"" data-short-url="${url.short_url}"><i class="fas fa-copy"></i></button>
      </td>
      <td><img src=https://d2zbleiceefv1c.cloudfront.net/${url.picture} height="70px" width="100px" class="display"></td>
      <td class='td'>${url.title}</td>
      <td class='td'>${url.description}</td>
      <td>${url.create_time}</td>
      <td>
      <button type="button" class="btn btn-info btn-xs" onclick="location.href='/url/modify/${url.id}'"><i class="fas fa-pencil-alt"></i> Modify</button><br>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/url/analytic/${url.id}'"><i class="fas fa-folder"></i> Analytics</button>
      </td>
    `;
  }
  document.getElementById("lists").appendChild(table);
  $(".copy-button").on("click", function () {
    const short_url = $(this).data("short-url");
    const shortUrl = $(`#${short_url}-link`).text();
    const textArea = $("<textarea>").val(shortUrl).appendTo("body");
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("Copied to clipboard: " + shortUrl);
  });
}

getCompanyUrl();

$("#add-company-url").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/api/1.0/url",
    type: "post",
    data: $("#add-company-url").serialize(),
    beforeSend: function (xhr) {
      let token = localStorage.getItem("jwtToken");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
    success: function (data) {
      location.reload();
    },
  });
});
