import { useEffect, useState } from 'react';
import GatheringInformation from './components/GatheringInformation';
import GatheringChallenge from './components/GatheringChallenge';
import GatheringGuestbook from './components/GatheringGuestbook';
import GatheringState from './components/GatheringState';
import Tab from '@/components/common/Tab';
import Modal from '@/components/dialog/Modal';
import ChallengeAddModal from './components/ChallengeAddModal';
import useGatheringStore from '@/stores/useGatheringStore';
import { usePathname } from 'next/navigation';
// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// import axiosInstance, { baseURL } from '@/utils/axios';

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const { gatheringId } = context.params as { gatheringId: string };
//   const apiEndpoint = '/api/v1/gatherings/' + gatheringId;
//   let { cookie } = context.req.headers;
//   cookie = cookie ? cookie : '';
//   axiosInstance.defaults.headers.Cookie = cookie;

//   try {
//     const gathering = await axiosInstance.get<GatheringDetail>(apiEndpoint);

//     return {
//       props: { gathering },
//     };
//   } catch (error) {
//     throw error;
//   } finally {
//     /**
//      * "axios"에 등록한 특정 유저의 쿠키 제거
//      * ( 브라우저에서의 요청이 아니라 서버에서의 요청이므로 다른 유저도 같은 서버를 사용하기에 쿠키가 공유되는 문제가 생김 )
//      */
//     axiosInstance.defaults.headers.Cookie = '';
//   }
// };
export default function GatheringDetail() {
  const { fetchGathering, gathering } = useGatheringStore();
  const pathname = usePathname();
  const gatheringId = parseInt(pathname.charAt(pathname.length - 1));
  useEffect(() => {
    fetchGathering(gatheringId);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const gatheringTabItems = [
    {
      id: 'challenge',
      label: '챌린지',
    },
    {
      id: 'guestbook',
      label: '방명록',
    },
  ];
  const [currentTab, setCurrentTab] = useState('challenge');

  const handleChallengeAddButtonClick = () => {
    setShowModal(true);
  };

  if (!gathering) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[1200px] flex flex-col place-self-center ">
      <GatheringInformation gathering={gathering} />
      <GatheringState gatheringId={gatheringId} />
      <div className="flex mt-[50px] w-full h-[49px] relative items-center justify-center">
        <Tab
          items={gatheringTabItems}
          currentTab={currentTab}
          onTabChange={(newTab) => setCurrentTab(newTab)}
          className="w-full absolute flex text-lg font-bold z-10"
        />
        {gathering.captainStatus && (
          <div className="w-full absolute flex justify-between z-20">
            <div></div>
            <button
              onClick={() => handleChallengeAddButtonClick()}
              className="text-lg hover:cursor-pointer"
            >
              {'+ 챌린지 추가하기'}
            </button>
          </div>
        )}
      </div>
      {/* 모달 */}
      {showModal && (
        <Modal
          title="챌린지 정보를 입력해주세요."
          onClose={() => setShowModal(false)}
        >
          <ChallengeAddModal onClose={() => setShowModal(false)} />
        </Modal>
      )}

      {currentTab === 'challenge' ? (
        <GatheringChallenge
          gatheringId={gatheringId}
          captainStatus={gathering.captainStatus ?? false}
        />
      ) : (
        <GatheringGuestbook
          gatheringId={gatheringId}
          gatheringGuestbookCount={gathering.guestBookCount}
        />
      )}
    </div>
  );
}
