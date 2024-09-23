import styled from 'styled-components';

export const StudyProfileBoxStyle = styled.div<{ $isGroup: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: ${({ $isGroup }) => ($isGroup ? '384px' : '1088px')};
  height: ${({ $isGroup }) => ($isGroup ? '242px' : '686px')};
  background-color: ${({ theme }) => theme.color.bgGray};
`;

export const TimeDisplay = styled.div<{ $isGroup: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${({ $isGroup }) => ($isGroup ? '30px' : '70px')};
  top: 20px;

  .time {
    margin: ${({ $isGroup }) => ($isGroup ? '0 20px' : '0px 40px')};
  }
`;

export const ProfileImageContainer = styled.div<{ $isGroup: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $isGroup }) => ($isGroup ? '182px' : '622px')};
  height: ${({ $isGroup }) => ($isGroup ? '182px' : '622px')};
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
  font-size: ${({ $isGroup }) => ($isGroup ? '22px' : '50px')};
  left: ${({ $isGroup }) => ($isGroup ? '20px' : '40px')};
  bottom: ${({ $isGroup }) => ($isGroup ? '20px' : '40px')};
`;
