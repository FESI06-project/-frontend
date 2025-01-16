// components/Profile.tsx
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/dialog/Modal';
import Button from '@/components/common/Button';
import ModalInput from '@/components/common/ModalInput';
import useToastStore from '@/stores/useToastStore';
import useMemberStore from '@/stores/useMemberStore';
import { useMutation} from '@tanstack/react-query';
import { profileService } from '@/pages/mypage/api/profileService';
import { useImageUpload } from '@/hooks/useImageUpload';


export default function Profile() {
  const { nickname, email, profileImageUrl } = useMemberStore();
  const showToast = useToastStore((state) => state.show);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname || '');
  const [editedImage, setEditedImage] = useState<string | null>(profileImageUrl);
  const [, setIsDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleImageUpload, isUploading } = useImageUpload({
    uploadFn: profileService.uploadImage,
    onUploadSuccess: (imageUrl) => {
      setEditedImage(imageUrl);
      setProfileImageUrl(imageUrl);
    }
  });
  
const { setNickname, setProfileImageUrl } = useMemberStore();
  // 프로필 수정 mutation
  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: ({ nickname, profileImageUrl }: { nickname: string; profileImageUrl: string | null }) =>
      profileService.updateProfile({
        nickName: nickname,
        profileImageUrl,
      }),
    onSuccess: () => {
      setNickname(editedNickname);
      setProfileImageUrl(editedImage);
      setIsModalOpen(false);
      showToast('프로필 수정을 성공하였습니다.', 'check');
    },
    onError: () => {
      showToast('프로필 수정에 실패했습니다.', 'error');
    },
  });

  const handleImageDelete = () => {
    setEditedImage(null);
    setProfileImageUrl(null); // store에 즉시 반영
    showToast('이미지가 삭제되었습니다.', 'check');
  };

  const handleValidationFail = () => {
    setIsDisabled(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setEditedNickname(nickname || '');
    setEditedImage(profileImageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedNickname.trim()) {
      setIsDisabled(true);
      return;
    }

    updateProfileMutation({
      nickname: editedNickname,
      profileImageUrl: editedImage,
    });
  };

  return (
    <>
      <div className="flex items-start gap-[20px]">
        <div className="flex-shrink-0">
          <Image
            src={
              !profileImageUrl || profileImageUrl === 'null'
                ? '/assets/image/mypage_profile.svg'
                : profileImageUrl
            }
            alt="프로필 이미지"
            width={50}
            height={50}
            className="rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/assets/image/mypage_profile.svg';
            }}
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-medium">{nickname || '닉네임 없음'}</h1>
              <p className="text-dark-600 font-light">
                {email || '이메일 없음'}
              </p>
            </div>
            <button onClick={handleEditClick}>
              <Image
                src="/assets/image/profile_edit.svg"
                alt="프로필 수정"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title="회원 정보를 입력해주세요."
          onClose={() => setIsModalOpen(false)}
        >
          <div className="w-[500px] h-[254px]">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex items-center gap-[10px] mt-[30px]">
                <div className="relative h-[130px]">
                  <Image
                    src={
                      !editedImage || editedImage === 'null'
                        ? '/assets/image/fitmon.png'
                        : editedImage
                    }
                    alt="프로필 이미지"
                    width={130}
                    height={130}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/assets/image/mypage_profile.svg';
                    }}
                  />
                  <div className="absolute inset-0 border border-dark_500 bg-dark-500/80 flex flex-col rounded-[10px] items-center justify-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Image
                        src="/assets/image/profile_edit.svg"
                        alt="프로필 이미지 수정"
                        width={45}
                        height={45}
                        className="hover:opacity-80"
                      />
                    </button>
                    <button
                      type="button"
                      className="text-dark-700 font-normal hover:text-primary"
                      onClick={handleImageDelete}
                      disabled={isUploading}
                    >
                      이미지 삭제
                    </button>
                  </div>
                </div>
                <div className="flex-1 h-[130px] flex flex-col justify-end">
                  <label className="text-base mb-[10px] font-normal block">
                    닉네임
                  </label>
                  <ModalInput
                    type="title"
                    value={editedNickname}
                    onChange={(value) => {
                      setEditedNickname(value);
                      setIsDisabled(!value.trim());
                    }}
                    placeholder="닉네임을 수정해주세요."
                    maxLength={25}
                    onValidationFail={handleValidationFail}
                  />
                </div>
              </div>

              <div className="mt-[20px]">
                <Button
                  type="submit"
                  name="확인"
                  style="default"
                />
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}