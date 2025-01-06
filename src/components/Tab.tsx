import type { TabItem } from '@/types/index';

interface TabProps {
  items: TabItem[];
  currentTab: TabItem['id'];  // id 타입을 TabItem에서 참조
  onTabChange: (id: TabItem['id']) => void;  // 여기도 마찬가지
  className?: string;
  rightElement?: React.ReactNode;
}

export default function Tab({
  items,
  currentTab,
  onTabChange,
  className = '',
  rightElement //버튼 만드는 조건 탭바 오른쪽에 버튼 생김
}: TabProps) {
  const handleTabClick = (id: TabItem['id']) => {  // 여기도 수정
    onTabChange(id);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex border-b-[2px] border-dark-400 w-full">
          <div className="flex">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`
                  px-[32px] py-3 text-[1.8rem] font-medium min-w-[140px] border-b-[2px]
                  ${currentTab === item.id
                    ? 'text-primary border-primary -mb-[2px]'
                    : 'text-dark-700 border-dark-700 -mb-[2px]'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
          {rightElement && (
            <div className="flex items-center px-4 ml-auto">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}