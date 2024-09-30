import { forwardRef, useState, KeyboardEvent } from 'react';
import { UseFormSetError } from 'react-hook-form';
import * as S from '@/pages/study-room/components/tagInput/TagInput.style';
import FormInput from '@/components/formInput/FormInput';
import { IoClose } from 'react-icons/io5';

interface TagInputProps {
  id: string;
  onChange: (tags: string[]) => void;
  value: string[];
  setError: UseFormSetError<{ tagList: string[] }>;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ id, onChange, value = [], setError }, ref) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' && inputValue.trim()) {
        e.preventDefault();
        if (inputValue.length > 10) {
          setError('tagList', {
            type: 'manual',
            message: '태그는 10자를 초과할 수 없습니다.',
          });
          return;
        }
        if (value.length >= 7) {
          setError('tagList', {
            type: 'manual',
            message: '태그는 최대 7개까지만 추가할 수 있습니다.',
          });
          return;
        }
        const newTags = [...value, inputValue.trim()];
        onChange(newTags);
        setInputValue('');
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = value.filter((_, index) => index !== indexToRemove);
      onChange(newTags);
      setError('tagList', { type: 'manual', message: '' });
    };

    return (
      <S.TagInputWrapper>
        {value.map((tag, index) => (
          <S.Tag key={index}>
            {tag}
            <S.RemoveButton onClick={() => removeTag(index)}>
              <IoClose />
            </S.RemoveButton>
          </S.Tag>
        ))}
        <FormInput
          id={id}
          ref={ref}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          placeholder="태그를 작성해 주세요. (띄어쓰기로 입력)"
        />
      </S.TagInputWrapper>
    );
  }
);

TagInput.displayName = 'TagInput';

export default TagInput;
