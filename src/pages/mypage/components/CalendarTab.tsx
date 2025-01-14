import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

interface CalendarEvent {
  gatheringId: number;
  gatheringTitle: string;
  startDate: string;
  endDate: string;
  isHost: boolean;
}

interface CalendarTabProps {
  events?: CalendarEvent[];
}

export default function CalendarTab({ events = [] }: CalendarTabProps) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState('');

  // FullCalendar에서 보여주는 날짜 범위(월) 업데이트
  const updateTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setCurrentTitle(calendarApi.view.title); // 현재 보이는 제목 업데이트
    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev(); // 이전 달로 이동
      setCurrentTitle(calendarApi.view.title); // 제목 업데이트
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next(); // 다음 달로 이동
      setCurrentTitle(calendarApi.view.title); // 제목 업데이트
    }
  };

  useEffect(() => {
    updateTitle(); // 초기 로드 시 제목 업데이트
  }, []);

  const calendarEvents = events.map(event => ({
    id: event.gatheringId.toString(),
    start: new Date(event.startDate).toISOString(),
    end: new Date(event.endDate).toISOString(),
    backgroundColor: event.isHost ? '#FF7487' : '#3D5AFE',
    borderColor: event.isHost ? '#FF7487' : '#3D5AFE',
  }));

  return (
    <div className="bg-dark-300 rounded-lg p-4">
      {/* Custom Header */}
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

      {/* FullCalendar */}
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
        eventContent={() => null}
        dayHeaderClassNames="bg-dark-300 text-white text-center font-medium" // 요일 스타일
        dayHeaderContent={({ date }) => (
          <span>
            {date.toLocaleString('en-US', { weekday: 'short' })}
          </span>
        )}
        dayCellClassNames={({ date, isToday }) =>
          `text-center align-middle h-16 ${
            isToday ? 'bg-primary bg-opacity-20' : ''
          }`
        }
        dayCellContent={({ date }) => (
          <span className="flex items-center justify-center h-full">
            {date.getDate()}
          </span>
        )}
        datesSet={updateTitle} // 날짜가 변경될 때 제목 업데이트
        eventClick={() => {
          alert('캘린더에서 수정은 불가능합니다.');
        }}
      />
    </div>
  );
}
