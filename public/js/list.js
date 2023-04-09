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
xhr.open("POST", "/api/1.0/urls");
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
    <th>title</th>
    <th>description</th>
  `;

  for (let i = 0; i < rawUrls.length; i++) {
    const url = rawUrls[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td>${url.id}</td>
      <td>${url.short_url}</td>
      <td>${url.long_url}</td>
      <td>${url.picture}</td>
      <td>${url.title}</td>
      <td>${url.description}</td>
    `;
  }

  document.getElementById("lists").appendChild(table);
}