import Image from 'next/image';

interface ChoiceMainTypeModalProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function ChoiceMainTypeModal({
  selectedType,
  onSelect,
}: ChoiceMainTypeModalProps) {
  const images = {
    유산소형: '/assets/image/cardio.png',
    헬스형: '/assets/image/naerobic.png',
    경기형: '/assets/image/game.png',
  };

  const descriptions = {
    유산소형: '달리기, 수영, 자전거, 기타',
    헬스형: '헬스, 기타',
    경기형: '축구, 배드민턴, 풋살, 기타',
  };

  const types = ['유산소형', '헬스형', '경기형'];

  return (
    <div className="flex gap-3">
      {types.map((type) => (
        <div
          key={type}
          className={`relative w-40 h-44 rounded-xl text-center py-5 px-2 cursor-pointer border ${
            selectedType === type
              ? 'bg-dark-600 border-dark-700'
              : 'bg-dark-400 border-transparent'
          }`}
          onClick={() => onSelect(type)}
        >
          {/* 체크 아이콘 */}
          {selectedType === type && (
            <div className="absolute top-2 right-2">
              <Image
                src="/assets/image/check.svg"
                width={20}
                height={20}
                alt="선택됨"
              />
            </div>
          )}

          {/* 이미지 */}
          <Image
            width={45}
            height={72}
            src={images[type]}
            alt={`${type} 이미지`}
            className="mx-auto"
          />

          {/* 제목 */}
          <h3 className="font-bold text-lg pt-3.5">{type}</h3>

          {/* 설명 */}
          <p className="text-sm pt-[5px]">{descriptions[type]}</p>
        </div>
      ))}
    </div>
  );
}
