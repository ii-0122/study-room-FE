import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/apis/auth.api';
import type { SignUpFormInputs } from '@/types/auth';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import * as S from '@/styles/AuthFormStyles';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      await signUp(data);
      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputContainer>
          <S.Label>아이디</S.Label>
          <Input
            hasError={!!errors.id}
            placeholder="아이디"
            {...register('id', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[a-z0-9]{6,16}$/,
                message: '아이디는 영어와 숫자로 구성된 6~16글자여야 합니다.',
              },
            })}
          />
          {errors.id && <S.ErrorMessage>{errors.id.message}</S.ErrorMessage>}
        </S.InputContainer>
        <S.InputContainer>
          <S.Label>닉네임</S.Label>
          <Input
            hasError={!!errors.nickname}
            placeholder="닉네임"
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z가-힣0-9]{2,8}$/,
                message:
                  '닉네임은 영어, 한글, 숫자로 구성된 2~8글자여야 합니다.',
              },
            })}
          />
          {errors.nickname && (
            <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>
          )}
        </S.InputContainer>
        <S.InputContainer>
          <S.Label>비밀번호</S.Label>
          <Input
            hasError={!!errors.password}
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-]).{6,16}$/,
                message:
                  '비밀번호는 영어, 숫자, 특수문자를 포함한 6~16글자여야 합니다.',
              },
            })}
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}
        </S.InputContainer>
        <S.InputContainer>
          <S.Label>비밀번호 확인</S.Label>
          <Input
            hasError={!!errors.confirmPassword}
            type="password"
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
          )}
        </S.InputContainer>
        <Button type="submit" size="large">
          회원가입
        </Button>
      </S.Form>
      <S.LinkContainer>
        <S.Span>이미 회원이신가요?</S.Span>
        <S.StyledLink to={'/login'}>로그인</S.StyledLink>
      </S.LinkContainer>
    </S.Container>
  );
}
