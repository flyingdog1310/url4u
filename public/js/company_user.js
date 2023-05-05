getCompanyUser();

function getCompanyUser() {
  const pwd = window.location.pathname.split("/")[2];
  let token = localStorage.getItem("jwtToken");
  fetch(`/api/1.0/company/${pwd}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving users.");
      }
    })
    .then((users) => {
      renderTable(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTable(users) {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("text-nowrap");
  const header = table.createTHead().insertRow();
  header.innerHTML = `
    <th>Role</th>
    <th>User Name</th>
    <th>Email</th>
    <th style="width:100px">Operate</th>
  `;
  const body = table.createTBody();
  for (let i = 0; i < users.length; i++) {
    const pwd = window.location.origin;
    const user = users[i];
    let userRole = "";
    if (user.user_role == 0) {
      userRole = "Admin";
    }
    if (user.user_role == 1) {
      userRole = "Editor";
    }
    if (user.user_role == 2) {
      userRole = "Viewer";
    }
    const row = body.insertRow();
    row.innerHTML = `
      <td>${userRole}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
      <button type="button" class="btn btn-info btn-xs" onclick="location.href='#'">Modify</button><br>
      <button type="button" class="btn btn-danger btn-xs" onclick="location.href='#'">Remove</button>
      </td>
    `;
  }

  document.getElementById("lists").appendChild(table);
}

$("#add-company-user").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: `/api/1.0/company/${window.location.pathname.split("/")[2]}/user`,
    type: "post",
    data: $("#add-company-user").serialize(),
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
