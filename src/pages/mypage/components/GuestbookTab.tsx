// src/components/mypage/GuestbookTab.tsx
interface GuestbookItem {
    guestbookId: number;
    gatheringId: number;
    gatheringTitle: string;
    content: string;
    rating: number;
    createdAt: string;
  }
  
  interface GuestbookTabProps {
    guestbooks: GuestbookItem[];
  }
  
  export default function GuestbookTab({ guestbooks }: GuestbookTabProps) {
    return (
      <div className="space-y-4">
        {guestbooks.map(guestbook => (
          <div 
            key={guestbook.guestbookId}
            className="p-4 bg-white rounded-lg"
          >
            <h3 className="font-medium mb-2">{guestbook.gatheringTitle}</h3>
            <p className="text-dark-600">{guestbook.content}</p>
            <div className="mt-2 text-sm text-dark-500">
              <span>★ {guestbook.rating}</span>
              <span className="ml-4">{guestbook.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }