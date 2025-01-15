import React, { useState } from 'react';
import { UserProfile } from '@/types';
import Image from 'next/image';
import Modal from '@/components/dialog/Modal';
import Toast from '@/components/dialog/Toast';
import Button from '@/components/common/Button';
import ModalInput from '@/components/common/ModalInput';

interface ProfileProps {
  user?: UserProfile;
}

export default function Profile({
  user = {
    memberId: '',
    email: '',
    nickname: '',
    profileImage: null,
  } as UserProfile,
}: ProfileProps) {
  const [showToast, setShowToast] = useState(false); // 성공 토스트 표시 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState(user.nickname || ''); // 닉네임 상태
  const [, setIsDisabled] = useState(false); // 버튼 비활성화 상태

  // 닉네임 유효성 검사 실패 시 처리
  const handleValidationFail = () => {
    setIsDisabled(true); // 버튼 비활성화
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setIsDisabled(true);
      return;
    }
    setIsModalOpen(false);
    setShowToast(true);
  };

  return (
    <>
      {/* 프로필 정보 섹션 */}
      <div className="flex items-start gap-[20px]">
        <div className="flex-shrink-0">
          {/* 프로필 이미지 */}
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
          {/* 사용자 정보와 수정 버튼 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-medium">{user.nickname || '닉네임 없음'}</h1>
              <p className="text-dark-600 font-light">
                {user.email || '이메일 없음'}
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
      {/* 모달 표시 */}
      {isModalOpen && (
        <Modal  title="회원 정보를 입력해주세요."
        onClose={() => setIsModalOpen(false)}>
          <div className="w-[500px] h-[254px]">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex items-center gap-[10px] mt-[30px]">
                <div className="relative h-[130px]">
                  {/* 모달 내부 프로필 이미지 */}
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
                    <button
                      type="button"
                      className="text-dark-700 font-normal hover:text-primary"
                    >
                      이미지 삭제
                    </button>
                  </div>
                </div>
                <div className="flex-1 h-[130px] flex flex-col justify-end">
                  {/* 닉네임 수정 입력란 */}
                  <label className="text-base mb-[10px] font-normal block">닉네임</label>
                  <ModalInput
                    type="title"
                    value={nickname}
                    onChange={(value) => {
                      setNickname(value);
                      setIsDisabled(!value.trim());
                    }}
                    placeholder="닉네임을 수정해주세요."
                    maxLength={25}
                    onValidationFail={handleValidationFail}
                  />
                </div>
              </div>

              <div className="mt-[20px]">
                <Button type="submit" name="확인" style="default" />
              </div>
            </form>
          </div>
        </Modal>
      )}
      {/* 성공 토스트 메시지 */}
      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type="check"
        message="프로필 수정을 성공하였습니다."
      />
    </>
  );
}
