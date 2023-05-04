const today = new Date().toISOString().split("T")[0];
document.getElementById("stop").setAttribute("max", today);

renderPage();

async function renderPage() {
  getTotalClick();
  getTimeClick();
  getDayClick();
  getWeekClick();
  getTopClick();
  getDeviceClick();
  getReferrerClick();
  getRegionClick();
}

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
        "clicks-today-compare-i",
        "clicks-today-compare-color"
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
  clickCompareDisplayI,
  clickCompareDisplayColor
) {
  const clickNowDisplayId = document.getElementById(clickNowDisplay);
  const clickBeforeDisplayId = document.getElementById(clickBeforeDisplay);
  const clickCompareDisplayId = document.getElementById(clickCompareDisplayI);
  const clickCompareColorId = document.getElementById(clickCompareDisplayColor);
  let clickNow = data[0][data[0].length - 1].total;
  let clickBefore = data[0][data[0].length - 2].total;
  clickNowDisplayId.innerHTML = clickNow;
  if (clickBefore == 0 || clickBefore == null) {
    clickBefore = 1;
  }
  if (clickNow == 0 || clickBefore == null) {
    clickNow = 1;
  }
  if (clickNow == clickBefore) {
    clickCompareDisplayId.classList.add("fa-caret-left");
    clickCompareColorId.classList.add("text-warning");
    clickBeforeDisplayId.textContent = "-%";
  }
  if (clickNow > clickBefore) {
    clickCompareDisplayId.classList.add("fa-caret-up");
    clickCompareColorId.classList.add("text-success");
    clickBeforeDisplayId.textContent = `${Math.floor(
      (clickNow / clickBefore) * 100
    )}%`;
  }
  if (clickNow < clickBefore) {
    clickCompareDisplayId.classList.add("fa-caret-down");
    clickCompareColorId.classList.add("text-danger");
    clickBeforeDisplayId.textContent = `-${Math.floor(
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
        "clicks-hour-compare-i",
        "clicks-hour-compare-color"
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
  chart.legend(true);
  chart.container("heat-chart");
  chart.draw();
}
function getWeekClick() {
  fetch(`/api/1.0/week_click/${window.location.pathname.split("/")[3]}`, {
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
      console.log(data);
      let week = [
        ["Sun", 0],
        ["Mon", 0],
        ["Tue", 0],
        ["Wed", 0],
        ["Thu", 0],
        ["Fri", 0],
        ["Sat", 0],
      ];
      for (let i = 0; i < data.length; i++) {
        week[data[i].weekday - 1][1] = data[i].total_count;
      }
      renderColumnChart(week, "column-chart");
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTopClick() {
  fetch(`/api/1.0/top_click/${window.location.pathname.split("/")[3]}`, {
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
      console.log(data);
      renderTopClick(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTopClick(data) {
  const displayName1 = document.getElementById("top-click1");
  const displayName2 = document.getElementById("top-click2");
  const displayName3 = document.getElementById("top-click3");
  const displayName4 = document.getElementById("top-click4");
  const displayName5 = document.getElementById("top-click5");
  const displayNameGroup = [
    displayName1,
    displayName2,
    displayName3,
    displayName4,
    displayName5,
  ];

  for (let i = 0; i < data.length; i++) {
    displayNameGroup[i].innerHTML = `${data[i].time_range
      .slice(0, 16)
      .replace("T", " ")}
    <span class="float-right" id="top-click-count1"> ${data[i].count}</span> 
    <div class="progress progress-sm">
      <div class="progress-bar bg-primary"  id="top-click-percent1" style="width:${Math.floor(
        (data[i].count / data[0].count) * 100
      )}%"></div>`;
  }
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
      renderTopSource(data, [
        "device1",
        "device2",
        "device3",
        "device4",
        "device5",
      ]);
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
      renderMapChart(data, "map-chart");
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
      renderTopSource(data, [
        "referrer1",
        "referrer2",
        "referrer3",
        "referrer4",
        "referrer5",
      ]);
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
  const data = source;
  const chart = anychart.column();
  const series = chart.column(data);
  chart.container(renderId);
  chart.draw();
}

function renderMapChart(source, renderId) {
  let data = [];
  for (let i = 0; i < source.length; i++) {
    let region = { id: source[i].source, value: source[i].total };
    data.push(region);
  }
  console.log(data);
  const map = anychart.map();
  map.geoData(anychart.maps.world);
  let series = map.choropleth(data);
  map.container(renderId);
  map.draw();
}

function renderTopSource(totalSourceClicks, renderIdArr) {
  sortArrayByTotalDescending(totalSourceClicks);

  const topSourceDisplay = document.getElementById(renderIdArr[0]);
  const secondSourceDisplay = document.getElementById(renderIdArr[1]);
  const thirdSourceDisplay = document.getElementById(renderIdArr[2]);
  const fourthSourceDisplay = document.getElementById(renderIdArr[3]);
  const fifthSourceDisplay = document.getElementById(renderIdArr[4]);
  const sourceGroup = [
    topSourceDisplay,
    secondSourceDisplay,
    thirdSourceDisplay,
    fourthSourceDisplay,
    fifthSourceDisplay,
  ];
  for (let i = 0; i < totalSourceClicks.length; i++) {
    sourceGroup[i].innerHTML = totalSourceClicks[i].source;
  }
}
function sortArrayByTotalDescending(array) {
  return array.sort(function (a, b) {
    return b.total - a.total;
  });
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
  const defaultOption = document.createElement("option");
  defaultOption.value = null;
  defaultOption.textContent = "---Compare Url---";
  select.appendChild(defaultOption);
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
