import React, { useState } from 'react';
import { UserProfile } from "@/types";
import Image from 'next/image';
import useModalStore from '@/stores/useModalStore';
import Modal from '@/components/dialog/Modal';
import Toast from '@/components/dialog/Toast';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface ProfileProps {
  user?: UserProfile;
  onEditClick: () => void;
}

export default function Profile({
  user = {
    memberId: '',
    email: '',
    nickname: '',
    profileImage: null
  } as UserProfile,  // UserProfile 타입으로 명시적 캐스팅
}: ProfileProps) {
  const [showToast, setShowToast] = useState(false);
  const { showModal, setShowModal } = useModalStore();
  const [nickname, setNickname] = useState(user.nickname || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //나중에 api 넣기
    setShowModal(false);
    setShowToast(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <>
      <div className="flex items-start gap-[20px]">
        <div className="flex-shrink-0">
          <Image
            src="/assets/image/mypage_profile.svg" // public 디렉토리에서 가져옴
            alt="Edit Profile"
            width={50}
            height={50}
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-medium">{user.nickname || 'Unknown'}</h1>
              <p className="text-dark-600 font-light">{user.email || 'Unknown Email'}</p>
            </div>
            <button onClick={() => setShowModal(true)}>
              <Image
                src="/assets/image/profile_edit.svg" 
                alt="Edit Profile"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="회원 정보를 입력해주세요.">
       <div className="w-[560px] h-[324px]">

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="flex flex-col">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/assets/image/mypage_profile.svg"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                  />
              </div>
              <label className="text-sm mb-2">닉네임</label>
              <Input
                type="text"
                value={nickname}
                handleInputChange={handleInputChange}
                placeholder="닉네임을 수정해주세요."
                className="mb-4"
                />
            </div>
            <Button
              type="submit"
              name="확인"
              style="default"
            />
          </form>
      </div>
        </Modal>
      )}

      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type="check"
        message="프로필 수정을 성공하였습니다."
      />
    </>
  );
}
