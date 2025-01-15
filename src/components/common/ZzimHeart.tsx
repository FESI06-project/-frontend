import Image from 'next/image';
import { useState } from 'react';

export default function ZzimHeart({ valid = false }) {
  const [isClicked, setIsClicked] = useState(valid);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    e.preventDefault(); // 부모의 기본 동작 방지 (링크 이동)
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center z-20">
      {isClicked ? (
        <Image
          src="/assets/image/heart-fill.svg"
          alt="heart"
          width={22}
          height={22}
          onClick={handleClick} // 클릭 시 별점 업데이트
          className="mt-0.5 z-30 cursor-pointer"
        />
      ) : (
        <Image
          src="/assets/image/heart-empty.svg"
          alt="heart"
          width={22}
          height={22}
          onClick={handleClick} // 클릭 시 별점 업데이트
          className="mt-0.5 z-30 cursor-pointer"
        />
      )}
    </div>
  );
}
