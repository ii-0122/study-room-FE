import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import {
  Container,
  ErrorMessage,
  Form,
  InputContainer,
  Label,
  LinkContainer,
  StyledLink,
  Span,
  Title,
} from '@/styles/AuthFormStyles';

interface RegisterFormInputs {
  userId: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>아이디</Label>
          <Input
            hasError={!!errors.userId}
            placeholder="아이디"
            {...register('userId', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9]{6,16}$/,
                message: '아이디는 영어와 숫자로 구성된 6~16글자여야 합니다.',
              },
            })}
          />
          {errors.userId && (
            <ErrorMessage>{errors.userId.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>닉네임</Label>
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
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>비밀번호</Label>
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
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>비밀번호 확인</Label>
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
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </InputContainer>
        <Button type="submit" size="large">
          회원가입
        </Button>
      </Form>
      <LinkContainer>
        <Span>이미 회원이신가요?</Span>
        <StyledLink to={'/login'}>로그인</StyledLink>
      </LinkContainer>
    </Container>
  );
}
