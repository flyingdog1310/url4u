if (localStorage.getItem("jwtToken") !== null) {
  window.location.href = "/user/company";
}

$("#register").submit(function (e) {
  e.preventDefault();
  let data = $("#register").serializeArray();
  let createdUrl = localStorage.getItem("createdUrl");
  data.push({ name: "createdUrl", value: createdUrl });
  $.ajax({
    url: "/api/1.0/user/register",
    type: "post",
    data: data,
    success: function (data) {
      localStorage.removeItem("createdUrl");
      let token = data.data.access_token;
      localStorage.setItem("jwtToken", token);
      location.reload(true);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    },
  });
});
