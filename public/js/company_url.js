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
  xhr.setRequestHeader("Authorization", `Bearer ${null}`);
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
    <th>Picture</th>
    <th>Title</th>
    <th>Description</th>
    <th>Create Time</th>
  `;

  for (let i = 0; i < rawUrls.length; i++) {
    const pwd = window.location.origin;
    const url = rawUrls[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td>${url.long_url}<br>
      https://url4u.today/${url.short_url}
      </td>
      <td><img src=https://d2zbleiceefv1c.cloudfront.net/${url.picture} height="70px" width="100px"></td>
      <td>${url.title}</td>
      <td>${url.description}</td>
      <td>${url.create_time}</td>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/url/${url.id}'">Modify</button><br>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/dashboard/${url.id}>'">Analytics</button>
    `;
  }

  document.getElementById("lists").appendChild(table);
}

getCompanyUrl()