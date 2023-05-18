if (localStorage.getItem("jwtToken") !== null) {
  window.location.href = "/user/company";
}

$("#sign-in").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/api/1.0/user",
    type: "post",
    data: $("#sign-in").serialize(),
    success: function (data) {
      let token = data.data.access_token;
      localStorage.setItem("jwtToken", token);
      location.reload(true);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    },
  });
});
