import React, { useState } from 'react';
import { UserProfile } from "@/types";
import Image from 'next/image';
import useModalStore from '@/stores/useModalStore';
import Modal from '@/components/dialog/Modal';
import Toast from '@/components/dialog/Toast';
import Button from '@/components/common/Button';
import ModalInput from '@/components/common/ModalInput';
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
  } as UserProfile,

}: ProfileProps) {
  const [showToast, setShowToast] = useState(false);
  const { showModal, setShowModal } = useModalStore();
  const [nickname, setNickname] = useState(user.nickname || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <>
      <div className="flex items-start gap-[20px]">
        <div className="flex-shrink-0">
          <Image
            src={
              user.profileImage === 'null' || !user.profileImage
                ? '/assets/image/mypage_profile.svg'
                : user.profileImage
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
              <h1 className="font-medium">{user.nickname || '닉네임 없음'}</h1>
              <p className="text-dark-600 font-light">{user.email || '이메일 없음'}</p>
            </div>
            <button onClick={() => setShowModal(true)}>
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

      {showModal && (
        <Modal title="회원 정보를 입력해주세요.">
          <div className="w-[500px] h-[254px]">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex items-center gap-[10px] mt-[30px]">
              <div className="relative h-[130px]">
                  <Image
                    src={
                      user.profileImage === 'null' || !user.profileImage
                        ? '/assets/image/fitmon.png'
                        : user.profileImage
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
                  <div className="absolute inset-0  border border-dark_500 bg-dark-500/80 flex flex-col rounded-[10px] items-center justify-center gap-2">
                    <button type="button">
                      <Image
                        src="/assets/image/profile_edit.svg"
                        alt="프로필 이미지 수정"
                        width={45}
                        height={45}
                        className="hover:opacity-80"
                      />
                    </button>
                    <button type="button" className="text-dark-700 font-normal hover:text-primary">
                      이미지 삭제
                    </button>
                  </div>
                </div>
                <div className="flex-1 h-[130px] flex flex-col justify-end">
                  <label className="text-base mb-[10px] font-normal block">닉네임</label>
                  <ModalInput
                    type="title"
                    value={nickname}
                    onChange={setNickname}
                    defaultValue={user.nickname}
                    placeholder="닉네임을 수정해주세요."
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

      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type="check"
        message="프로필 수정을 성공하였습니다."
      />
    </>
  );
}
