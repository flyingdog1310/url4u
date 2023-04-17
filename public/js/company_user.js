const xhr = new XMLHttpRequest();
function getCompanyUser() {
  const pwd = window.location.pathname.split("/")[2];
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr.responseText);
      const users = JSON.parse(xhr.responseText);
      renderTable(users);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr.status);
    }
  };
  xhr.open("GET", `/api/1.0/company/${pwd}/user`);
  xhr.setRequestHeader("Authorization", `Bearer ${null}`);
  xhr.send();
}

function renderTable(users) {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("text-nowrap");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th>Role</th>
    <th>User</th>
    <th>Email</th>
  `;

  for (let i = 0; i < users.length; i++) {
    const pwd = window.location.origin;
    const user = users[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td>${user.user_role}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='#'">Adjust</button><br>
    `;
  }

  document.getElementById("lists").appendChild(table);
}

getCompanyUser();
