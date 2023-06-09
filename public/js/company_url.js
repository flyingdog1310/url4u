if (localStorage.getItem("jwtToken") == null) {
  window.location.href = "/user";
}

getCompanyUrl();

function getCompanyUrl() {
  const pwd = window.location.pathname.split("/")[2];
  let token = localStorage.getItem("jwtToken");

  fetch(`/api/1.0/company/${pwd}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      renderTable(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTable(rawUrls) {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th style="width:300px"><i class="fas fa-link"></i> Url</th>
    <th style="width:150px"><i class="fas fa-eye"></i> Picture</th>
    <th style="width:40%"><i class="fas fa-clipboard"></i> Title & Description</th>
    <th style="width:150px"><i class="fas fa-clock"></i> Create Time</th>
    <th style="width:250px"><i class="fas fa-edit"></i> Operate</th>
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
      <td class='td'>
      <div style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-bottom: 8px;">
      <a href=${url.long_url} target=”_blank” style="color: #858585;" referrerpolicy="origin">${url.long_url}</a>
      </div>
      <a href=https://url4u.today/${url.short_url} id="${
      url.short_url
    }-link" target=”_blank” referrerpolicy="origin">https://url4u.today/${
      url.short_url
    }    </a><button class="copy-button btn btn-secondary btn-xs" data-short-url="${
      url.short_url
    }"><i class="fas fa-copy"></i></button>
      </td>
      <td>
      <div class="display" style="width: 120px; height: 67px; overflow: hidden;">
      <img src=https://d2zbleiceefv1c.cloudfront.net/${
        url.picture
      }  style="object-fit: cover; object-position: center center; width: 100%; height: 100%;"></div></td>
      <td class='td'>
      <dt style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${
        url.title
      }</dt>
      <dd style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;color: #858585;">${
        url.description
      }</dd>
      </td>
      <td>${url.create_time.slice(0, 19).split("T")[0]}<br>
      <small>${url.create_time.slice(0, 19).split("T")[1].slice(0, 5)}</small>
      </td>
      <td>
      <button  style="margin-right:10px;" type="button" class="btn btn-info btn-xs" onclick="location.href='/url/modify/${
        url.id
      }'"><i class="fas fa-edit"></i> Modify</button>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/url/analytic/${
        url.id
      }'"><i class="fas fa-chart-line"></i> Analytics</button>
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
    error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    },
  });
});
