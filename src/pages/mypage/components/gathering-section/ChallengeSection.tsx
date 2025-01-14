import Image from 'next/image';
import { ChallengeType, GatheringChallengeType, GatheringItem } from '@/types';

interface ChallengeSectionProps {
  challenges: GatheringChallengeType;
  gathering: GatheringItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChallengeSection({
  challenges,
  gathering,
  isOpen,
  onToggle,
}: ChallengeSectionProps) {
  if (!gathering) {
    return null; // gathering이 없는 경우 아무것도 렌더링하지 않음
  }
  // 상태에 따른 텍스트와 스타일 반환
  const getStatusInfo = (challenge: ChallengeType) => {
    if (gathering.captainStatus) {
      if (challenge.verificationStatus && challenge.participantStatus) {
        return { text: '참여완료', style: 'bg-dark-500' };
      } else if (challenge.participantStatus) {
        return { text: '참여중', style: 'bg-primary' };
      }
      return { text: '미참여', style: 'bg-dark-500' };
    } else {
      if (challenge.verificationStatus && challenge.participantStatus) {
        return { text: '참여완료', style: 'bg-dark-500' };
      }
      return { text: '참여중', style: 'bg-primary' };
    }
  };

  // 필터링된 챌린지
  const filteredChallenges: ChallengeType[] = gathering.captainStatus
    ? (challenges?.inProgressChallenges ?? [])
    : (challenges?.inProgressChallenges?.filter(
        (c: ChallengeType) => c.participantStatus,
      ) ?? []);
  return (
    <>
      {/* 챌린지 헤더 */}
      <div
        className={`mt-[30px] bg-dark-200 py-5 px-6 cursor-pointer ${
          isOpen ? 'rounded-t-[10px]' : 'rounded-[10px]'
        }`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-2 font-semibold">
          <Image
            src="/assets/image/toggle.svg"
            alt="토글"
            width={16}
            height={20}
            className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
          이 모임에서 참여했던 챌린지
        </span>
      </div>

      {/* 챌린지 리스트 */}
      {isOpen && filteredChallenges?.length > 0 && (
        <div className="grid grid-cols-3 gap-[10px] px-8 py-[30px] max-h-[443px] overflow-y-auto bg-dark-200">
          {filteredChallenges.map((challenge) => {
            const status = getStatusInfo(challenge); // 상태 정보 가져오기
            return (
              <div
                key={challenge.challengeId}
                className="bg-dark-300 px-[28px] py-[25px] rounded-lg"
              >
                <div className="flex items-start gap-[17px]">
                  {/* 챌린지 이미지 */}
                  <div className="relative w-[61px] h-[61px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        challenge.imageUrl === 'null' || !challenge.imageUrl
                          ? '/assets/image/default_challenge.png'
                          : challenge.imageUrl
                      }
                      alt={challenge.title}
                      width={61}
                      height={61}
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/assets/image/default_challenge.png';
                      }}
                    />
                  </div>

                  {/* 챌린지 상태 및 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-[13px] mb-[10px]">
                      <span
                        className={`text-sm font-semibold w-[84px] text-center px-[12px] py-[7px] rounded-full ${status.style}`}
                      >
                        {status.text}
                      </span>
                      <div className="flex items-center font-normal gap-2">
                        <Image
                          src="/assets/image/person.svg"
                          alt="참여자 아이콘"
                          width={20}
                          height={20}
                        />
                        <span>
                          {challenge.successParticipantCount}/
                          {challenge.participantCount}
                        </span>
                      </div>
                    </div>

                    {/* 챌린지 제목 및 기간 */}
                    <div>
                      <div className="w-full min-w-0 h-[60px] mb-[10px]">
                        <h4 className="font-semibold break-words">
                          {challenge.title}
                        </h4>
                      </div>
                      <h5 className="text-dark-700 text-sm font-normal">
                        {gathering.gatheringStartDate} ~{' '}
                        {gathering.gatheringEndDate}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
