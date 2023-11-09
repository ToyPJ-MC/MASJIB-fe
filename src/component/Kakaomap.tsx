import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import SearchModal from './SearchModal';
import { useRecoilState } from 'recoil';
import { modalState, searchState } from '../state/atom';

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
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [search, setSearch] = useRecoilState<string>(searchState);
  const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      // 현재 위치 마커 및 음식점 위치 마커 표시
      let container = document.getElementById('map');
      let options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 4
      };
      let map = new window.kakao.maps.Map(container, options);
      let ps = new window.kakao.maps.services.Places(map);
      let place = new window.kakao.maps.services.Places();

      if (search === 'Restaurant') {
        const placesSearchCB = function (
          // 음식점 마커 표시
          result: any,
          status: any,
          Pagination: any
        ) {
          if (status === window.kakao.maps.services.Status.OK) {
            setLoading(true);
            for (let i = 0; i < result.length; i++) {
              let marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(result[i].y, result[i].x)
              });
              let infowindow = new window.kakao.maps.InfoWindow({
                content: result[i].place_name
              });
              window.kakao.maps.event.addListener(
                marker,
                'mouseover',
                function () {
                  infowindow.open(map, marker);
                }
              );
              window.kakao.maps.event.addListener(
                marker,
                'mouseout',
                function () {
                  infowindow.close();
                }
              );
            }
            if (Pagination.hasNextPage) {
              Pagination.nextPage(); // 다음 페이지로 요청
            }
          }
        };
        ps.categorySearch('FD6', placesSearchCB, { useMapBounds: true });
      }
      if (search !== 'Restaurant') {
        place.keywordSearch(search, modalSearchCB);
        function modalSearchCB(
          // 음식점 검색 마커 표시
          result: any,
          status: any,
          Pagination: any
        ) {
          if (status === window.kakao.maps.services.Status.OK) {
            setLoading(true);
            let bounds = new window.kakao.maps.LatLngBounds();
            for (let i = 0; i < result.length; i++) {
              if (result[i].category_group_code !== 'FD6') continue;
              displayMarker(result[i]);
              bounds.extend(
                new window.kakao.maps.LatLng(result[i].y, result[i].x)
              );
            }
            map.setBounds(bounds);
          }
          if (Pagination.hasNextPage) {
            Pagination.nextPage(); // 다음 페이지로 요청
          }
        }
        function displayMarker(place: any) {
          let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x)
          });
          window.kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                '</div>'
            );
            infowindow.open(map, marker);
          });
        }
      }
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
  }, [lat, lon, search, modal]);

  return (
    <>
      <div
        id='map'
        style={{ width: '50vw', height: '100vh' }}
        className='z-0 relative'
      >
        {loading ? null : <Loading />}
        {loading && !modal ? (
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
              setModal(true);
            }}
          >
            직접 등록하기
          </Button>
        ) : null}
        {modal ? <SearchModal /> : null}
      </div>
    </>
  );
};
export default Kakaomap;
