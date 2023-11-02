import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}
console.log(window.kakao.maps);
const Kakaomap = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locPosition, setLocPosition] = useState(
    new window.kakao.maps.LatLng(lat, lon)
  );
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setLat(lat);
        setLon(lon);
        setLocPosition(new window.kakao.maps.LatLng(lat, lon));
      });
    }
  }, []);
  if (lat !== 0 && lon !== 0) {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      //draggable: false,
      level: 4
    };
    let map = new window.kakao.maps.Map(container, options);
    let marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition
    });
    marker.setMap(map);
    let zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }
  return (
    <div>
      <div id='map' style={{ width: '50vw', height: '100vh' }}></div>
    </div>
  );
};
export default Kakaomap;
