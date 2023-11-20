import { Button, IconButton } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import Loading from './Loading';
import SearchModal from './SearchModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, searchResultState, searchState } from '../state/atom';
import { SearchType } from '../types';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

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
  const [searchResult, setSearchResult] =
    useRecoilState<SearchType>(searchResultState);
  const [loading, setLoading] = useState<boolean>(false);
  let imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  let imageSize = new window.kakao.maps.Size(24, 35);
  let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
  const [currentlocation, setCurrentlocation] = useState<boolean>(false);
  const currentbutton = () => {
    setCurrentlocation(true);
  };

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
  }, [currentlocation]);
  useLayoutEffect(() => {
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
              displayMarker(result[i]);
            }
            if (Pagination.hasNextPage) {
              Pagination.nextPage(); // 다음 페이지로 요청
            }
            function displayMarker(place: any) {
              let marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(place.y, place.x)
              });
              let infowindow = new window.kakao.maps.InfoWindow({
                content: place.place_name
              });
              window.kakao.maps.event.addListener(marker, 'click', function () {
                window.open(
                  `/review?restaurantname=${place.place_name}&address=${place.road_address_name}&x=${place.x}&y=${place.y}`,
                  '_blank'
                );
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
            result.map((item: any) => {
              if (item.category_group_code !== 'FD6') return;
              setSearchResult((prev) => [
                ...prev,
                {
                  phone: item.phone,
                  place_name: item.place_name,
                  road_address_name: item.road_address_name
                }
              ]);
            });
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
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x)
          });
          let infowindow = new window.kakao.maps.InfoWindow({
            content: place.place_name
          });
          window.kakao.maps.event.addListener(marker, 'click', function () {
            window.open(
              `/review?restaurantname=${place.place_name}&address=${place.road_address_name}&x=${place.x}&y=${place.y}`,
              '_blank'
            );
          });
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
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
      if (currentlocation) {
        map.setCenter(locPosition);
        setCurrentlocation(false);
        setSearchResult([]);
        setSearch('Restaurant');
      }
    }
  }, [lat, lon, search, modal, currentlocation]);

  return (
    <>
      <div
        id='map'
        style={{ width: '50vw', height: '100vh' }}
        className='z-0 relative'
      >
        {loading ? null : <Loading />}
        {loading && !modal ? (
          <>
            {' '}
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
            <IconButton
              color='primary'
              className='z-10'
              sx={{
                backgroundColor: 'white',
                marginTop: '4px',
                marginLeft: '4px',
                ':hover': {
                  backgroundColor: 'white',
                  outlineColor: '#3B82F6'
                },
                outlineColor: '#3B82F6'
              }}
            >
              <GpsFixedIcon onClick={currentbutton} />
            </IconButton>
          </>
        ) : null}
        {modal ? <SearchModal /> : null}
      </div>
    </>
  );
};
export default Kakaomap;
