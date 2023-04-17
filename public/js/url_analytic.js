const xhr1 = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();
const xhr4 = new XMLHttpRequest();

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
  xhr1.setRequestHeader("Authorization", `Bearer ${null}`);
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
  xhr2.setRequestHeader("Authorization", `Bearer ${null}`);
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
          "#2085ec",
          "#72b4eb",
          "#0a417a",
          "#8464a0",
          "#cea9bc",
          "#323232",
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
  xhr3.setRequestHeader("Authorization", `Bearer ${null}`);
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
          "#2085ec",
          "#72b4eb",
          "#0a417a",
          "#8464a0",
          "#cea9bc",
          "#323232",
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
  xhr4.setRequestHeader("Authorization", `Bearer ${null}`);
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
          "#2085ec",
          "#72b4eb",
          "#0a417a",
          "#8464a0",
          "#cea9bc",
          "#323232",
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

getTotalClick();
getDeviceClick();
getRegionClick();
getReferrerClick();

function renderAreaChart() {
  const areaChart = document.getElementById("areaChart");
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = [1, 2, 3, 4, 5, 6, 7, 8];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Url 1",
        data: [1, 2, 3, 4, 5, 6, 7, 5000],
        borderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Url 2",
        data: [1, 2, 3, 4, 5, 3000, 7, 8],
        borderColor: "rgb(201, 203, 207)",
      },
    ],
  };
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
  new Chart(areaChart, config);
}

renderAreaChart();
