import { KeyboardEvent, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from '@/pages/study-room/components/form/CreateStudyRoomForm.style';
import Button from '@/components/button/Button';
import TagInput from '../tagInput/TagInput';
import Radio from '../radio/Radio';
import ToggleButton from '../toggleButton/ToggleButton';
import ImageUpload from '../imageUpload/ImageUpload';
import { FaPlus, FaStarOfLife } from 'react-icons/fa6';
import type { CreateStudyRoomFormData } from '@/types/createStudyRoom';
import { createStudyRoom } from '@/apis/studyRooms.api';

export default function CreateStudyRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<CreateStudyRoomFormData>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<CreateStudyRoomFormData> = async (data) => {
    try {
      const result = await createStudyRoom(data);
      console.log('공부방 생성 성공:', result);
      console.log(data);
    } catch (error) {
      console.error('공부방 생성 에러:', error);
      console.log(data);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const isPublic = watch('isPublic', true);

  const ImageInputRef = useRef<HTMLInputElement>(null);

  return (
    <S.CreateFormWrapper>
      <S.CreateTitle>스터디방 추가</S.CreateTitle>

      <S.CreateForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormInputField>
          <S.FormLabel htmlFor="title">
            스터디 이름
            <FaStarOfLife size={6} color="#599BFC" />
          </S.FormLabel>
          <S.FormInput
            id="title"
            placeholder="스터디 이름을 작성해 주세요."
            onKeyDown={handleKeyDown}
            {...register('title', {
              required: '스터디 이름은 필수입니다.',
              maxLength: {
                value: 30,
                message: '최대 30자까지 입력할 수 있습니다.',
              },
            })}
          />
        </S.FormInputField>
        {errors.title && (
          <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
        )}

        <S.FormInputField>
          <S.FormLabel htmlFor="tagList">태그</S.FormLabel>
          <TagInput
            id="tagList"
            value={watch('tagList') || []}
            onChange={(newTags) => setValue('tagList', newTags)}
            setError={setError}
          />
        </S.FormInputField>
        {errors.tagList && (
          <S.ErrorMessage>{errors.tagList.message}</S.ErrorMessage>
        )}

        <S.FormInputField>
          <S.FormLabel htmlFor="maxNum">
            최대 인원 <FaStarOfLife size={6} color="#599BFC" />
          </S.FormLabel>
          <S.FormInput
            id="maxNum"
            type="number"
            placeholder="최대 12명"
            onKeyDown={handleKeyDown}
            {...register('maxNum', {
              required: '최대 인원 수는 필수입니다.',
              min: { value: 1, message: '최소 1명 이상이어야 합니다.' },
              max: { value: 12, message: '최대 12명을 초과할 수 없습니다.' },
            })}
          />
        </S.FormInputField>
        {errors.maxNum && (
          <S.ErrorMessage>{errors.maxNum.message}</S.ErrorMessage>
        )}

        <S.FormInputField>
          <S.FormLabel htmlFor="notice">공지사항</S.FormLabel>
          <S.FormInput
            id="notice"
            placeholder="공지사항을 작성해 주세요."
            onKeyDown={handleKeyDown}
            {...register('notice')}
          />
        </S.FormInputField>

        <S.FormInputField>
          <S.FormLabel htmlFor="isPublic">
            공개 여부 <FaStarOfLife size={6} color="#599BFC" />
          </S.FormLabel>
          <S.RadioGroupWrapper>
            <Radio
              id="isPublic"
              name="isPublic"
              selectedValue={watch('isPublic')}
              onChange={(value) => setValue('isPublic', value)}
              onKeyDown={handleKeyDown}
              options={[
                { value: true, label: '공개' },
                { value: false, label: '비공개' },
              ]}
            />
            {!isPublic && (
              <S.PrivateInput>
                <S.PasswordInputWrapper>
                  <S.PasswordInputLabel>비밀번호</S.PasswordInputLabel>
                  <S.PasswordInput
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onKeyDown={handleKeyDown}
                    {...register('password', {
                      required: '비밀번호는 필수입니다.',
                      minLength: {
                        value: 1,
                        message: '비밀번호는 최소 1자 이상이어야 합니다.',
                      },
                    })}
                  />
                </S.PasswordInputWrapper>
                {errors.password && (
                  <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
                )}
              </S.PrivateInput>
            )}
          </S.RadioGroupWrapper>
        </S.FormInputField>

        <S.FormInputField>
          <S.FormLabel htmlFor="isChat">
            채팅 여부 <FaStarOfLife size={6} color="#599BFC" />
          </S.FormLabel>
          <ToggleButton
            id="isChat"
            {...register('isChat')}
            checked={watch('isChat', false)}
            onChange={() => setValue('isChat', !watch('isChat'))}
            onKeyDown={handleKeyDown}
          />
        </S.FormInputField>
        {errors.isChat && (
          <S.ErrorMessage>{errors.isChat.message}</S.ErrorMessage>
        )}

        <S.FormInputField>
          <S.FormLabel htmlFor="bgImage">배경사진</S.FormLabel>
          <ImageUpload
            setValue={setValue}
            onKeyDown={handleKeyDown}
            ref={ImageInputRef}
          />
        </S.FormInputField>
        {errors.imageUrl && (
          <S.ErrorMessage>{errors.imageUrl.message}</S.ErrorMessage>
        )}

        <Button type="submit" size="large">
          <FaPlus />
          추가하기
        </Button>
      </S.CreateForm>
    </S.CreateFormWrapper>
  );
}
