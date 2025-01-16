import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// 캘린더 이벤트의 타입을 정의합니다.
interface CalendarEvent {
  gatheringId: number; // 모임 ID
  gatheringTitle: string; // 모임 제목
  startDate: string; // 시작 날짜
  endDate: string; // 종료 날짜
  isHost: boolean; // 사용자가 호스트인지 여부
  gatheringMainType: string; // 모임 메인 타입 (유산소형, 경기형, 근력형 등)
}

interface CalendarTabProps {
  events?: CalendarEvent[]; // 전달받는 이벤트 리스트
}

export default function CalendarTab({ events = [] }: CalendarTabProps) {
  const calendarRef = useRef<FullCalendar | null>(null); // FullCalendar의 레퍼런스를 저장합니다.
  const [currentTitle, setCurrentTitle] = useState(''); // 현재 캘린더의 타이틀 (월/년도 등)을 저장합니다.

  // 캘린더 타이틀을 업데이트하는 함수입니다.
  const updateTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi(); // FullCalendar의 API를 가져옵니다.
      setCurrentTitle(calendarApi.view.title); // 타이틀을 업데이트합니다.
    }
  };

  // 이전 달로 이동하는 함수입니다.
  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev(); // 이전 달로 이동
      setCurrentTitle(calendarApi.view.title); // 타이틀 업데이트
    }
  };

  // 다음 달로 이동하는 함수입니다.
  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next(); // 다음 달로 이동
      setCurrentTitle(calendarApi.view.title); // 타이틀 업데이트
    }
  };

  // 컴포넌트가 처음 렌더링될 때 타이틀을 설정합니다.
  useEffect(() => {
    updateTitle();
  }, []);

  // 모임 타입에 따라 배경색을 설정하는 함수입니다.
  const getEventColor = (type: string) => {
    switch (type) {
      case '유산소형':
        return '#faf4b1'; // 노란색 배경
      case '경기형':
        return '#4e7868'; // 녹색 배경
      case '근력형':
        return '#604163'; // 보라색 배경
      default:
        return '#5779b3'; // 기본 파란색 배경
    }
  };

  // 이벤트 데이터를 FullCalendar에 맞게 변환합니다.
  const calendarEvents = events.map(event => ({
    id: event.gatheringId.toString(), // 이벤트 ID
    start: new Date(event.startDate).toISOString(), // 시작 날짜 (ISO 형식)
    end: new Date(event.endDate).toISOString(), // 종료 날짜 (ISO 형식)
    title: event.gatheringTitle, // 이벤트 제목
    backgroundColor: getEventColor(event.gatheringMainType), // 배경색
    borderColor: getEventColor(event.gatheringMainType), // 테두리색
    textColor: event.gatheringMainType === '유산소형' ? '#000000' : '#FFFFFF', // 텍스트 색상 (유산소형은 검정, 그 외는 흰색)
    extendedProps: {
      isHost: event.isHost, // 호스트 여부
      type: event.gatheringMainType, // 모임 타입
    }
  }));

  return (
    <div className="bg-dark-300 rounded-lg p-4">
      {/* 캘린더 상단 네비게이션 */}
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

      {/* FullCalendar 렌더링 */}
      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]} // FullCalendar 플러그인 설정
          initialView="dayGridMonth" // 초기 뷰 설정 (월간 보기)
          events={calendarEvents} // 변환된 이벤트 데이터
          locale="en" // 로케일 설정
          height="auto" // 캘린더 높이 자동 조정
          editable={false} // 이벤트 수정 불가
          selectable={false} // 날짜 선택 비활성화
          headerToolbar={false} // 기본 헤더 툴바 비활성화
          eventContent={({ event }) => (
            <div className="flex items-center justify-center gap-1 px-1 py-0.5 rounded text-xs" style={{ color: event.textColor }}>
              {event.extendedProps.isHost && (
                <img src="/assets/image/crown.svg" alt="host" className="w-3 h-3" />
              )}
              <span>{event.title}</span>
            </div>
          )}
          dayHeaderClassNames="bg-dark-300 text-white text-base font-medium py-4" // 요일 헤더 스타일
          dayHeaderContent={({ date }) => (
            <span className="flex justify-center">
              {date.toLocaleString('en-US', { weekday: 'short' })} {/* 요일 표시 */}
            </span>
          )}
          dayCellClassNames={({ isToday }) => 
            `calendar-cell ${isToday ? 'today' : ''}` // 오늘 날짜 강조
          }
          dayCellContent={({ date }) => (
            <div className="flex items-center justify-center h-8">
              <span className="w-6 h-6 flex items-center justify-center">
                {date.getDate()} {/* 날짜 표시 */}
              </span>
            </div>
          )}
          datesSet={updateTitle} // 캘린더 날짜가 변경될 때 타이틀 업데이트
          eventClick={() => {
            alert('Calendar modification is not available.'); // 이벤트 클릭 시 알림
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
          background-color: rgba(255, 33, 64) !important; // 오늘 날짜 배경 강조
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
