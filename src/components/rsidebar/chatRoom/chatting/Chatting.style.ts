import styled from 'styled-components';

export const ChatWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  display: flex;
  width: 100%;
  padding: 30px;
  margin-top: auto;
  ${(props) => props.isMine && 'flex-direction : row-reverse'}
`;

export const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 72px;
  height: 97px;
  flex-shrink: 0;
  align-items: center;
`;

// 임시 스타일 컴포넌트. 추후 프로필 컴포넌트와 교체
export const UserProfile = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  ${(props) =>
    props.isMine ? `background-color : blue;` : 'background-color: gray;'}
`;

export const Nickname = styled.div`
  font-size: 12px;
  margin-top: 10px;
  word-break: break-all;
`;

export const ChatInfoArea = styled.div`
  width: 371px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ChatBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  width: 90%;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;

  ${(props) =>
    props.isMine
      ? `margin-right : auto; background-color : ${props.theme.color.main};`
      : `margin-left : auto; background-color : ${props.theme.color.bgGray} ;`}
`;

export const CreatedTime = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  margin-top: 10px;
  padding: 0px 5px;

  ${(props) => (props.isMine ? 'margin-right: auto;' : 'margin-left: auto;')}
`;
