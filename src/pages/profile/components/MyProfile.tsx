import { ChangeEvent, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/stores/auth.store';
import { updateProfileFormData } from '@/types/updateProfile';
import { updateProfile } from '@/apis/users.api';
import { IoPersonCircle } from 'react-icons/io5';
import { FaCamera } from 'react-icons/fa';
import * as S from '../ProfilePage.style';
import useDebounce from '@/hooks/useDebounce';
import checkFieldDuplicate from '@/utils/checkFieldDuplicate';

export default function MyProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onChange' });

  const { user } = useAuthStore();

  const [preview, setPreview] = useState<string | null>(user?.imageUrl || null);
  const [nicknameDuplicateError, setNicknameDuplicateError] = useState<
    string | null
  >(null);

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

  const nickname = useWatch({ control, name: 'nickname' });

  useDebounce(
    () => checkFieldDuplicate('nickname', nickname, setNicknameDuplicateError),
    500,
    [nickname]
  );

  const onSubmit = async (data: updateProfileFormData) => {
    await updateProfile({
      nickname: data.nickname,
      introduction: data.introduction,
      imageUrl: preview || '',
    });
    toast.success('프로필 수정 완료!');
  };

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
      <S.ProfileForm onSubmit={handleSubmit(onSubmit)}>
        <S.InputField>
          <S.Label htmlFor="nickname">닉네임</S.Label>
          <S.InputWrapper>
            <S.Input
              id="nickname"
              defaultValue={user?.nickname}
              {...register('nickname', {
                required: '닉네임을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z가-힣0-9]{2,8}$/,
                  message:
                    '닉네임은 영어, 한글, 숫자로 구성된 2~8글자여야 합니다.',
                },
              })}
            />
            {(errors.nickname?.message || nicknameDuplicateError) && (
              <S.ErrorMessage>
                {typeof errors.nickname?.message === 'string'
                  ? errors.nickname?.message
                  : nicknameDuplicateError}
              </S.ErrorMessage>
            )}
          </S.InputWrapper>
        </S.InputField>
        <S.InputField>
          <S.Label htmlFor="introduction">한 줄 소개</S.Label>
          <S.Input
            id="introduction"
            defaultValue={user?.introduction}
            placeholder="나를 한 줄로 표현해 주세요!"
            {...register('introduction')}
          />
        </S.InputField>
        <S.SettingButton type="submit">수정</S.SettingButton>
      </S.ProfileForm>
    </S.Container>
  );
}
