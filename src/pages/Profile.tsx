import { useEffect, useState } from 'react';
import { NicknameAPI, NicknameChangeAPI } from '../apis/server';
import { getCookie, removeCookie } from '../util/Cookie';
import { Button, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useRecoilState } from 'recoil';
import { nicknameStatus } from '../state/atom';

const Profile = () => {
  const [nickname, setNickname] = useState<string>('');
  const [nicknamestatus, setNicknameStatus] =
    useRecoilState<number>(nicknameStatus);
  const [nicknamemodal, setNicknamemodal] = useState<boolean>(false);
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
  useEffect(() => {
    NicknameAPI(setNickname);
  }, []);
  const Nicknamebtn = () => {
    NicknameChangeAPI(nickname, setNicknameStatus);
  };
  const nicknamechangebtn = () => {
    setNicknamemodal(true);
  };
  useEffect(() => {
    if (accesstoken === undefined) {
      toast.error('로그인이 필요합니다!');
      if (pageWidth < 450) {
        navigate('/m_information');
      } else {
        navigate('/information');
      }
    } else if (getCookie('loginstatus') === 'success') {
      toast.success('로그인 성공!');
      removeCookie('loginstatus');
    }
  }, []);
  useEffect(() => {
    if (getCookie('nickname') === undefined && accesstoken !== undefined) {
      toast('닉네임을 정해주세요!', {
        icon: '👋'
      });
    }
  }, []);
  useEffect(() => {
    if (nicknamestatus === 200) {
      toast.success('닉네임 변경을 완료하였습니다');
      setNicknameStatus(0);
      setNicknamemodal(false);
    } else if (nicknamestatus === 400) {
      toast.error('닉네임 중복입니다');
      setNicknameStatus(0);
      setNicknamemodal(true);
    }
  }, [nicknamestatus]);

  return (
    <div className='grid place-items-center'>
      <div className='mt-4 font-bold text-2xl'>
        {nickname} 가장 좋아하는 음식 카테고리
      </div>
      <div>음식 카테고리 이미지나 애니메이션 예정</div>
      {getCookie('nickname') === undefined ? (
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
      <div className='flex flex-row mt-2 place-items-center'>
        {!nicknamemodal ? <div>{nickname}</div> : null}
        <div>
          {!nicknamemodal ? (
            <IconButton onClick={nicknamechangebtn} size='small'>
              <CreateIcon />
            </IconButton>
          ) : null}
        </div>
      </div>
      {nicknamemodal ? (
        <div>
          <TextField
            id='nickname'
            defaultValue={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            size='small'
          />
          <IconButton onClick={Nicknamebtn} size='small'>
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setNicknamemodal(false);
            }}
            size='small'
          >
            <ClearIcon />
          </IconButton>
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
