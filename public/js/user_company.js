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
        .done(function (data) {
            const companies = data;
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
    <th>Url Group</th>
    <th>Level</th>
    <th style="width:250px">Role</th>
    <th style="width:300px">Operate</th>
  `;
    const body = table.createTBody();
    for (let i = 0; i < companies.length; i++) {
        const company = companies[i];
        if (company.level == 0) {
            company.level = "free-tier";
        }
        if (company.level == 1) {
            company.level = "premium";
        }
        if (company.user_role == 0) {
            company.user_role = "Admin";
        }
        if (company.user_role == 1) {
            company.user_role = "Editor";
        }
        if (company.user_role == 2) {
            company.user_role = "Viewer";
        }
        const row = body.insertRow();
        row.innerHTML = `
      <td>${company.name}</td>
      <td><span class="badge badge-success">${company.level}</span></td>
      <td>${company.user_role}</td>
      <td>
      <button type="button" style="margin-right:10px;" class="btn btn-info btn-xs" onclick="location.href='/company/${company.id}'"><i class="fas fa-list"></i> Url List</button>
      <button type="button" class="btn btn-primary btn-xs" onclick="location.href='/company/${company.id}/user'"><i class="fas fa-user"></i> Members</button><br>
      </td>
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
            let token = localStorage.getItem("jwtToken");
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        },
        success: function (data) {
            location.reload();
        },
    });
});
