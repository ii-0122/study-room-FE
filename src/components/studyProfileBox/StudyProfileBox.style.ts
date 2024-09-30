import styled from 'styled-components';

export const StudyProfileBoxStyle = styled.div<{ $isGroup: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $isGroup }) => ($isGroup ? '5px' : '15px')};
  width: ${({ $isGroup }) => ($isGroup ? '265px' : '752px')};
  height: ${({ $isGroup }) => ($isGroup ? '166px' : '476px')};
  background-color: ${({ theme }) => theme.color.bgGray};
`;

export const ContentDisplay = styled.div<{ $isGroup: boolean }>`
  position: absolute;
  display: flex;
  justify-content: ${({ $isGroup }) =>
    $isGroup ? 'flex-end' : 'space-between'};
  width: 100%;
  font-size: ${({ $isGroup }) => ($isGroup ? '10px' : '20px')};
  top: ${({ $isGroup }) => ($isGroup ? '10px' : '30px')};
  color: #868686;

  .content {
    margin: ${({ $isGroup }) => ($isGroup ? '0 10px' : '0 35px')};
  }
`;

export const TimeDisplay = styled.div<{ $isGroup: boolean }>`
  position: absolute;
  display: flex;
  justify-content: ${({ $isGroup }) =>
    $isGroup ? 'flex-end' : 'space-between'};
  width: 100%;
  font-size: ${({ $isGroup }) => ($isGroup ? '20px' : '50px')};
  top: ${({ $isGroup }) => ($isGroup ? '25px' : '60px')};
  font-weight: 600;
  color: #434343;

  .time {
    margin: ${({ $isGroup }) => ($isGroup ? '0 10px' : '0px 35px')};
  }
`;

export const ProfileImageContainer = styled.div<{ $isGroup: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $isGroup }) => ($isGroup ? '112px' : '428px')};
  height: ${({ $isGroup }) => ($isGroup ? '112px' : '428px')};
  border-radius: 50%;
  background-color: white;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 80%;
  height: 80%;
`;

export const UserIdDisplay = styled.div<{ $isGroup: boolean }>`
  position: absolute;
  font-size: ${({ $isGroup }) => ($isGroup ? '12px' : '50px')};
  left: ${({ $isGroup }) => ($isGroup ? '10px' : '40px')};
  bottom: ${({ $isGroup }) => ($isGroup ? '10px' : '40px')};
`;
