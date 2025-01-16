import Image from 'next/image';
import { useState } from 'react';
import { LISTPAGE_MAINTYPE } from '@/constants/MainList';

interface ChoiceMainTypeModalProps {
  onSelect: (type: string) => void;
}

export default function ChoiceMainTypeModal({
  onSelect,
}: ChoiceMainTypeModalProps) {
  const [selectedType, setSelectedType] = useState<string>('유산소형');

  // 이미지 매핑
  const images: { [key: string]: string } = {
    유산소형: '/assets/image/cardio.png',
    헬스형: '/assets/image/naerobic.png',
    경기형: '/assets/image/game.png',
  };

  return (
    <div className="flex gap-3">
      {LISTPAGE_MAINTYPE.map((type) => {
        if (type.id === '전체') return null;

        return (
          <div
            key={type.id}
            className={`relative w-40 h-44 rounded-xl text-center py-5 px-2 cursor-pointer border ${
              selectedType === type.id
                ? 'bg-dark-600 border-dark-700'
                : 'bg-dark-400 border-transparent'
            }`}
            onClick={() => {
              setSelectedType(type.id);
              onSelect(type.id);
            }}
          >
            {selectedType === type.id && (
              <div className="absolute top-2 right-2">
                <Image
                  width={16}
                  height={16}
                  src="/assets/image/check.svg"
                  alt="선택됨"
                />
              </div>
            )}
            <Image
              width={45}
              height={72}
              src={images[type.id] || '/assets/image/default.png'}
              alt={`${type.label} 이미지`}
              className="mx-auto"
            />
            <h3 className="font-bold text-lg pt-3.5">{type.label}</h3>
            <p className="text-sm pt-[5px]">
              {type.id === '유산소형' && '달리기, 수영, 자전거, 기타'}
              {type.id === '헬스형' && '헬스, 기타'}
              {type.id === '경기형' && '축구, 배드민턴, 풋살, 기타'}
            </p>
          </div>
        );
      })}
    </div>
  );
}
