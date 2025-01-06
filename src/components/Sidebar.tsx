import useLayoutStore from '@/stores/useLayoutStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SideBar() {
  const { isListExpanded } = useLayoutStore();
  return (
    <>
      {isListExpanded && (
        <div className="fixed flex flex-col top-0 left-0 px-5 h-screen bg-dark-200 z-50">
          <Image
            src="/assets/image/close.svg"
            alt="close"
            width={24}
            height={24}
            className="mt-6 mb-9"
          />
          <Link href="/" className="text-red-500 font-bold text-2xl mb-[30px]">
            FitMon
          </Link>
        </div>
      )}
    </>
  );
}
