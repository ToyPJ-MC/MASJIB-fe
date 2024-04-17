import { useEffect, useState } from 'react';
import { LoginAPI, RefreshTokenAPI } from '../apis/server';
import { getCookie } from '../util/Cookie';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [nickname, setNickname] = useState<string>('');
  const navigate = useNavigate();
  const accesstoken = getCookie('access_token');
  const pageWidth = window.innerWidth;
  console.log(pageWidth);
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
  return (
    <div>
      <h1>Profile</h1>
      <div>닉네임</div>
      {nickname === '' ? (
        <div>
          <input
            type='text'
            placeholder='닉네임을 입력해주세요'
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <Button onClick={Nicknamebtn}>확인</Button>
        </div>
      ) : (
        <div>{nickname}</div>
      )}
      <Button onClick={Homebtn}>Home</Button>
    </div>
  );
};
export default Profile;
