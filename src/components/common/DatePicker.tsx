import { getDate, getMonth, getYear } from 'date-fns';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

interface DatePickerCalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  className?: string;
  width?: string;
  height?: string;
}
export default function DatePickerCalendar({
  selectedDate,
  setSelectedDate,
  className,
  width,
  height,
}: DatePickerCalendarProps) {
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i,
  );
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    return (
      <span className="relative bg-dark-500 p-[10px] " title={tooltipText}>
        {getDate(date)}
      </span>
    );
  };
  return (
    <div className={`relative flex items-center ${className}`}>
      <DatePicker
        className={`relative top-full ${className}  items-center bg-dark-400 rounded-[8px] border-[1px] px-5  w-[${width}] h-[${height}]`}
        dateFormat="yyyy-MM-dd"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        shouldCloseOnSelect
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date!)}
        calendarClassName="absolute flex"
        weekDayClassName={() => 'relative flex'}
        dayClassName={() => 'relative flex'}
        renderDayContents={renderDayContents}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            className={`fixed left-0 flex items-center bg-dark-500 w-[${width}] h-[${height}] top-[107%] `}
          >
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <Image
                  src="/assets/image/arrow-left.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </button>
              <div className="flex">
                {' '}
                <span className="bg-dark-500">{MONTHS[getMonth(date)]}</span>
                <select
                  className="bg-transparent select-none"
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(+value)}
                >
                  {YEARS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <Image
                  src="/assets/image/arrow-right.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        )}
      />
      <div className="absolute right-0 flex items-center  px-5">
        <Image
          src="/assets/image/calendar.svg"
          width={20}
          height={20}
          alt="calendar"
          className="flex "
        />
      </div>
    </div>
  );
}
