import { useEffect, useState } from 'react';
import { LoginAPI, RefreshTokenAPI } from '../apis/server';
import { getCookie } from '../util/Cookie';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [nickname, setNickname] = useState<string>('');
  const navigate = useNavigate();
  const accesstoken = getCookie('access_token');
  const pageWidth = window.innerWidth;
  const Homebtn = () => {
    if (pageWidth < 450) {
      navigate('/m_information');
    } else {
      navigate('/information');
    }
  };
  const Nicknamebtn = () => {
    LoginAPI(accesstoken as string, nickname);
  };
  useEffect(() => {
    if (accesstoken === undefined) {
      if (pageWidth < 450) {
        navigate('/m_information');
      } else {
        navigate('/information');
      }
    }
  }, []);
  return (
    <div className='grid place-items-center'>
      <div className='mt-4 font-bold text-2xl'>
        {'임시닉네임'}가 가장 좋아하는 음식 카테고리
      </div>
      <div>음식 카테고리 이미지나 애니메이션 예정</div>
      {nickname === '' ? (
        <div className='text-lg mt-2'>
          <TextField
            id='nickname'
            defaultValue='닉네임을 입력해주세요'
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            size='small'
          />
          <Button onClick={Nicknamebtn} variant='contained'>
            변경
          </Button>
        </div>
      ) : null}
      <div className='grid grid-cols-2 gap-2 mt-2'>
        <Button onClick={Homebtn} variant='contained'>
          Home
        </Button>
        <Button variant='contained'>탈퇴하기</Button>
      </div>
      <div className='mt-2'>리뷰 개수, 찜 개수, 가본 음식점 수</div>
    </div>
  );
};
export default Profile;
