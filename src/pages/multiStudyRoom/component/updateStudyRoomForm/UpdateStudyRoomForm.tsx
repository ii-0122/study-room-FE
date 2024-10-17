import { KeyboardEvent, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './UpdateStudyRoomForm.style';
import Button from '@/components/button/Button';
import { FaStarOfLife } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import TagInput from '@/pages/study-room/components/tagInput/TagInput';
import Radio from '@/pages/study-room/components/radio/Radio';
import ToggleButton from '@/pages/study-room/components/toggleButton/ToggleButton';
import { UpdateStudyRoomFormData } from '@/types/updateStudyRoom';
import { StudyRoomInfo } from '@/models/studyRoom.model';
import UpdateImageUpload from './updateImageUpload/UpdateImageUpload';
import useStudyRoomStore from '@/stores/studyRoom.store';
import { useSocket } from '@/socket/SocketContext';

interface UpdateStudyRoomFormProps {
  studyRoomInfo: StudyRoomInfo; // 초기값으로 사용할 데이터
}

export default function UpdateStudyRoomForm({
  studyRoomInfo,
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
      title: studyRoomInfo?.title,
      notice: studyRoomInfo?.notice,
      tagList: studyRoomInfo?.tagList || [],
      isPublic: studyRoomInfo?.isPublic,
      isChat: studyRoomInfo?.isChat,
      imageUrl: studyRoomInfo?.imageUrl,
      password: studyRoomInfo?.password,
    },
  });

  const toggleSettingModal = useStudyRoomStore(
    (state) => state.toggleSettingModal
  );

  const socket = useSocket();

  const handleFormSubmit: SubmitHandler<UpdateStudyRoomFormData> = async (
    data
  ) => {
    console.log(data);

    try {
      socket?.emit('modifyRoomInfo', data);
      toast.success('스터디룸 설정 변경 성공');
    } catch (error) {
      console.error('스터디룸 설정 변경 실패:', error);
      toast.error('스터디룸 설정 변경 실패');
    }

    toggleSettingModal();
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const isPublic = watch('isPublic', false);
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
            placeholder={studyRoomInfo?.title}
            onKeyDown={handleKeyDown}
            {...register('title', {
              required: '스터디룸 제목은 필수입니다.',
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
            value={watch('tagList')}
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
          <p>{studyRoomInfo?.maxNum}</p>
        </S.UpdateFormInputField>

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="notice">공지사항</S.UpdateFormLabel>
          <S.UpdateFormInput
            id="notice"
            placeholder={studyRoomInfo?.notice}
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
                    placeholder={studyRoomInfo?.password}
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
            checked={watch('isChat', studyRoomInfo?.isChat)}
            onChange={() => setValue('isChat', !watch('isChat'))}
            onKeyDown={handleKeyDown}
          />
        </S.UpdateFormInputField>
        {errors.isChat && (
          <S.ErrorMessage>{errors.isChat.message}</S.ErrorMessage>
        )}

        <S.UpdateFormInputField>
          <S.UpdateFormLabel htmlFor="bgImage">배경사진</S.UpdateFormLabel>
          <UpdateImageUpload
            setValue={setValue}
            onKeyDown={handleKeyDown}
            ref={ImageInputRef}
          />
        </S.UpdateFormInputField>
        {errors.imageUrl && (
          <S.ErrorMessage>{errors.imageUrl.message}</S.ErrorMessage>
        )}

        <Button type="submit" size="large">
          설정 변경
        </Button>
      </S.UpdateForm>
    </S.UpdateFormWrapper>
  );
}
