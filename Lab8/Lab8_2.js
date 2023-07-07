const btn = document.getElementById("btn");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");

let mapObj = null;
let defaultCoord = [10.7743, 106.6669];
let zoomLevel = 8;
let mapConfig = {
  attributionControl: false, // để ko hiện watermark nữa
  center: defaultCoord, // vị trí map mặc định hiện tại
  zoom: zoomLevel, // level zoom
};
mapObj = L.map("sethPhatMap", { attributionControl: false });

const showView = (defaultCoord1, zoomLevel1) => {
  mapObj.setView(defaultCoord1, zoomLevel1);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapObj);
  L.marker(defaultCoord).addTo(mapObj);
};
showView(defaultCoord, zoomLevel);
btn.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let x = position.coords.latitude;
      let y = position.coords.longitude;
      latitude.textContent = x + "";
      longitude.textContent = y + "";
      defaultCoord = [x, y];
      let marker = L.marker(defaultCoord).addTo(mapObj);
      var popup = L.popup();
      popup.setContent("<b>Mr Quynh</b> <br> Hello World Nà");
      marker.bindPopup(popup);

      showView(defaultCoord, 18);
    });
  } else {
    alert("Not support");
  }
};
