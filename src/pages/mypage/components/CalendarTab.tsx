interface CalendarEvent {
  gatheringId: number;
  gatheringTitle: string;
  startDate: string;
  endDate: string;
  isHost: boolean;
}

interface CalendarTabProps {
  events: CalendarEvent[];
}

export default function CalendarTab({ events }: CalendarTabProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      {/* 달력 구현은 추후에 라이브러리 사용하여 구현 */}
      <div className="text-center text-dark-600">
        달력 구현 예정
      </div>
      <div className="mt-4 space-y-2">
        {events.map(event => (
          <div 
            key={event.gatheringId}
            className="flex justify-between items-center p-2 border-b border-dark-300"
          >
            <span>{event.gatheringTitle}</span>
            <span className="text-sm text-dark-500">
              {`${event.startDate} ~ ${event.endDate}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}