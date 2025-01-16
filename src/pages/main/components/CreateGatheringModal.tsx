import Modal from '@/components/dialog/Modal';
import { useState } from 'react';
import Step from './Step';
import ChoiceMainTypeModal from './ChoiceMainTypeModal';

interface CreateGatheringProps {
  setShowModal: () => void;
}

export default function CreateGathering({
  setShowModal,
}: CreateGatheringProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepTitles = [
    '모임에 오신 걸 환영해요! 🎉',
    '모임 정보를 입력해주세요.',
    '챌린지를 선택해주세요.',
    '모임 생성을 완료했어요!',
  ];

  return (
    <Modal title={stepTitles[currentStep]} onClose={setShowModal}>
      {currentStep < 3 && <Step currentStep={currentStep} />}

      {/* 컴포넌트로 대체 예정 */}
      <div className="mt-4">
        {currentStep === 0 && <ChoiceMainTypeModal />}
        {currentStep === 1 && <div>두 번째 단계 내용</div>}
        {currentStep === 2 && <div>세 번째 단계 내용</div>}
        {currentStep === 3 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              모임이 성공적으로 생성되었습니다!
            </h1>
            <p>모임과 관련된 추가 정보를 확인하거나 수정할 수 있습니다.</p>
          </div>
        )}
      </div>

      {/* 버튼 */}
      {currentStep < 3 ? (
        <div className="flex justify-between mt-4">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          >
            이전
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
          >
            다음
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">완료~</div>
      )}
    </Modal>
  );
}
