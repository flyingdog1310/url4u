const xhr1 = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();
const xhr4 = new XMLHttpRequest();

function getTotalClick() {
  xhr1.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr1.responseText);
      const totalClicks = JSON.parse(xhr1.responseText);
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

function getDeviceClick() {
  xhr2.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr2.responseText);
      const totalDeviceClicks = JSON.parse(xhr2.responseText);
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

function getRegionClick() {
  xhr3.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr3.responseText);
      const totalDeviceClicks = JSON.parse(xhr3.responseText);
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

function getReferrerClick() {
  xhr4.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // handle success response
      console.log(xhr4.responseText);
      const totalDeviceClicks = JSON.parse(xhr4.responseText);
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

getTotalClick();
getDeviceClick();
getRegionClick();
getReferrerClick();
