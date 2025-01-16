// components/profile/Profile.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import useMemberStore from '@/stores/useMemberStore';
import ProfileEditModal from './ProfileEditModal';

export default function Profile() {
  const { nickname, email, profileImageUrl, setNickname, setProfileImageUrl } = useMemberStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleProfileUpdate = (newNickname: string, newImageUrl: string | null) => {
    setNickname(newNickname);
    setProfileImageUrl(newImageUrl);
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

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialNickname={nickname || ''}
        initialImage={profileImageUrl}
        onUpdate={handleProfileUpdate}
      />
    </>
  );
}