import Image from 'next/image';
import { useState } from 'react';

interface PopoverProps {
  items: Array<PopoverItem>;
  type: 'setting' | 'dot';
}

interface PopoverItem {
  id: string;
  label: string;
  onClick?: () => void;
}
export default function Popover({ items, type }: PopoverProps) {
  const [showPopover, setShowPopover] = useState(false);
  const itemsStyle = () => {
    let style =
      'flex flex-col absolute mt-[10px] z-10 top-full px-[27px] py-[12px] w-max bg-dark-300 rounded-[10px] gap-[14px]';
    if (showPopover) {
      style += ' flex';
    } else {
      style += ' hidden';
    }
    return style;
  };
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Image
        onClick={() => setShowPopover(!showPopover)}
        src={`/assets/image/${type === 'setting' ? 'setting.svg' : 'three-dots.svg'}`}
        width={type === 'setting' ? 28 : 20}
        height={type === 'setting' ? 28 : 20}
        alt="popover-button"
        className=" hover:cursor-pointer"
      />
      <ul className={itemsStyle()}>
        {items.map((item: PopoverItem, index: number) => (
          <li
            className="text-sm hover:cursor-pointer"
            key={index}
            onClick={item.onClick}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
