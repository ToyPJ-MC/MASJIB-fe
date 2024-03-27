import { useState } from 'react';
import { LoginAPI } from '../apis/server';
import { getCookie } from '../util/Cookie';
import { Button } from '@mui/material';

const Profile = () => {
  const [nickname, setNickname] = useState<string>('');
  const accesstoken = getCookie('access_token');
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
    </div>
  );
};
export default Profile;
