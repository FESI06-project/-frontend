import { UserProfile } from "@/types";

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
    <div className="flex items-start gap-8">
      <div className="flex-shrink-0">
        {/* <img
          src={user.profileImage || '/default-profile.png'}
          alt={user.nickname || 'Unknown'}
          className="w-32 h-32 rounded-full"
        /> */}
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{user.nickname || 'Unknown'}</h1>
            <p className="text-dark-600">{user.email || 'Unknown Email'}</p>
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