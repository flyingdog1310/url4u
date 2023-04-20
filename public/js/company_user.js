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
    <th style="width:100px">Operate</th>
  `;
  const body = table.createTBody();
  for (let i = 0; i < users.length; i++) {
    const pwd = window.location.origin;
    const user = users[i];
    let userRole = "";
    if (user.user_role == 0) {
      userRole = "admin";
    }
    if (user.user_role == 1) {
      userRole = "edit";
    }
    if (user.user_role == 2) {
      userRole = "view";
    }
    const row = body.insertRow();
    row.innerHTML = `
      <td>${userRole}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='#'">Adjust</button><br>
      </td>
    `;
  }

  document.getElementById("lists").appendChild(table);
}

getCompanyUser();
