import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: auto;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 480px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.color.btnWarn};
  font-size: 12px;
  margin-top: 10px;
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.color.lineGray};
  text-decoration: none;
  margin-top: 20px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.mainStrong};
  font-weight: 600;
  text-decoration: none;
`;

export const Span = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.bgDarkGray};
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.bgDarkGray};
`;
