const xhr = new XMLHttpRequest();
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
xhr.open("GET", `/api/1.0/company/${window.location.pathname.split("/")[2]}`);
xhr.setRequestHeader("Authorization", `Bearer ${null}`);
xhr.send();

function renderTable(rawUrls) {
  const table = document.createElement("table");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th>ID</th>
    <th>Short Url</th>
    <th>Long Url</th>
    <th>Picture</th>
    <th>Title</th>
    <th>Description</th>
  `;

  for (let i = 0; i < rawUrls.length; i++) {
    const pwd = window.location.origin;
    const url = rawUrls[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td>${url.id}</td>
      <td>https://url4u.today/${url.short_url}</a></td>
      <td>${url.long_url}</td>
      <td>${url.picture}</td>
      <td>${url.title}</td>
      <td>${url.description}</td>
      <a href=${pwd}/url/${url.id}><p>modify</p></a>
      <a href=${pwd}/dashboard/${url.id}><p>info</p></a>
    `;
  }

  document.getElementById("lists").appendChild(table);
}
