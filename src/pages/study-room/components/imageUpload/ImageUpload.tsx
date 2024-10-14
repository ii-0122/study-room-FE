import {
  ChangeEvent,
  MouseEvent,
  useState,
  forwardRef,
  KeyboardEvent,
} from 'react';
import * as S from '@/pages/study-room/components/imageUpload/ImageUpload.style';
import { LuUpload } from 'react-icons/lu';
import { UseFormSetValue } from 'react-hook-form';
import type { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import { uploadImage, updateImage } from '@/apis/image.api';

interface ImageUploadButtonProps {
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  setValue: UseFormSetValue<CreateStudyRoomFormData>;
  imageUrl?: string;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadButtonProps>(
  ({ onKeyDown, setValue, imageUrl }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(imageUrl || null);

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (ref && 'current' in ref) {
        ref.current?.click();
      }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setFileName(file.name);

        try {
          let updatedImageUrl;
          if (preview) {
            updatedImageUrl = await updateImage(file, preview);
          } else {
            updatedImageUrl = await uploadImage(file);
          }
          setPreview(updatedImageUrl);
          setValue('imageUrl', updatedImageUrl);
        } catch (error) {
          console.error('이미지 업로드 실패', error);
        }
      } else {
        setValue('imageUrl', '');
        setPreview(null);
      }
    };

    return (
      <>
        <S.ImageInput
          type="file"
          accept="image/*"
          ref={ref}
          onChange={handleFileChange}
        />
        <S.UploadWrapper>
          <S.UploadButton onClick={handleButtonClick} onKeyDown={onKeyDown}>
            <LuUpload /> 사진 업로드
          </S.UploadButton>
          {fileName && <S.FileName>{fileName}</S.FileName>}
        </S.UploadWrapper>
      </>
    );
  }
);

export default ImageUpload;
