import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from './Loading';

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
  const [markerbtn, setMarkerbtn] = useState(false);
  const [code, setCode] = useState<string>('');
  const [test, setTest] = useState<boolean>(false);
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
      level: 4
    };
    let map = new window.kakao.maps.Map(container, options);
    let ps = new window.kakao.maps.services.Places(map);
    if (markerbtn) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      let places = new window.kakao.maps.services.Places();
      window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: any) {
          searchAddrFromCoords(
            mouseEvent.latLng,
            function (result: any, status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                const callback = function (result: any, status: any) {
                  if (status === window.kakao.maps.services.Status.OK) {
                    setCode(result[0].category_group_code);
                    //console.log(result[0].place_name); // 음식점 이름
                    //console.log(result[0].x); // 음식점 x좌표
                    //console.log(result[0].y); // 음식점 y좌표
                    if (code === 'FD6') {
                      let newmarker = new window.kakao.maps.Marker({
                        // 음식점 마커
                        map: map,
                        position: new window.kakao.maps.LatLng(
                          result[0].y,
                          result[0].x
                        )
                      });
                      newmarker.setPosition(mouseEvent.latLng);
                      newmarker.setMap(map);
                      setCode('');
                    }
                  }
                };
                places.keywordSearch(result[0].address.address_name, callback);
                // 마우스로 클릭한 곳이 음식점이면 마커 표시
              }
            }
          );
        }
      );
      function searchAddrFromCoords(coords: any, callback: any) {
        // 좌표로 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    }
    const placesSearchCB = function (
      // 음식점 마커 표시
      result: any,
      status: any,
      Pagination: any
    ) {
      if (status === window.kakao.maps.services.Status.OK) {
        setTest(true);
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
    };
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
    <>
      <div
        id='map'
        style={{ width: '50vw', height: '100vh' }}
        className='z-0 relative'
      >
        {test ? null : <Loading />}
        {test ? (
          <Button
            className='z-10'
            variant='outlined'
            sx={{
              backgroundColor: 'white',
              marginTop: '4px',
              marginLeft: '4px',
              ':hover': {
                backgroundColor: 'white'
              }
            }}
            onClick={() => {
              setMarkerbtn(true);
            }}
          >
            직접 등록하기
          </Button>
        ) : null}
      </div>
    </>
  );
};
export default Kakaomap;
