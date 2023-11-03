import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}
const Kakaomap = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locPosition, setLocPosition] = useState(
    new window.kakao.maps.LatLng(lat, lon)
  );
  let imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  let imageSize = new window.kakao.maps.Size(24, 35);
  let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
  useEffect(() => {
    // 현재위치 받아오기
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
    // 현재 위치 마커 및 음식점 위치 마커 표시
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      //draggable: false,
      level: 4
    };
    let map = new window.kakao.maps.Map(container, options);
    let ps = new window.kakao.maps.services.Places(map);

    const placesSearchCB = function (
      result: any,
      status: any,
      Pagination: any
    ) {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(result[i].y, result[i].x)
          });
          let infowindow = new window.kakao.maps.InfoWindow({
            content: result[i].place_name
          });
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });
        }
        if (Pagination.hasNextPage) {
          Pagination.nextPage(); // 다음 페이지로 요청
        }
      }
    }; // 128.904577167914 35.2480689110871 // 35.248081041497755 128.90452790690753
    ps.categorySearch('FD6', placesSearchCB, { useMapBounds: true });
    let marker = new window.kakao.maps.Marker({
      // 현재 위치 마커
      map: map,
      position: locPosition,
      image: markerImage
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
