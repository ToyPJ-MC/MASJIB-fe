import { Button, IconButton } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import Loading from './Loading';
import SearchModal from './SearchModal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  RadiusMarkerAPIStatus,
  RadiusMarkerDataState,
  RadiusSortState,
  SortingRestaurantDataState,
  modalState,
  searchResultState,
  searchState
} from '../state/atom';
import { RadiusMarkerType, SearchType, SortingRestaurantType } from '../types';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import {
  AddressAPI,
  RadiusMakerAPI,
  SortingRestaurantAPI
} from '../apis/server';
import '../styles/global.css';
declare global {
  interface Window {
    kakao: any;
  }
}

const Kakaomap = () => {
  const imageURL = process.env.SERVER_URL + '/';
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locPosition, setLocPosition] = useState(
    new window.kakao.maps.LatLng(lat, lon)
  );
  const [address, setAddress] = useState<string>(''); // 현재 위치 주소
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [search, setSearch] = useRecoilState<string>(searchState);
  const [searchResult, setSearchResult] =
    useRecoilState<SearchType>(searchResultState);
  const [loading, setLoading] = useState<boolean>(false);
  const sort = useRecoilValue<string>(RadiusSortState);
  let imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  let imageSize = new window.kakao.maps.Size(24, 35);
  let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
  const [currentlocation, setCurrentlocation] = useState<boolean>(false);
  const [radiusMarker, setRadiusMarker] = useRecoilState<RadiusMarkerType>(
    RadiusMarkerDataState
  ); // 반경 내 음식점 마커
  const [markerAPIStatus, setMarkerAPIStatus] = useRecoilState<boolean>(
    RadiusMarkerAPIStatus
  ); // 반경 내 음식점 마커 API 상태
  const SetSortRestaurant = useSetRecoilState<SortingRestaurantType>(
    SortingRestaurantDataState
  );
  const currentbutton = () => {
    setRadiusMarker([]);
    SetSortRestaurant([]);
    setCurrentlocation(true);
  };

  useEffect(() => {
    // 현재위치 받아오기
    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          //console.log(position);
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          setLat(lat);
          setLon(lon);
          setLocPosition(new window.kakao.maps.LatLng(lat, lon));
        });
        if (lat === -1 || lon === -1 || lat === 0 || lon === 0) {
          fetchUserLocation(); // 37.5012350392984 127.026630556235
        }
      }
    };
    fetchUserLocation();
  }, [currentlocation]);

  useEffect(() => {
    if ((lat !== -1 && lon !== -1) || (lat !== 0 && lon !== 0)) {
      AddressAPI(lon, lat, setAddress);
    }
  }, [lon, lat]);

  useEffect(() => {
    if (
      lat !== 0 &&
      lon !== 0 &&
      lat !== -1 &&
      lon !== -1 &&
      address !== '' &&
      (sort || currentlocation || address)
    ) {
      setRadiusMarker([]);
      SetSortRestaurant([]);
      RadiusMakerAPI(address, lon, lat, setRadiusMarker, setMarkerAPIStatus);
      SortingRestaurantAPI(address, lon, lat, sort, 1, SetSortRestaurant);
    }
  }, [sort, currentlocation, address]);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      // 현재 위치 마커 및 음식점 위치 마커 표시
      let container = document.getElementById('map');
      let options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 4
      };
      let map = new window.kakao.maps.Map(container, options);
      let place = new window.kakao.maps.services.Places();
      if (search === 'Restaurant' && radiusMarker.length !== 0) {
        // 반경 내 음식점 마커 표시
        setLoading(true);
        radiusMarker.map((item, index) => {
          let content =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            `            ${item.name}` +
            '        </div>' +
            '        <div class="body">' +
            '            <div>' +
            `               ${item.kind} ${item.totalRating}` +
            '            </div>' +
            '            <div>' +
            `               ${item.address}` +
            '            </div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            `            <img src='${imageURL}${item.image}'>` +
            '           </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(item.y, item.x)
          });
          let infowindow = new window.kakao.maps.InfoWindow({
            content: content
          });
          window.kakao.maps.event.addListener(marker, 'click', function () {
            window.open(
              `/review?restaurantname=${item.name}&address=${item.address}&x=${item.x}&y=${item.y}`,
              '_blank'
            );
          });
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });
        });
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
                new window.kakao.maps.LatLng(result[i].x, result[i].y)
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
            position: new window.kakao.maps.LatLng(place.x, place.y)
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
      let zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      if (currentlocation) {
        map.setCenter(new window.kakao.maps.LatLng(lat, lon));
        setCurrentlocation(false);
        setSearchResult([]);
        setSearch('Restaurant');
        marker.setMap(map);
      }
    }
  }, [lat, lon, search, modal, currentlocation, radiusMarker]);
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
              onClick={currentbutton}
            >
              <GpsFixedIcon />
            </IconButton>
          </>
        ) : null}
        {modal ? <SearchModal /> : null}
      </div>
    </>
  );
};
export default Kakaomap;
