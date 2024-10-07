import { checkDuplicate } from '@/apis/auth.api';

export default async function checkFieldDuplicate(
  field: 'id' | 'nickname',
  value: string,
  setError: (message: string | null) => void
) {
  if (!value) return;

  const response = await checkDuplicate(field, value);

  const errorMessage = {
    id: '이미 사용 중인 아이디입니다.',
    nickname: '이미 사용 중인 닉네임입니다.',
  };

  if (response?.isDuplicate) {
    setError(errorMessage[field]);
  } else {
    setError(null);
  }
}
