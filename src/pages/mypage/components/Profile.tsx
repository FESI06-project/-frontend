import { UserProfile } from "@/types";
import Image from 'next/image';

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
  onEditClick 
}: ProfileProps) {
  return (
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
          <button
            onClick={onEditClick}
          >
            <Image
              src="/assets/image/profile_edit.svg" // public 디렉토리에서 가져옴
              alt="Edit Profile"
              width={50}
              height={50}
            />
          </button>
        </div>
      </div>
    </div>
  );
}