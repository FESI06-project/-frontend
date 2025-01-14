import Image from 'next/image';
import { useState } from 'react';

interface SelectProps {
  items: Array<SelectItem>;
  setSelectedItem: (itemValue: string) => void;
  selectedItem: string;
  className?: string;
  width: string;
  height: string;
}

interface SelectItem {
  value: string;
  label: string;
}
export default function Select({
  items,
  selectedItem,
  setSelectedItem,
  width,
  height,
  className = '',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const handleOptionClick = (value: string) => {
    setOpen(false);
    setSelectedItem(value);
  };
  const currentLabel = items.filter((item) => item.value === selectedItem)[0]
    .label;
  const itemStyle = (value: string) => {
    let style = ` w-[${width}] h-[${height}] relative flex items-center top-full bg-dark-400 rounded-[8px] border-[1px]  px-5`;
    if (value === selectedItem) {
      style += ' border-[#FF7487]';
    } else {
      style += ' border-dark-500';
    }
    return style;
  };
  return (
    <div className={`${className} w-[${width}] h-[${height}] `}>
      <div
        onClick={() => setOpen(!open)}
        className={`w-full h-[${height}] flex items-center justify-between bg-dark-400 rounded-[8px] border-[1px] border-dark-500 px-5  ${className}`}
      >
        <p>{currentLabel}</p>
        <Image
          src={
            open ? '/assets/image/arrow-up.svg' : '/assets/image/arrow-down.svg'
          }
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
      {open && (
        <ul>
          {items.map((item, index) => (
            <li
              className={`w-[${width}] h-[${height}] ${itemStyle(item.value)}`}
              key={index}
              value={item.value}
              onClick={() => handleOptionClick(item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
