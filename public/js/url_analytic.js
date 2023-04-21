const xhr1 = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();
const xhr4 = new XMLHttpRequest();
const xhr5 = new XMLHttpRequest();

function getTotalClick() {
  xhr1.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr1.responseText);
      const totalClicks = JSON.parse(xhr1.responseText)[0].total;
      renderTotalClicks(totalClicks);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr1.status);
    }
  };
  xhr1.open(
    "GET",
    `/api/1.0/total_click/${window.location.pathname.split("/")[3]}`
  );
  let token = localStorage.getItem("jwtToken");
  xhr1.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr1.send();
}
function renderTotalClicks(totalClicks) {
  const totalClickDisplay = document.getElementById("total-clicks");
  totalClickDisplay.innerHTML = totalClicks;
}

function getDeviceClick() {
  xhr2.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr2.responseText);
      const totalDeviceClicks = JSON.parse(xhr2.responseText);
      renderTopDevice(totalDeviceClicks);
      renderDevicePieChart(totalDeviceClicks);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr2.status);
    }
  };
  xhr2.open(
    "GET",
    `/api/1.0/device_click/${window.location.pathname.split("/")[3]}`
  );
  let token = localStorage.getItem("jwtToken");
  xhr2.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr2.send();
}
function renderTopDevice(totalDeviceClicks) {
  let maxTotal = 0;
  let maxDevice = "";

  for (let i = 0; i < totalDeviceClicks.length; i++) {
    if (parseInt(totalDeviceClicks[i].total) > maxTotal) {
      maxTotal = parseInt(totalDeviceClicks[i].total);
      maxDevice = totalDeviceClicks[i].device;
    }
  }
  const topDeviceDisplay = document.getElementById("top-device");
  topDeviceDisplay.innerHTML = maxDevice;
}

function renderDevicePieChart(devices) {
  const devicePieChart = document.getElementById("devicePieChart");
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
  for (let i = 0; i < devices.length; i++) {
    data.labels.push(devices[i].device);
    data.datasets[0].data.push(devices[i].total);
  }
  const config = {
    type: "doughnut",
    data: data,
  };
  new Chart(devicePieChart, config);
}

function getRegionClick() {
  xhr3.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr3.responseText);
      const totalRegionClicks = JSON.parse(xhr3.responseText);
      renderTopLocation(totalRegionClicks);
      renderLocationPieChart(totalRegionClicks);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr3.status);
    }
  };
  xhr3.open(
    "GET",
    `/api/1.0/region_click/${window.location.pathname.split("/")[3]}`
  );
  let token = localStorage.getItem("jwtToken");
  xhr3.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr3.send();
}
function renderTopLocation(totalRegionClicks) {
  let maxTotal = 0;
  let maxRegion = "";

  for (let i = 0; i < totalRegionClicks.length; i++) {
    if (parseInt(totalRegionClicks[i].total) > maxTotal) {
      maxTotal = parseInt(totalRegionClicks[i].total);
      maxRegion = totalRegionClicks[i].region;
    }
  }
  const topRegionDisplay = document.getElementById("top-region");
  topRegionDisplay.innerHTML = maxRegion;
}

function renderLocationPieChart(locations) {
  const locationPieChart = document.getElementById("locationPieChart");
  const data = {
    labels: [],
    datasets: [
      {
        label: "Region Clicks",
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
  for (let i = 0; i < locations.length; i++) {
    data.labels.push(locations[i].region);
    data.datasets[0].data.push(locations[i].total);
  }
  const config = {
    type: "doughnut",
    data: data,
  };
  new Chart(locationPieChart, config);
}

function getReferrerClick() {
  xhr4.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr4.responseText);
      const totalReferrerClicks = JSON.parse(xhr4.responseText);
      renderTopReferer(totalReferrerClicks);
      renderRefererPieChart(totalReferrerClicks);
    } else if (this.readyState === 4) {
      // handle error response
      console.log(xhr4.status);
    }
  };
  xhr4.open(
    "GET",
    `/api/1.0/referrer_click/${window.location.pathname.split("/")[3]}`
  );
  let token = localStorage.getItem("jwtToken");
  xhr4.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr4.send();
}
function renderTopReferer(totalReferrerClicks) {
  let maxTotal = 0;
  let maxReferer = "";

  for (let i = 0; i < totalReferrerClicks.length; i++) {
    if (parseInt(totalReferrerClicks[i].total) > maxTotal) {
      maxTotal = parseInt(totalReferrerClicks[i].total);
      maxReferer = totalReferrerClicks[i].referrer;
    }
  }
  const topDeviceDisplay = document.getElementById("top-referer");
  topDeviceDisplay.innerHTML = maxReferer;
}

function renderRefererPieChart(referer) {
  const refererPieChart = document.getElementById("refererPieChart");
  const data = {
    labels: [],
    datasets: [
      {
        label: "Referer Clicks",
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
  for (let i = 0; i < referer.length; i++) {
    data.labels.push(referer[i].referrer);
    data.datasets[0].data.push(referer[i].total);
  }
  const config = {
    type: "doughnut",
    data: data,
  };
  new Chart(refererPieChart, config);
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

getTotalClick();
getDeviceClick();
getRegionClick();
getReferrerClick();
getTimeClick();

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
