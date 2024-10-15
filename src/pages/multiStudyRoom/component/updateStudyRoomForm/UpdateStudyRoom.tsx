import { KeyboardEvent, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './UpdateStudyRoomForm.style';
import Button from '@/components/button/Button';
import { FaPlus, FaStarOfLife } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import TagInput from '@/pages/study-room/components/tagInput/TagInput';
import Radio from '@/pages/study-room/components/radio/Radio';
import ToggleButton from '@/pages/study-room/components/toggleButton/ToggleButton';
import ImageUpload from '@/pages/study-room/components/imageUpload/ImageUpload';
import { UpdateStudyRoomFormData } from '@/types/updateStudyRoom';
import { StudyRoomInfo } from '@/models/studyRoom.model';

interface UpdateStudyRoomFormProps {
  studyRoomInfo: StudyRoomInfo; // 초기값으로 사용할 데이터
  onSubmit: (data: UpdateStudyRoomFormData) => Promise<void>; // 제출 시 호출될 함수
}

export default function UpdateStudyRoomForm({
  studyRoomInfo,
  onSubmit,
}: UpdateStudyRoomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<UpdateStudyRoomFormData>({
    mode: 'onSubmit',
    defaultValues: {
      isPublic: true,
    },
  });

  const prevStudyRoomInfo = studyRoomInfo;
  console.log(prevStudyRoomInfo);

  const handleFormSubmit: SubmitHandler<UpdateStudyRoomFormData> = async (
    data
  ) => {
    console.log(data);

    try {
      // 스터디 룸 설정 변경 socket
      toast.success('스터디룸 생성 성공');
    } catch (error) {
      console.error('방 생성 실패:', error);
      toast.error('스터디룸 설정 변경 실패');
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
    <S.UpdateFormWrapper>
      <S.UpdateTitle>스터디룸 설정 변경</S.UpdateTitle>

      <S.UpdateForm onSubmit={handleSubmit(handleFormSubmit)}>
        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="title">
            스터디룸 제목
            <FaStarOfLife size={6} color="#599BFC" />
          </S.UpdateFormLabel>
          <S.UpdateFormInput
            id="title"
            placeholder="스터디룸 제목을 작성해 주세요."
            onKeyDown={handleKeyDown}
            {...register('title', {
              required: '스터디룸 제목을 필수입니다.',
              maxLength: {
                value: 30,
                message: '최대 30자까지 입력할 수 있습니다.',
              },
            })}
          />
        </S.UpdateFormInputField>
        {errors.title && (
          <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
        )}

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="tagList">태그</S.UpdateFormLabel>
          <TagInput
            id="tagList"
            value={watch('tagList') || []}
            onChange={(newTags) => setValue('tagList', newTags)}
            setError={setError}
          />
        </S.UpdateFormInputField>
        {errors.tagList && (
          <S.ErrorMessage>{errors.tagList.message}</S.ErrorMessage>
        )}

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="maxNum">
            최대 인원 <FaStarOfLife size={6} color="#599BFC" />
          </S.UpdateFormLabel>
          <p></p>
        </S.UpdateFormInputField>

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="notice">공지사항</S.UpdateFormLabel>
          <S.UpdateFormInput
            id="notice"
            placeholder="공지사항을 작성해 주세요."
            onKeyDown={handleKeyDown}
            {...register('notice')}
          />
        </S.UpdateFormInputField>

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="isPublic">
            공개 여부 <FaStarOfLife size={6} color="#599BFC" />
          </S.UpdateFormLabel>
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
        </S.UpdateFormInputField>

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="isChat">
            채팅 여부 <FaStarOfLife size={6} color="#599BFC" />
          </S.UpdateFormLabel>
          <ToggleButton
            id="isChat"
            {...register('isChat')}
            checked={watch('isChat', false)}
            onChange={() => setValue('isChat', !watch('isChat'))}
            onKeyDown={handleKeyDown}
          />
        </S.UpdateFormInputField>
        {errors.isChat && (
          <S.ErrorMessage>{errors.isChat.message}</S.ErrorMessage>
        )}

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="bgImage">배경사진</S.UpdateFormLabel>
          <ImageUpload
            setValue={setValue}
            onKeyDown={handleKeyDown}
            ref={ImageInputRef}
          />
        </S.UpdateFormInputField>
        {errors.imageUrl && (
          <S.ErrorMessage>{errors.imageUrl.message}</S.ErrorMessage>
        )}

        <Button type="submit" size="large">
          <FaPlus />
          추가하기
        </Button>
      </S.UpdateForm>
    </S.UpdateFormWrapper>
  );
}
