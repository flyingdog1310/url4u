const xhr5 = new XMLHttpRequest();
getTotalClick();
getDeviceClick();
getRegionClick();
getReferrerClick();
getTimeClick();

function getTotalClick() {
  fetch(`/api/1.0/total_click/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      renderTotalClicks(data.total);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTotalClicks(totalClicks) {
  const totalClickDisplay = document.getElementById("total-clicks");
  totalClickDisplay.innerHTML = totalClicks;
}

function getDeviceClick() {
  fetch(`/api/1.0/device_click/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      renderTopSource(data, "top-device");
      renderPieChart(data, "devicePieChart");
    })
    .catch((error) => {
      console.log(error);
    });
}

function getRegionClick() {
  fetch(`/api/1.0/region_click/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      renderTopSource(data, "top-region");
      renderPieChart(data, "locationPieChart");
    })
    .catch((error) => {
      console.log(error);
    });
}

function getReferrerClick() {
  fetch(`/api/1.0/referrer_click/${window.location.pathname.split("/")[3]}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      renderTopSource(data, "top-referer");
      renderPieChart(data, "refererPieChart");
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTimeClick() {
  xhr5.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr5.responseText);
      const totalTimeClicks = JSON.parse(xhr5.responseText);
      renderAreaChart(totalTimeClicks);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr5.status);
    }
  };
  xhr5.open(
    "POST",
    `/api/1.0/time_click/${window.location.pathname.split("/")[3]}`
  );
  let token = localStorage.getItem("jwtToken");
  xhr5.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr5.send(JSON.stringify());
}
let timeChart;
const today = new Date().toISOString().split("T")[0];
document.getElementById("stop").setAttribute("max", today);

$("#time-clicks").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: `/api/1.0/time_click/${window.location.pathname.split("/")[3]}`,
    type: "post",
    data: $("#time-clicks").serialize(),
    beforeSend: function (xhr) {
      let token = localStorage.getItem("jwtToken");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
    success: function (data) {
      if (timeChart) {
        timeChart.destroy();
        renderAreaChart(data);
      }
    },
  });
});

function renderAreaChart(totalTimeClicks) {
  const areaChart = document.getElementById("areaChart");
  const data = {
    labels: [],
    datasets: [
      {
        label: "Url clicks",
        data: [],
        borderColor: "#086391",
      },
    ],
  };

  if (totalTimeClicks[1]) {
    data.datasets.push({
      label: "Compare Url clicks",
      data: [],
      borderColor: "#44abdf",
    });
  }

  for (let i = 0; i < totalTimeClicks[0].length; i++) {
    data.labels.push(totalTimeClicks[0][i].time);
    let total = 0;
    if (totalTimeClicks[0][i].total !== null) {
      total = Number(totalTimeClicks[0][i].total);
    }
    data.datasets[0].data.push(total);

    if (totalTimeClicks[1]) {
      let total1 = 0;
      if (totalTimeClicks[1][i].total !== null) {
        total1 = Number(totalTimeClicks[1][i].total);
      }
      data.datasets[1].data.push(total1);
    }
  }

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  };
  timeChart = new Chart(areaChart, config);
}

function renderPieChart(source, renderId) {
  const PieChart = document.getElementById(renderId);
  const data = {
    labels: [],
    datasets: [
      {
        label: "Device Clicks",
        data: [],
        backgroundColor: [
          "#086391",
          "#44abdf",
          "#8fb3c7",
          "#4e6f9c",
          "#969ca1",
          "#c2c2c2",
        ],
        hoverOffset: 4,
      },
    ],
  };
  for (let i = 0; i < source.length; i++) {
    data.labels.push(source[i].source);
    data.datasets[0].data.push(source[i].total);
  }
  const config = {
    type: "doughnut",
    data: data,
  };
  new Chart(PieChart, config);
}

function renderTopSource(totalSourceClicks, renderId) {
  let maxTotal = 0;
  let maxSource = "";

  for (let i = 0; i < totalSourceClicks.length; i++) {
    if (parseInt(totalSourceClicks[i].total) > maxTotal) {
      maxTotal = parseInt(totalSourceClicks[i].total);
      maxSource = totalSourceClicks[i].source;
    }
  }
  const topDeviceDisplay = document.getElementById(renderId);
  topDeviceDisplay.innerHTML = maxSource;
}

if (localStorage.getItem("jwtToken") !== null) {
  let token = localStorage.getItem("jwtToken");
  $.ajax({
    type: "GET",
    url: `/api/1.0/company/url/${window.location.pathname.split("/")[3]}`,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  })
    .done(function (response) {
      console.log(response);
      const urls = response;
      renderDropdown(urls);
    })
    .fail(function (err) {
      localStorage.removeItem("jwtToken");
      console.log(err.responseJSON);
      location.reload();
    });
}

function renderDropdown(urls) {
  const select = document.createElement("select");
  select.classList.add("select");
  select.name = "url_id";
  for (let i = 0; i < urls.length; i++) {
    const currentUrlId = window.location.pathname.split("/")[3];
    const url = urls[i];
    if (url.id != currentUrlId) {
      const option = document.createElement("option");
      option.value = url.id;
      option.textContent = url.short_url;
      select.appendChild(option);
    }
  }
  document.getElementById("compare-url").appendChild(select);
}
