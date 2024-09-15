import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import {
  Container,
  ErrorMessage,
  Form,
  InputContainer,
  LinkContainer,
  StyledLink,
  Span,
  Title,
} from '@/styles/AuthFormStyles';

interface LoginFormInputs {
  userId: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = () => {
    navigate('/');
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input
            hasError={!!errors.userId}
            placeholder="아이디"
            {...register('userId', {
              required: '아이디를 입력해주세요.',
            })}
          />
          {errors.userId && (
            <ErrorMessage>{errors.userId.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Input
            hasError={!!errors.password}
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <Button type="submit" size="large">
          로그인
        </Button>
      </Form>
      <LinkContainer>
        <Span>아직 회원이 아니신가요?</Span>
        <StyledLink to={'/register'}>회원가입</StyledLink>
      </LinkContainer>
    </Container>
  );
}
