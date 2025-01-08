// // pages/test.tsx
// import StatusTag from '@/components/StatusTag';
// import { GatheringItem } from '@/types';

// // 테스트용 모임 데이터
// const testGatherings: GatheringItem[] = [
//   {
//     gatheringId: 1,
//     gatheringTitle: "아침 러닝 모임",
//     gatheringStatus: "모집중",
//     // ... 다른 필드들
//   },
//   {
//     gatheringId: 2,
//     gatheringTitle: "저녁 헬스 모임",
//     gatheringStatus: "진행중",
//   },
//   {
//     gatheringId: 3,
//     gatheringTitle: "주말 등산 모임",
//     gatheringStatus: "완료",
//   }
// ];

// export default function TestPage() {
//   return (
//     <div className="min-h-screen bg-[#1C1C1C] p-8">
//       <div className="max-w-[1200px] mx-auto">
//         <h1 className="text-white text-2xl mb-8">모임 목록</h1>
        
//         <div className="space-y-4">
//           {testGatherings.map((gathering) => (
//             <div 
//               key={gathering.gatheringId} 
//               className="bg-gray-800 p-4 rounded-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-white">{gathering.gatheringTitle}</h3>
//                 <StatusTag status={gathering.gatheringStatus} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }