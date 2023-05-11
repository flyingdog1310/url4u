$(document).ready(function () {
  if (localStorage.getItem("jwtToken") == null) {
    $("#user").text("Log in");
    $("#user").attr("href", "/user");
  }

  if (localStorage.getItem("jwtToken") !== null) {
    $("#user")
      .text("Log out")
      .attr("href", "/")
      .attr("onclick", `localStorage.removeItem("jwtToken")`);
  }
});