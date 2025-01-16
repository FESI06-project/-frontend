// components/Profile.tsx
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/dialog/Modal';
import Button from '@/components/common/Button';
import ModalInput from '@/components/common/ModalInput';
import useToastStore from '@/stores/useToastStore';
import useMemberStore from '@/stores/useMemberStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const uploadImage = async (file: File) => {
  console.log('이미지 업로드 시작...', {
    fileType: file.type,
    fileSize: file.size,
    fileName: file.name
  });

  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const token = localStorage.getItem('token');
    console.log('토큰 확인:', token ? '토큰 존재' : '토큰 없음');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/images?type=MEMBER`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('이미지 업로드 응답:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      console.error('업로드 실패:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    console.log('업로드 성공 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
    throw error;
  }
};

const updateProfile = async ({ nickname, profileImageUrl }: { nickname: string; profileImageUrl: string | null }) => {
  console.log('프로필 수정 시작...', {
    nickname,
    profileImageUrl,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/my-page/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickName: nickname,
        profileImageUrl,
      }),
    });

    console.log('프로필 수정 응답:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      console.error('프로필 수정 실패:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    console.log('프로필 수정 성공 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('프로필 수정 에러:', error);
    throw error;
  }
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function Profile() {
  const { nickname, email, profileImageUrl } = useMemberStore();
  const showToast = useToastStore((state) => state.show);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname || '');
  const [editedImage, setEditedImage] = useState<string | null>(profileImageUrl);
  const [, setIsDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

// mutation 핸들러에도 로그 추가
const { mutate: uploadImageMutation } = useMutation({
  mutationFn: uploadImage,
  onSuccess: (data) => {
    console.log('이미지 업로드 mutation 성공:', data);
    setEditedImage(data.imageUrl);
    setProfileImageUrl(data.imageUrl); // store에 즉시 반영
    setIsUploading(false);
    showToast('이미지가 업로드되었습니다.', 'check');
  },
  onError: (error) => {
    console.error('이미지 업로드 mutation 에러:', error);
    setIsUploading(false);
    showToast('이미지 업로드에 실패했습니다.', 'error');
  },
});

const { setNickname, setProfileImageUrl } = useMemberStore();
  // 프로필 수정 mutation
  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: ({ nickname, profileImageUrl }: { nickname: string; profileImageUrl: string | null }) =>
      updateProfile({ nickname, profileImageUrl }),
    onSuccess: (data) => {
      // 서버로부터 받은 응답 데이터를 사용하여 store 업데이트
      setNickname(editedNickname); // 실제 수정한 닉네임으로 업데이트
      setProfileImageUrl(editedImage); // 실제 수정한 이미지 URL로 업데이트
      
      setIsModalOpen(false);
      showToast('프로필 수정을 성공하였습니다.', 'check');
    },
    onError: () => {
      showToast('프로필 수정에 실패했습니다.', 'error');
    },
  });
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('선택된 파일 없음');
      return;
    }
  
    console.log('파일 선택됨:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
  
    // 파일 타입 검증
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      console.log('잘못된 파일 타입:', file.type);
      showToast('JPEG/JPG/PNG 파일만 업로드 가능합니다.', 'error');
      return;
    }
  
    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      console.log('파일 크기 초과:', file.size);
      showToast('파일 크기는 5MB 이하여야 합니다.', 'error');
      return;
    }
  
    console.log('이미지 업로드 시작');
    setIsUploading(true);
    uploadImageMutation(file);
  };

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