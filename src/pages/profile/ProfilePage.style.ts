import styled from 'styled-components';

export const ContainerWrapper = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 12px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.bgGray};
  border-radius: 12px;
  padding: 24px;
  gap: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  min-width: 120px;
  display: inline-block;
  color: ${({ theme }) => theme.color.bgDarkGray};
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

export const Input = styled.input`
  min-height: 36px;
  outline-style: none;
  border: none;
  min-width: 400px;
  flex-grow: 1;
  font-size: 16px;
  &[type='file'] {
    display: none;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
`;

export const SettingButton = styled.button`
  min-width: 60px;
  min-height: 30px;
  border-radius: 6px;
  border: 1px solid gray;
  margin-left: auto;
  width: fit-content;
  cursor: pointer;
`;

export const RemoveAccountButton = styled.button`
  border: none;
  background-color: white;
  min-width: 60px;
  min-height: 30px;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const ProfilePreviewWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
`;

export const CameraIconButton = styled.label`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: black;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
`;

export const DeleteImageButton = styled.button`
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.color.bgDarkGray};
`;

export const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.btnWarn};
  margin-top: 4px;
`;
