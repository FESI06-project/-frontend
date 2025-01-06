// src/components/Profile.tsx
import type { UserProfile } from '@/types';

interface ProfileProps {
  user: UserProfile;
  onEditClick: () => void;
}

export default function Profile({ user, onEditClick }: ProfileProps) {
  return (
    <div className="flex items-start gap-8">
      {/* 프로필 이미지 섹션 */}
      <div className="flex-shrink-0">
        <img 
          src={user.profileImage || '/default-profile.png'}
          alt={user.nickname}
          className="w-32 h-32 rounded-full"
        />
      </div>

      {/* 유저 정보 섹션 */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-dark-600">{user.email}</p>
          </div>
          <button 
            onClick={onEditClick}
            className="px-4 py-2 text-white bg-primary rounded-lg"
          >
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  );
}