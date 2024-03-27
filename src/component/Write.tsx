import {
  FileCard,
  FileUploader,
  MimeType,
  SideSheet,
  FileRejection
} from 'evergreen-ui';
import { useCallback, useMemo, useState } from 'react';
import { writemodalState } from '../state/atom';
import { useRecoilState } from 'recoil';
import { Button, IconButton, Rating, TextareaAutosize } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const Write = () => {
  const [open, setOpen] = useRecoilState<boolean>(writemodalState);
  const acceptedMimeTypes = [MimeType.jpeg, MimeType.png];
  const maxFiles = 3;
  const maxSizeInBytes = 10000000; // 10MB;
  const [files, setFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const [review, setReview] = useState<string>('');
  const values = useMemo(
    () => [
      ...files,
      ...fileRejections.map((fileRejection: any) => fileRejection.file)
    ],
    [files, fileRejections]
  );
  const handleRemove = useCallback(
    (file: File) => {
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => prevFile !== file)
      );
      setFileRejections((prevFileRejections) =>
        prevFileRejections.filter(
          (prevFileRejection) => prevFileRejection.file !== file
        )
      );
    },
    [files, fileRejections]
  );
  const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
  const fileCountError = '최대 3개 사진만 올릴 수 있습니다!';
  const reviewhandleSumbit = () => {
    console.log(JSON.stringify(review)); // 리뷰 글 형식 그대로 전달
    console.log(files); // 파일 형식 그대로 전달
  };
  return (
    <SideSheet
      isShown={open}
      onCloseComplete={() => {
        setOpen(false);
      }}
    >
      <div className='grid place-items-center mt-4'>
        <div className='text-lg font-semibold'>음식이 어땠나요?</div>
        <Rating
          name='half-rating'
          defaultValue={0.0}
          precision={0.5}
          size='large'
        />
        <div className='grid grid-rows-3 place-items-center mt-4'>
          <div className='grid place-items-center'>
            <div className='font-semibold text-base'>맛은 어땠나요?</div>
            <div className='grid grid-cols-2 place-items-center'>
              <div>
                <IconButton color='primary'>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <IconButton sx={{ color: '#FF4500' }}>
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className='grid place-items-center'>
            <div className='font-semibold text-base'>위생이 깨끗했나요?</div>
            <div className='grid grid-cols-2 place-items-center'>
              <div>
                <IconButton color='primary'>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <IconButton sx={{ color: '#FF4500' }}>
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className='grid place-items-center'>
            <div className='font-semibold text-base'>
              친절한 음직점이였나요?
            </div>
            <div className='grid grid-cols-2 place-items-center'>
              <div>
                <IconButton color='primary'>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <IconButton sx={{ color: '#FF4500' }}>
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <FileUploader
          acceptedMimeTypes={acceptedMimeTypes}
          label='업로드 이미지'
          description='최대 3개까지 업로드 가능합니다. 최대 10MB까지 업로드 가능합니다.'
          disabled={files.length + fileRejections.length >= maxFiles}
          maxSizeInBytes={maxSizeInBytes}
          maxFiles={maxFiles}
          onAccepted={(newFiles) =>
            setFiles((prevFiles) => [...prevFiles, ...newFiles])
          }
          onRejected={(newFileRejections) =>
            setFileRejections((prevFileRejections) => [
              ...prevFileRejections,
              ...newFileRejections
            ])
          }
          renderFile={(file, index) => {
            const { name, size, type } = file;
            const renderFileCounterError =
              index === 0 && fileCountOverLimit > 0;
            const fileRejection = fileRejections.find(
              (fileRejection: any) => fileRejection.file === file
            );
            const uniqueKey = `${file.name}_${index}`;
            return (
              <>
                {renderFileCounterError && (
                  <div className='grid place-items-center font-semibold text-red-500'>
                    {fileCountError}
                  </div>
                )}
                <FileCard
                  key={uniqueKey}
                  name={name}
                  sizeInBytes={size}
                  type={type}
                  onRemove={() => handleRemove(file)}
                  validationMessage={fileRejection?.message}
                />
              </>
            );
          }}
          values={values}
          className='mt-6'
        />
        <div className='grid place-items-center mt-2'>
          <div className='text-base font-semibold'>음식점 리뷰</div>
          <TextareaAutosize
            name='review'
            placeholder='  리뷰를 작성해주세요.'
            maxLength={250}
            minRows={5}
            maxRows={10}
            className='w-96 h-fit outline outline-blue-500 rounded-lg mt-2'
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
        <Button
          variant='contained'
          sx={{ marginTop: '10px' }}
          size='large'
          onClick={reviewhandleSumbit}
        >
          리뷰 쓰기
        </Button>
      </div>
    </SideSheet>
  );
};
export default Write;
