import Modal from '@/components/dialog/Modal';
import { useState } from 'react';
import Step from './Step';
import Button from '@/components/common/Button';

interface CreateGatheringProps {
  setShowModal: () => void;
}

export default function CreateGathering({
  setShowModal,
}: CreateGatheringProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Modal
      title={currentStep === 3 ? '모임 생성 완료' : '모임 만들기'}
      onClose={setShowModal}
    >
      {/* Step 컴포넌트: 3단계일 때 숨기기 */}
      {currentStep < 3 && <Step currentStep={currentStep} />}

      {/* Step 내용 */}
      <div className="mt-4">
        {currentStep === 0 && <div>첫 번째 단계 내용</div>}
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
        <div className="text-center mt-4">
          <Button name="닫기" handleButtonClick={() => setShowModal(false)} />
        </div>
      )}
    </Modal>
  );
}
