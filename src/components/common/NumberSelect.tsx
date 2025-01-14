import Image from 'next/image';
import { ChangeEvent } from 'react';

interface NumberSelectProps {
  targetNumber: number;
  setTargetNumber: (targetNumber: number) => void;
  width?: string;
  height?: string;
  className?: string;
}
export default function NumberSelect({
  targetNumber,
  setTargetNumber,
  width,
  height,
  className,
}: NumberSelectProps) {
  return (
    <div
      className={`w-[${width}] h-[${height}] ${className} flex justify-between items-center top-full bg-dark-400 rounded-[8px] border-[1px] border-dark-500 px-5`}
    >
      <input
        className="bg-transparent outline-none w-full"
        value={targetNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTargetNumber(parseInt(e.target.value))
        }
      />
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/image/arrow-up.svg"
          alt="arrow"
          width={16}
          height={16}
          onClick={() => setTargetNumber(targetNumber + 1)}
          className="flex -space-y-[10px]"
        />
        <Image
          src="/assets/image/arrow-down.svg"
          alt="arrow"
          width={16}
          height={16}
          onClick={() => {
            if (targetNumber === 0) return;
            setTargetNumber(targetNumber - 1);
          }}
        />
      </div>
    </div>
  );
}
