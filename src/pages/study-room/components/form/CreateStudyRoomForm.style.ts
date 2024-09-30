import styled from 'styled-components';

export const CreateFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

export const CreateTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin: auto;
`;

export const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;

export const FormLabel = styled.label`
  display: flex;
  gap: 6px;
  align-items: center;
  font-weight: bold;
  min-width: 100px;
  color: #353535;
  margin: 4px;
`;

export const FormInputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;

  padding: 16px 0;
  border-bottom: 1px solid #ddd;

  &:nth-last-of-type(1) {
    border-bottom: none;
    margin-bottom: 20px;
  }
`;

export const FormInput = styled.input`
  border: none;
  min-width: 240px;
  width: 100%;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;

  &::placeholder {
    color: #989898;
  }
`;

export const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrivateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  width: 100%;
`;

export const PasswordInputLabel = styled.span`
  min-width: 60px;
  font-size: 14px;
  color: #353535;
  font-weight: 500;
`;

export const PasswordInput = styled(FormInput)`
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.color.btnWarn};
  font-size: 12px;
  margin-top: 10px;
`;
