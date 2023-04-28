const today = new Date().toISOString().split("T")[0];
document.getElementById("stop").setAttribute("max", today);

getTotalClick();
getTimeClick();
getDayClick();
getDeviceClick();
getRegionClick();
getReferrerClick();
renderMapChart([], "map-chart");
renderColumnChart([], "column-chart");

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
  const totalClickDisplay = document.getElementById("total-click");
  totalClickDisplay.innerHTML = totalClicks;
}

function getTimeClick() {
  const token = localStorage.getItem("jwtToken");
  const url = `/api/1.0/time_click/${window.location.pathname.split("/")[3]}`;
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      renderLineChart(data);
      renderClickCompare(
        data,
        "click-today",
        "clicks-today-compare",
        "clicks-today-compare-i"
      );
    })
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });
}

function renderClickCompare(
  data,
  clickNowDisplay,
  clickBeforeDisplay,
  clickCompareDisplayI
) {
  const clickNowDisplayId = document.getElementById(clickNowDisplay);
  const clickBeforeDisplayId = document.getElementById(clickBeforeDisplay);
  const clickCompareDisplayId = document.getElementById(clickCompareDisplayI);
  const clickNow = data[0][data[0].length - 1].total;
  const clickBefore = data[0][data[0].length - 2].total;
  console.log(clickNow);
  clickNowDisplayId.innerHTML = clickNow;
  if (clickNow == clickBefore) {
    clickCompareDisplayId.classList.add("fa-caret-left");
  } else if (clickNow > clickBefore) {
    clickCompareDisplayId.classList.add("fa-caret-up");
  } else {
    clickCompareDisplayId.classList.add("fa-caret-down");
  }

  if (clickBefore == 0) {
    clickBeforeDisplayId.textContent = "0%";
  } else {
    clickBeforeDisplayId.textContent = `${Math.floor(
      (clickNow / clickBefore) * 100
    )}%`;
  }
}

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
      $("#line-chart").empty();
      renderLineChart(data);
    },
  });
});

function renderLineChart(timeClicks) {
  const data = [];
  const data1 = [];

  for (let i = 0; i < timeClicks[0].length; i++) {
    data.push([]);
    data[i].push(timeClicks[0][i].time);
    let total = 0;
    if (timeClicks[0][i].total !== null) {
      total = Number(timeClicks[0][i].total);
    }
    data[i].push(total);

    if (timeClicks[1]) {
      data1.push([]);
      data1[i].push(timeClicks[1][i].time);
      let total1 = 0;
      if (timeClicks[1][i].total !== null) {
        total1 = Number(timeClicks[1][i].total);
      }
      data1[i].push(total1);
    }
  }
  const chart = anychart.line();
  const series = chart.line(data);
  if (data1[0]) {
    const series1 = chart.line(data1);
  }
  chart.container("line-chart");
  chart.draw();
}

function getDayClick() {
  const token = localStorage.getItem("jwtToken");
  const url = `/api/1.0/time_click/${window.location.pathname.split("/")[3]}`;
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  const body = { method: "hour", range: 168 };
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      renderHeatChart(data);
      renderClickCompare(
        data,
        "click-hour",
        "clicks-hour-compare",
        "clicks-hour-compare-i"
      );
    })
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });
}

function renderHeatChart(dayClicks) {
  const data = [];
  for (let i = 0; i < dayClicks[0].length; i++) {
    let day = dayClicks[0][i].time.split(" ")[0];
    let hour = dayClicks[0][i].time.split(" ")[1];
    let total = 0;
    if (dayClicks[0][i].total) {
      total = dayClicks[0][i].total;
    }
    data.push({ x: day, y: hour, heat: total });
  }
  console.log(data);
  const chart = anychart.heatMap(data);
  const customColorScale = anychart.scales.linearColor();
  customColorScale.colors(["#bae0ef", "#7a93c5"]);
  chart.colorScale(customColorScale);
  chart.labels().format("");
  chart.tooltip().format("{%y}:00 Clicks:{%heat}");
  chart.container("heat-chart");
  chart.draw();
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
      renderPieChart(data, "device-pie-chart");
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
      renderPieChart(data, "referer-pie-chart");
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderPieChart(source, renderId) {
  const data = [];
  for (let i = 0; i < source.length; i++) {
    data.push({});
    data[i].x = source[i].source;
    data[i].value = source[i].total;
  }
  const chart = anychart.pie(data);
  chart.container(renderId);
  chart.draw();
}

function renderColumnChart(source, renderId) {
  const data = [
    ["sun", 10000],
    ["mon", 12000],
    ["tue", 13000],
    ["thu", 10000],
    ["fri", 9000],
    ["sat", 9000],
    ["sun", 9000],
  ];

  const chart = anychart.column();
  const series = chart.column(data);
  chart.container(renderId);
  chart.draw();
}

function renderMapChart(source, renderId) {
  const data = [];
  const map = anychart.map();
  map.geoData(anychart.maps.world);

  // set the series
  let series = map.choropleth(data);

  // disable labels
  series.labels(false);

  // set the container
  map.container("map-chart");
  map.draw();
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
