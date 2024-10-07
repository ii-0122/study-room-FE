import Button from '@/components/button/Button';
import React from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>비밀번호 입력</h2>
      <input type="password" onChange={onChange} />
      <Button type="submit">입장하기</Button>
    </form>
  );
};

export default PasswordInput;
