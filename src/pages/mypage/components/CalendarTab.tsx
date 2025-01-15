import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// 캘린더 이벤트의 타입을 정의합니다.
interface CalendarEvent {
  gatheringId: number;
  gatheringTitle: string;
  startDate: string;
  endDate: string;
  isHost: boolean;
  gatheringMainType: string; // 모임 메인 타입 추가
}

interface CalendarTabProps {
  events?: CalendarEvent[];
}

export default function CalendarTab({ events = [] }: CalendarTabProps) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState('');

  const updateTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setCurrentTitle(calendarApi.view.title);
    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentTitle(calendarApi.view.title);
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentTitle(calendarApi.view.title);
    }
  };

  useEffect(() => {
    updateTitle();
  }, []);

  // 모임 타입에 따른 배경색 설정
  const getEventColor = (type: string) => {
    switch (type) {
      case '유산소형':
        return '#FF7487'; // 핑크
      case '경기형':
        return '#4e7868'; // 파랑
      case '근력형':
        return '#604163'; // 노랑
      default:
        return '#3D5AFE';
    }
  };

  const calendarEvents = events.map(event => ({
    id: event.gatheringId.toString(),
    start: new Date(event.startDate).toISOString(),
    end: new Date(event.endDate).toISOString(),
    title: event.gatheringTitle,
    backgroundColor: getEventColor(event.gatheringMainType),
    borderColor: getEventColor(event.gatheringMainType),
    extendedProps: {
      isHost: event.isHost,
      type: event.gatheringMainType
    }
  }));

  return (
    <div className="bg-dark-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrev} className="p-2">
          <img src="/assets/image/toggle.svg" alt="prev" className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-white text-lg font-bold">
          {currentTitle}
        </h2>
        <button onClick={handleNext} className="p-2">
          <img src="/assets/image/toggle.svg" alt="next" className="w-6 h-6" />
        </button>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          locale="en"
          height="auto"
          editable={false}
          selectable={false}
          headerToolbar={false}
          eventContent={({ event }) => (
            <div className="flex items-center gap-1 px-1 py-0.5 rounded text-xs text-white">
              {event.extendedProps.isHost && (
                <img src="/assets/image/crown.svg" alt="host" className="w-3 h-3" />
              )}
              <span>{event.title}</span>
            </div>
          )}
          dayHeaderClassNames="bg-dark-300 text-white text-base font-medium py-4"
          dayHeaderContent={({ date }) => (
            <span className="flex justify-center">
              {date.toLocaleString('en-US', { weekday: 'short' })}
            </span>
          )}
          dayCellClassNames={({ isToday }) => 
            `calendar-cell ${isToday ? 'today' : ''}`
          }
          dayCellContent={({ date }) => (
            <div className="flex items-center justify-center h-8">
              <span className="w-6 h-6 flex items-center justify-center">
                {date.getDate()}
              </span>
            </div>
          )}
          datesSet={updateTitle}
          eventClick={() => {
            alert('Calendar modification is not available.');
          }}
        />
      </div>

      <style>{`
        .calendar-wrapper .fc-theme-standard td,
        .calendar-wrapper .fc-theme-standard th {
          border: none;
        }
        
        .calendar-wrapper .fc-theme-standard .fc-scrollgrid {
          border: none;
        }

        .calendar-cell {
          background-color: transparent;
          min-height: 64px;
        }

        .fc-daygrid-day.fc-day-today {
          background-color: rgba(255, 33, 64) !important;
        }

        .fc .fc-daygrid-day-top {
          justify-content: center;
        }

        .fc-direction-ltr .fc-daygrid-event.fc-event-end {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
}