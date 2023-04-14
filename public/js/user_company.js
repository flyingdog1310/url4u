const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // handle success response
    console.log(xhr.responseText);
    const companies = JSON.parse(xhr.responseText);
    renderTable(companies);
  } else if (this.readyState === 4) {
    // handle error response
    console.log(xhr.status);
  }
};
xhr.open("GET", `/api/1.0/user/${window.location.pathname.split("/")[2]}`);
xhr.setRequestHeader("Authorization", `Bearer ${null}`);
xhr.send();

function renderTable(companies) {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("text-nowrap");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th>company</th>
    <th>level</th>
    <th>role</th>
  `;

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td>${company.name}</td>
      <td>${company.level}</td>
      <td>${company.user_role}</td>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/company/${company.id}/user'">Manage</button><br>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/company/${company.id}'">Url</button><br>
    `;
  }

  document.getElementById("lists").appendChild(table);
}