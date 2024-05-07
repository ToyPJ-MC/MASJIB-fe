import { Button, IconButton } from '@mui/material';
import React from 'react';
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
import { toast } from 'react-hot-toast';
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
  const [currentlocation, setCurrentlocation] = useState<boolean>(true);
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
    setCurrentlocation(true);
  };

  useEffect(() => {
    // 현재위치 받아오기
    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        // 위치 정보를 성공적으로 가져온 경우의 콜백 함수
        const successCallback = (position: any) => {
          //console.log('유저 현재 위치:', position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLat(lat);
          setLon(lon);
          setLocPosition(new window.kakao.maps.LatLng(lat, lon));
          setLoading(true);
          toast.success('현재 위치를 가져왔습니다.');
        };
        const errorCallback = (error: any) => {
          // 위치 정보를 가져오는 도중 에러가 발생한 경우의 콜백 함수
          toast.error('위치 정보를 가져오는데 실패했습니다.');
        };
        const options = {
          enableHighAccuracy: true, // 가능한 정확한 위치를 요청하는 옵션
          maximumAge: 0 // 최신 위치 정보를 요청하는 옵션
        };
        // 사용자의 위치를 실시간으로 추적하는 watchPosition() 메소드
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
          options
        );
      }
    };
    if (currentlocation) {
      fetchUserLocation();
    }
  }, [currentlocation]);

  // useEffect(() => {
  //   if ((lat !== -1 && lon !== -1) || (lat !== 0 && lon !== 0)) {
  //     AddressAPI(lon, lat, setAddress);
  //   }
  // }, [currentlocation, lat, lon]);

  // 반경 1km 음식점 마커 표시
  useEffect(() => {
    if (
      lat !== 0 &&
      lon !== 0 &&
      lat !== -1 &&
      lon !== -1 &&
      (sort || currentlocation)
    ) {
      setRadiusMarker([]);
      SetSortRestaurant([]);
      RadiusMakerAPI(lon, lat, setRadiusMarker, setMarkerAPIStatus);
      SortingRestaurantAPI(lon, lat, sort, 1, SetSortRestaurant);
    }
  }, [sort, currentlocation]);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      let container = document.getElementById('map');
      let options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 4
      };
      let map = new window.kakao.maps.Map(container, options);
      let marker = new window.kakao.maps.Marker({
        // 현재 위치 마커
        map: map,
        position: locPosition,
        image: markerImage
      });
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
      marker.setMap(map);
      let zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      map.setCenter(new window.kakao.maps.LatLng(lat, lon));
      if (currentlocation) {
        map.setCenter(new window.kakao.maps.LatLng(lat, lon));
        setCurrentlocation(false);
      }
    }
  }, [lat, lon, currentlocation, radiusMarker]);

  // useEffect(() => {
  //   if (lat !== 0 && lon !== 0) {
  //     // 현재 위치 마커 및 음식점 위치 마커 표시
  //     let container = document.getElementById('map');
  //     let options = {
  //       center: new window.kakao.maps.LatLng(lat, lon),
  //       level: 4
  //     };
  //     let map = new window.kakao.maps.Map(container, options);
  //     let place = new window.kakao.maps.services.Places();

  //     // if (search !== 'Restaurant') {
  //     //   place.keywordSearch(search, modalSearchCB);
  //     //   function modalSearchCB(
  //     //     // 음식점 검색 마커 표시
  //     //     result: any,
  //     //     status: any,
  //     //     Pagination: any
  //     //   ) {
  //     //     if (status === window.kakao.maps.services.Status.OK) {
  //     //       setLoading(true);
  //     //       result.map((item: any) => {
  //     //         if (item.category_group_code !== 'FD6') return;
  //     //         setSearchResult((prev) => [
  //     //           ...prev,
  //     //           {
  //     //             phone: item.phone,
  //     //             place_name: item.place_name,
  //     //             road_address_name: item.road_address_name
  //     //           }
  //     //         ]);
  //     //       });
  //     //       let bounds = new window.kakao.maps.LatLngBounds();
  //     //       for (let i = 0; i < result.length; i++) {
  //     //         if (result[i].category_group_code !== 'FD6') continue;
  //     //         displayMarker(result[i]);
  //     //         bounds.extend(
  //     //           new window.kakao.maps.LatLng(result[i].y, result[i].x)
  //     //         );
  //     //       }
  //     //       map.setBounds(bounds);
  //     //     }
  //     //     if (Pagination.hasNextPage) {
  //     //       Pagination.nextPage(); // 다음 페이지로 요청
  //     //     }
  //     //   }
  //     //   function displayMarker(place: any) {
  //     //     let marker = new window.kakao.maps.Marker({
  //     //       map: map,
  //     //       position: new window.kakao.maps.LatLng(place.y, place.x)
  //     //     });
  //     //     let infowindow = new window.kakao.maps.InfoWindow({
  //     //       content: place.place_name + '<br>' + place.road_address_name
  //     //     });
  //     //     window.kakao.maps.event.addListener(marker, 'click', function () {
  //     //       window.open(
  //     //         `/review?restaurantname=${place.place_name}&address=${place.road_address_name}&x=${place.x}&y=${place.y}`,
  //     //         '_blank'
  //     //       );
  //     //     });
  //     //     window.kakao.maps.event.addListener(marker, 'mouseover', function () {
  //     //       infowindow.open(map, marker);
  //     //     });
  //     //     window.kakao.maps.event.addListener(marker, 'mouseout', function () {
  //     //       infowindow.close();
  //     //     });
  //     //   }
  //     // }
  //     let marker = new window.kakao.maps.Marker({
  //       // 현재 위치 마커
  //       map: map,
  //       position: locPosition,
  //       image: markerImage
  //     });
  //     marker.setMap(map);
  //     let zoomControl = new window.kakao.maps.ZoomControl();
  //     map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  //     if (currentlocation) {
  //       map.setCenter(new window.kakao.maps.LatLng(lat, lon));
  //       setCurrentlocation(false);
  //       setSearch('Restaurant');
  //     }
  //   }
  // }, [search, radiusMarker]);
  return (
    <>
      <div
        id='map'
        style={{ width: '100w', height: '100vh' }}
        className='z-0 relative'
      >
        {loading ? (
          <IconButton
            color='primary'
            className='z-10 top-2 left-2 absolute'
            sx={{
              backgroundColor: 'white',
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
        ) : (
          <Loading />
        )}
        {/* {loading && !modal ? (
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
          </>
        ) : null} */}
        {modal ? <SearchModal /> : null}
      </div>
    </>
  );
};
export default Kakaomap;
