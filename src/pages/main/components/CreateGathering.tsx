import Modal from '@/components/dialog/Modal';
import { useState } from 'react';

interface CreateGatheringProps {
  setShowModal: () => void;
}

export default function CreateGathering({
  setShowModal,
}: CreateGatheringProps) {
  const [step, setStep] = useState(0);

  const stepTitles = [
    '분류 확인', // 0단계 제목
    '세부 정보 입력', // 1단계 제목
    '챌린지 선택', // 2단계 제목
    '모임 생성 완료', // 3단계 제목
  ];

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <div>각 컴포넌트들이 들어와욧</div>;
      case 1:
        return (
          <div>
            <div>각 컴포넌트들이 들어와욧</div>
          </div>
        );
      case 2:
        return (
          <div>
            <div>각 컴포넌트들이 들어와욧</div>
          </div>
        );
      case 3:
        return (
          <div>
            <div>각 컴포넌트들이 들어와욧</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal title={stepTitles[step]} onClose={setShowModal}>
      {renderStepContent()}
      <div className="flex justify-between mt-4">
        <button
          disabled={step === 0}
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
        >
          이전
        </button>
        <button
          disabled={step === 3}
          onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
        >
          다음
        </button>
      </div>
    </Modal>
  );
}
