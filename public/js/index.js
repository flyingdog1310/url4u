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
      const companies = response;
      renderDropdown(companies);
    })
    .fail(function (err) {
      localStorage.removeItem("jwtToken");
      console.log(err.responseJSON);
      location.reload();
    });
}

function renderDropdown(companies) {
  const select = document.createElement("select");
  select.classList.add("select");
  select.name = "company_id";
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const option = document.createElement("option");
    option.value = company.id;
    option.textContent = company.name;
    select.appendChild(option);
  }

  document.getElementById("company").appendChild(select);
}
