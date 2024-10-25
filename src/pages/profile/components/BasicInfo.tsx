import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import * as S from '../ProfilePage.style';
import { changePassword, verifyCurrentPassword } from '@/apis/auth.api';

interface CurrentPasswordFormData {
  currentPassword: string;
}

interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordChange() {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register: registerCurrentPassword,
    handleSubmit: handleSubmitCurrentPassword,
    formState: { errors: currentPasswordErrors },
  } = useForm<CurrentPasswordFormData>({ mode: 'onChange' });

  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    formState: { errors: newPasswordErrors },
    control,
  } = useForm<NewPasswordFormData>({ mode: 'onChange' });

  const onSubmitCurrentPassword = async (data: { currentPassword: string }) => {
    const response = await verifyCurrentPassword(data.currentPassword);
    if (response.isPasswordCorrect) {
      toast.success('비밀번호가 확인되었습니다!');

      setIsPasswordVerified(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('현재 비밀번호가 일치하지 않습니다.');
    }
  };

  const onSubmitNewPassword = async (data: { newPassword: string }) => {
    try {
      await changePassword(data.newPassword);
      toast.success('비밀번호가 변경되었습니다!');
    } catch (error) {
      setErrorMessage('비밀번호 변경 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const newPassword = useWatch({ control, name: 'newPassword' });

  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.ProfileForm
        onSubmit={handleSubmitCurrentPassword(onSubmitCurrentPassword)}
      >
        <S.InputField>
          <S.Label htmlFor="currentPassword">현재 비밀번호</S.Label>
          <S.InputWrapper>
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
              <S.ErrorMessage>
                {currentPasswordErrors.currentPassword.message}
              </S.ErrorMessage>
            )}
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
          </S.InputWrapper>
          <S.SettingButton type="submit">확인</S.SettingButton>
        </S.InputField>
      </S.ProfileForm>

      {isPasswordVerified && (
        <S.ProfileForm onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}>
          <S.InputField>
            <S.Label htmlFor="newPassword">새 비밀번호</S.Label>
            <S.InputWrapper>
              <S.Input
                id="newPassword"
                type="password"
                placeholder="새 비밀번호를 입력해 주세요."
                {...registerNewPassword('newPassword', {
                  required: '새 비밀번호를 입력해 주세요.',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-]).{6,16}$/,
                    message:
                      '비밀번호는 영어, 숫자, 특수문자를 포함한 6~16글자여야 합니다.',
                  },
                })}
              />
              {typeof newPasswordErrors.newPassword?.message === 'string' && (
                <S.ErrorMessage>
                  {newPasswordErrors.newPassword.message}
                </S.ErrorMessage>
              )}
            </S.InputWrapper>
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor="confirmPassword">새 비밀번호 확인</S.Label>
            <S.InputWrapper>
              <S.Input
                id="confirmPassword"
                type="password"
                placeholder="새 비밀번호를 다시 입력해 주세요."
                {...registerNewPassword('confirmPassword', {
                  required: '새 비밀번호 확인을 입력해 주세요.',
                  validate: (value) =>
                    value === newPassword || '새 비밀번호가 일치하지 않습니다.',
                })}
              />
              {typeof newPasswordErrors.confirmPassword?.message ===
                'string' && (
                <S.ErrorMessage>
                  {newPasswordErrors.confirmPassword.message}
                </S.ErrorMessage>
              )}
            </S.InputWrapper>
          </S.InputField>
          <S.SettingButton type="submit">비밀번호 변경</S.SettingButton>
        </S.ProfileForm>
      )}
    </S.Container>
  );
}
