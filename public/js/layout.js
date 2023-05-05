$(document).ready(function () {
  if (localStorage.getItem("jwtToken") == null) {
    $("#user").text("Log in");
    $("#user").attr("href", "/user");
    $("#user-state").append(
      `<li class="nav-item" style="padding-left:10px;"><a class="btn btn-primary" role="button" href="/user/register"> Sign up </a></li>`
    );
  }

  if (localStorage.getItem("jwtToken") !== null) {
    $("#user")
      .text("logout")
      .attr("href", "/")
      .attr("onclick", `localStorage.removeItem("jwtToken")`);
  }
});