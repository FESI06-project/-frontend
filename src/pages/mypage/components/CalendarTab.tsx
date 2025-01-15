// React와 필요한 훅 및 라이브러리를 가져옵니다.
import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// 캘린더 이벤트의 타입을 정의합니다.
interface CalendarEvent {
  gatheringId: number; // 이벤트 ID
  gatheringTitle: string; // 이벤트 제목
  startDate: string; // 시작 날짜
  endDate: string; // 종료 날짜
  isHost: boolean; // 호스트 여부를 나타내는 플래그
}

// 컴포넌트의 Props 타입을 정의합니다.
interface CalendarTabProps {
  events?: CalendarEvent[]; // 캘린더 이벤트 배열 (옵션 값)
}

// CalendarTab 컴포넌트를 정의합니다.
export default function CalendarTab({ events = [] }: CalendarTabProps) {
  // 캘린더 인스턴스를 참조하기 위한 useRef 훅
  const calendarRef = useRef<FullCalendar | null>(null);

  // 현재 캘린더 타이틀(월 이름 등)을 저장하기 위한 상태
  const [currentTitle, setCurrentTitle] = useState('');

  // 캘린더의 제목을 업데이트하는 함수
  const updateTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi(); // FullCalendar API를 가져옵니다.
      setCurrentTitle(calendarApi.view.title); // 현재 보이는 뷰의 타이틀을 설정합니다.
    }
  };

  // 이전 버튼 클릭 시 호출되는 함수
  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev(); // 이전 달로 이동
      setCurrentTitle(calendarApi.view.title); // 제목 업데이트
    }
  };

  // 다음 버튼 클릭 시 호출되는 함수
  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next(); // 다음 달로 이동
      setCurrentTitle(calendarApi.view.title); // 제목 업데이트
    }
  };

  // 컴포넌트가 처음 렌더링될 때 제목을 초기화합니다.
  useEffect(() => {
    updateTitle();
  }, []);

  // 이벤트 데이터를 FullCalendar에서 사용할 수 있는 형식으로 변환합니다.
  const calendarEvents = events.map(event => ({
    id: event.gatheringId.toString(), // 이벤트 ID를 문자열로 변환
    start: new Date(event.startDate).toISOString(), // 시작 날짜를 ISO 형식으로 변환
    end: new Date(event.endDate).toISOString(), // 종료 날짜를 ISO 형식으로 변환
    backgroundColor: event.isHost ? '#FF7487' : '#3D5AFE', // 호스트 여부에 따라 배경색 설정
    borderColor: event.isHost ? '#FF7487' : '#3D5AFE', // 호스트 여부에 따라 테두리 색 설정
  }));

  return (
    <div className="bg-dark-300 rounded-lg p-4"> {/* 캘린더 컨테이너 */}
      <div className="flex items-center justify-between mb-4"> {/* 상단 컨트롤 영역 */}
        <button onClick={handlePrev} className="p-2"> {/* 이전 버튼 */}
          <img src="/assets/image/toggle.svg" alt="prev" className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-white text-lg font-bold"> {/* 현재 캘린더 제목 */}
          {currentTitle}
        </h2>
        <button onClick={handleNext} className="p-2"> {/* 다음 버튼 */}
          <img src="/assets/image/toggle.svg" alt="next" className="w-6 h-6" />
        </button>
      </div>

      <div className="calendar-wrapper"> {/* FullCalendar를 렌더링할 영역 */}
        <FullCalendar
          ref={calendarRef} // FullCalendar 인스턴스 참조
          plugins={[dayGridPlugin]} // 플러그인 추가 (dayGrid 플러그인 사용)
          initialView="dayGridMonth" // 초기 뷰 설정 (월간 달력)
          events={calendarEvents} // 변환된 이벤트 데이터 전달
          locale="en" // 로케일 설정
          height="auto" // 높이를 자동으로 설정
          editable={false} // 이벤트 편집 비활성화
          selectable={false} // 셀 선택 비활성화
          headerToolbar={false} // 기본 헤더 비활성화
          eventContent={() => null} // 기본 이벤트 콘텐츠를 렌더링하지 않음
          dayHeaderClassNames="bg-dark-300 text-white text-base font-medium py-4" // 요일 헤더 스타일
          dayHeaderContent={({ date }) => ( // 요일 헤더 콘텐츠 정의
            <span className="flex justify-center">
              {date.toLocaleString('en-US', { weekday: 'short' })} {/* 요일 이름 */}
            </span>
          )}
          dayCellClassNames={({ isToday, date }) =>  // 날짜 셀 클래스 설정
            `calendar-cell ${isToday ? 'today' : ''}`
          }
          dayCellContent={({ date }) => ( // 날짜 셀 콘텐츠 정의
            <div className="flex items-center justify-center h-10">
              <span className="w-6 h-6 flex items-center justify-center">
                {date.getDate()} {/* 날짜 숫자 */}
              </span>
            </div>
          )}
          datesSet={updateTitle} // 날짜가 변경될 때 제목 업데이트
          eventClick={() => { // 이벤트 클릭 시 알림
            alert('Calendar modification is not available.');
          }}
        />
      </div>

      {/* 캘린더 스타일 정의 */}
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
    background-color: rgba(255, 33, 64) !important; /* 오늘 날짜 셀 배경색 */
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
