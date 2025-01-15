interface StepProps {
  currentStep: number; // 현재 활성화된 단계 (0부터 시작)
}

export default function Step({ currentStep }: StepProps) {
  const steps = ['분류 확인', '세부 정보', '챌린지 선택']; // 각 단계 이름
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* 단계 아이콘 */}
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full ${
              currentStep > index
                ? 'bg-red-500 text-white' // 완료된 단계
                : currentStep === index
                  ? 'bg-white border-2 border-red-500 text-red-500' // 현재 단계
                  : 'bg-gray-400 text-white' // 비활성화 단계
            }`}
          >
            {currentStep > index ? '✔' : index + 1}
          </div>

          {/* 단계 이름 */}
          <span
            className={`ml-2 ${
              currentStep >= index ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {step}
          </span>

          {/* 진행선 */}
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-[2px] ${
                currentStep > index ? 'bg-red-500' : 'bg-gray-400'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
