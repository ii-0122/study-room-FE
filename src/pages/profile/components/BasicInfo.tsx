import { useForm } from 'react-hook-form';
import * as S from '../ProfilePage.style';
import { useState } from 'react';

interface CurrentPasswordFormData {
  currentPassword: string;
}

interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordChange() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const {
    register: registerCurrentPassword,
    handleSubmit: handleSubmitCurrentPassword,
    formState: { errors: currentPasswordErrors },
  } = useForm<CurrentPasswordFormData>();

  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    formState: { errors: newPasswordErrors },
  } = useForm<NewPasswordFormData>();

  const onSubmitCurrentPassword = (data: { currentPassword: string }) => {
    const correctPassword = '123456'; // @TODO 실제 비밀번호 확인 로직으로 수정
    if (data.currentPassword === correctPassword) {
      setIsPasswordVerified(true);
    } else {
      console.log('현재 비밀번호가 일치하지 않습니다.');
    }
  };

  const onSubmitNewPassword = (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (data.newPassword !== data.confirmPassword) {
      console.log('새 비밀번호가 일치하지 않습니다.');
    } else {
      console.log('비밀번호가 성공적으로 변경되었습니다:', data.newPassword);
    }
  };

  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.ProfileForm
        onSubmit={handleSubmitCurrentPassword(onSubmitCurrentPassword)}
      >
        <S.InputField>
          <S.Label htmlFor="currentPassword">현재 비밀번호</S.Label>
          <S.Input
            id="currentPassword"
            type="password"
            {...registerCurrentPassword('currentPassword', {
              required: '현재 비밀번호를 입력해 주세요.',
            })}
            placeholder="현재 비밀번호를 입력해 주세요."
          />
          {typeof currentPasswordErrors.currentPassword?.message ===
            'string' && (
            <span>{currentPasswordErrors.currentPassword.message}</span>
          )}
          <S.SettingButton type="submit">확인</S.SettingButton>
        </S.InputField>
      </S.ProfileForm>

      {isPasswordVerified && (
        <S.ProfileForm onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}>
          <S.InputField>
            <S.Label htmlFor="newPassword">새 비밀번호</S.Label>
            <S.Input
              id="newPassword"
              type="password"
              {...registerNewPassword('newPassword', {
                required: '새 비밀번호를 입력해 주세요.',
              })}
              placeholder="새 비밀번호를 입력해 주세요."
            />
            {typeof newPasswordErrors.newPassword?.message === 'string' && (
              <span>{newPasswordErrors.newPassword.message}</span>
            )}
          </S.InputField>

          <S.InputField>
            <S.Label htmlFor="confirmPassword">새 비밀번호 확인</S.Label>
            <S.Input
              id="confirmPassword"
              type="password"
              {...registerNewPassword('confirmPassword', {
                required: '비밀번호 확인을 입력해 주세요.',
              })}
              placeholder="새 비밀번호를 다시 입력해 주세요."
            />
            {typeof newPasswordErrors.confirmPassword?.message === 'string' && (
              <span>{newPasswordErrors.confirmPassword.message}</span>
            )}
          </S.InputField>
          <S.SettingButton type="submit">비밀번호 변경</S.SettingButton>
        </S.ProfileForm>
      )}
    </S.Container>
  );
}
