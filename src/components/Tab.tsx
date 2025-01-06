import type { TabItem } from '@/types/index';

interface TabProps {
  items: TabItem[];
  currentTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  rightElement?: React.ReactNode;
}

export default function Tab({ 
  items, 
  currentTab, 
  onTabChange,
  className = '',
  rightElement //추가 버튼은 이거 넣어서 하시면 됩니다. 안쓰면 버튼 안생겨요.
}: TabProps) {
  const handleTabClick = (id: string) => {
    onTabChange(id);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex border-b-[3px] border-dark-400 w-full">
          <div className="flex">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`
                  px-[32px] py-3 text-[2rem] font-medium min-w-[140px] border-b-[3px]
                  ${currentTab === item.id
                    ? 'text-primary border-primary -mb-[3px]'
                    : 'text-dark-700 border-dark-700 -mb-[3px]'
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