import styled from 'styled-components';
import { FormInput } from '../form/CreateStudyRoomForm.style';

export const ImageInput = styled(FormInput)`
  &[type='file'] {
    display: none;
  }
`;

export const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UploadButton = styled.button`
  display: inline-block;
  align-items: center;
  gap: 8px;
  background-color: white;
  color: #30363d;
  padding: 6px 10px;
  border: 1px solid #30363d;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  min-width: 110px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const FileName = styled.span`
  font-size: 14px;
  color: #333;
  width: 180px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
