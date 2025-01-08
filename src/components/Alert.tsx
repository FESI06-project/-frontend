import React from 'react';

export interface AlertProps {
  isOpen: boolean;
  type: 'select' | 'confirm'; // 알림 유형: 'select'는 취소/확인 버튼, 'confirm'은 확인 버튼만
  message: string; // 알림 메시지
  onConfirm: () => void; // 확인 버튼 동작
  onCancel?: () => void; // 취소 버튼 동작 (선택 사항)
}

export default function Alert({
  isOpen,
  type = 'confirm',
  message,
  onConfirm,
  onCancel,
}: AlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="h-[178px] w-[380px] rounded-2xl bg-dark-300 px-[30px] py-[35px] flex flex-col justify-between items-center">
        {/* 메시지 */}
        <p className="text-center text-lg text-white">
          {message}
        </p>

        {/* 버튼 영역 */}
        <div
          className={`w-full flex ${
            type === 'select' ? 'justify-between' : 'justify-center'
          } gap-3`}
        >
          {type === 'select' && (
            <button
              onClick={onCancel}
              className="w-[156px] h-[48px] rounded-lg bg-dark-700 text-white text-lg"
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className="w-[156px] h-[48px] rounded-lg bg-primary text-white text-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

// 사용방법 
//     const [showConfirmAlert, setShowConfirmAlert] = useState(false);
//     const [showSelectAlert, setShowSelectAlert] = useState(false);
    
//     const handleConfirm = () => {
//       setShowConfirmAlert(false);
//       setShowSelectAlert(false);
//       console.log('Confirmed!');
//     };
    
//     const handleCancel = () => {
//       setShowSelectAlert(false);
//       console.log('Cancelled!');
//     };

//     return (
//           <div className="space-y-2">
//             <h2 className="text-lg font-semibold">Select Alert</h2>
//             <button
//               onClick={() => setShowSelectAlert(true)}
//               className="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
//             >
//               Select Alert 열기
//             </button>
//           </div>
//           <Alert
//             isOpen={showSelectAlert}
//             type="select"
//             message="선택 Alert 입니다 선택해주세요."
//             onConfirm={handleConfirm}
//             onCancel={handleCancel}
//           />
//     );
