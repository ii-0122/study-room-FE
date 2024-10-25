import Button from '@/components/button/Button';
import React from 'react';
import * as S from './PasswordInput.style';

interface PasswordInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.PassWordInputStyle>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>비밀번호 입력</S.Title>
        <S.Wrap>
          <S.Input type="password" onChange={onChange} />
          <Button type="submit" size="large">
            입장하기
          </Button>
        </S.Wrap>
      </S.Form>
    </S.PassWordInputStyle>
  );
};

export default PasswordInput;
