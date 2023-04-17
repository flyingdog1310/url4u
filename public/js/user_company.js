if (localStorage.getItem("jwtToken") == null) {
  window.location.href = "/user";
}

if (localStorage.getItem("jwtToken") !== null) {
  let token = localStorage.getItem("jwtToken");
  $.ajax({
    type: "GET",
    url: "/api/1.0/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  })
    .done(function (response) {
      console.log(response);
      const companies = JSON.parse(response);
      renderTable(companies);
    })
    .fail(function (err) {
      localStorage.removeItem("jwtToken");
      console.log(err.responseJSON);
      location.reload();
    });
}

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

$("#create-company").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/api/1.0/company",
    type: "post",
    data: $("#create-company").serialize(),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
    success: function (data) {
      location.reload();
    },
  });
});
