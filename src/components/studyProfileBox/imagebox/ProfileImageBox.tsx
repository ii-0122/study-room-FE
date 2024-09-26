import * as S from './ProfileImageBox.style';
import defaultImage from './defaultImage.png';

interface ProfileImageBoxProps {
  src?: string;
  alt?: string;
  width: string;
  height: string;
}

const ProfileImageBox: React.FC<ProfileImageBoxProps> = ({
  src,
  alt = 'Profile',
  width,
  height,
}) => {
  const imageSrc = src && src.trim() !== '' ? src : defaultImage;
  const isDefault = imageSrc === defaultImage;

  return (
    <S.ProfileImageContainer width={width} height={height}>
      <S.ProfileImage src={imageSrc} alt={alt} isDefault={isDefault} />
    </S.ProfileImageContainer>
  );
};

export default ProfileImageBox;
