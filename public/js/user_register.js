if (localStorage.getItem("jwtToken") !== null) {
  window.location.href = "/user/company";
}

$("#register").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/api/1.0/user/register",
    type: "post",
    data: $("#register").serialize(),
    success: function (data) {
      console.log(data.data.access_token);
      let token = data.data.access_token;
      localStorage.setItem("jwtToken", token);
      console.log(data);
      location.reload(true);
    },
  });
});