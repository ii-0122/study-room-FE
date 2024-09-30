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

interface ImageUploadButtonProps {
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  setValue: UseFormSetValue<CreateStudyRoomFormData>;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadButtonProps>(
  ({ onKeyDown, setValue }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (ref && 'current' in ref) {
        ref.current?.click();
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setFileName(file.name);

        const imageUrl = URL.createObjectURL(file);
        setValue('imageUrl', imageUrl);
      } else {
        setValue('imageUrl', '');
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
