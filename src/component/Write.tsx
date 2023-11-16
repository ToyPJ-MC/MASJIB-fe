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
import { Rating } from '@mui/material';

const Write = () => {
  const [open, setOpen] = useRecoilState<boolean>(writemodalState);
  const acceptedMimeTypes = [MimeType.jpeg, MimeType.png];
  const maxFiles = 3;
  const maxSizeInBytes = 10000000; // 10MB;
  const [files, setFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
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
  return (
    <SideSheet
      isShown={open}
      onCloseComplete={() => {
        setOpen(false);
      }}
    >
      <div className='grid place-items-center mt-4'>
        <div>리뷰 작성</div>
        <div className='text-base font-semibold'>음식이 어땠나요?</div>
        <Rating name='half-rating' defaultValue={2.5} precision={0.5} />
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
            const message = fileRejection || renderFileCounterError;
            return (
              <FileCard
                key={index}
                name={name}
                sizeInBytes={size}
                type={type}
                onRemove={() => handleRemove(file)}
                validationMessage={fileRejection?.message}
              />
            );
          }}
          values={values}
        />
      </div>
    </SideSheet>
  );
};
export default Write;
