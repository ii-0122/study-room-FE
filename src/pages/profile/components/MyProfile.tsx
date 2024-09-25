import { IoPersonCircle } from 'react-icons/io5';
import * as S from '../ProfilePage.style';
import { FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

export default function MyProfile() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({ mode: 'onSubmit' });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitProfile = () => {};

  return (
    <S.Container>
      <S.Title>내 프로필</S.Title>
      <S.InputField>
        <S.Label htmlFor="image">이미지</S.Label>
        <S.ProfilePreviewWrapper>
          <S.ProfileImageWrapper>
            {preview ? (
              <S.ProfileImage src={preview} />
            ) : (
              <IoPersonCircle size={100} color="gray" />
            )}
            <S.Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <S.CameraIconButton htmlFor="image">
              <FaCamera />
            </S.CameraIconButton>
          </S.ProfileImageWrapper>
          <S.DeleteImageButton onClick={() => setPreview(null)}>
            이미지 삭제
          </S.DeleteImageButton>
        </S.ProfilePreviewWrapper>
      </S.InputField>
      <S.ProfileForm onSubmit={handleSubmitProfile(onSubmitProfile)}>
        <S.InputField>
          <S.Label htmlFor="nickname">닉네임</S.Label>
          <S.Input
            id="nickname"
            {...registerProfile('nickname', {
              required: '닉네임을 입력해 주세요.',
            })}
            defaultValue="닉네임"
          />
          {profileErrors.nickname &&
            typeof profileErrors.nickname.message === 'string' && (
              <span>{profileErrors.nickname.message}</span>
            )}
        </S.InputField>
        <S.InputField>
          <S.Label htmlFor="introduction">한 줄 소개</S.Label>
          <S.Input
            id="introduction"
            {...registerProfile('introduction')}
            placeholder="나를 한 줄로 표현해 주세요!"
          />
        </S.InputField>
        <S.SettingButton type="submit">수정</S.SettingButton>
      </S.ProfileForm>
    </S.Container>
  );
}
