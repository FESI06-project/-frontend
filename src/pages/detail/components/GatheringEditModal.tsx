import DatePickerCalendar from '@/components/common/DatePicker';
import Input from '@/components/common/Input';
import NumberSelect from '@/components/common/NumberSelect';
import Select from '@/components/common/Select';
import { GatheringItem } from '@/types';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function GatheringEditModal({
  information,
}: {
  information: GatheringItem;
}) {
  const [title, setTitle] = useState('기존 모임의 이름이 들어와 있습니다.');
  const [description, setDescription] = useState(
    '기존 모임 설명이 들어와 있습니다. 기존 모임 설명이 들어와 있습니다. 기존 모임 설명이 들어와 있습니다. 기존 모임 설명이 들어와 있습니다.',
  );
  const [selectedPlaceSi, setSelectedPlaceSi] = useState('seoul');
  const [selectedPlaceGu, setSelectedPlaceGu] = useState('dongjak');
  const [maxPeopleCount, setMaxPeopleCount] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const placeSiItems = [
    {
      value: 'seoul',
      label: '서울시',
    },
    {
      value: 'busan',
      label: '부산시',
    },
    {
      value: 'daejeon',
      label: '대전시',
    },
  ];
  const placeGuItems = [
    {
      value: 'dongjak',
      label: '동작구',
    },
    {
      value: 'kangsu',
      label: '강서구',
    },
    { value: 'mapo', label: '마포구' },
  ];
  const handleGatheringTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleGatheringDescriptionChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(e.target.value);
  };
  return (
    <div>
      {/* 모임 정보 */}
      <DatePickerCalendar
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        className="w-[245px] h-[47px]"
        width="245px"
        height="47px"
      />
      <div id="information">
        <div className="mt-[30px] mb-[10px]">모임 정보</div>
        <div className="flex gap-[10px]">
          <div className="relative border-[1px] rounded-[10px] border-dark-500 w-[130px] h-[130px] flex">
            <Image
              className=" border-[1px] rounded-[10px] border-dark-500 "
              src="/assets/image/fitmon.png"
              width={130}
              height={130}
              alt="edit-image"
            />

            <div className="absolute bg-black/80  w-full h-full z-10  border-[1px] rounded-[10px] border-dark-500 " />

            <div className="absolute w-[130px] h-[130px] z-20 flex flex-col justify-center items-center gap-2 ">
              <Image
                src="/assets/image/gathering_edit.svg"
                width={45}
                height={45}
                alt="pencil"
              />
              <div className="text-sm text-dark-700">{'이미지 삭제'}</div>
            </div>
          </div>
          <div className="w-[360px]">
            <Input
              handleInputChange={(e) => handleGatheringTitleChange(e)}
              value={title}
              className="outline-dark-500 bg-dark-400  mb-[7px] h-[47px]"
            />
            <Input
              handleInputChange={(e) => handleGatheringDescriptionChange(e)}
              value={description}
              className="flex h-[76px] outline-dark-500 bg-dark-400 overflow-x-visible"
            />
          </div>
        </div>
      </div>

      {/* 모임 태그 */}
      <div id="tags">
        <div className="mt-[20px] mb-[10px]">모임 태그</div>
        <div className="h-[47px] bg-dark-400 border-dark-500 rounded-[8px] flex items-center gap-[10px] px-5">
          {information.gatheringTags.map((tag, index) => (
            <div
              className="h-[30px] flex items-center justify-center py-[7px] px-[10px] bg-dark-200 rounded-[10px] gap-2"
              key={index}
            >
              <p className=" text-primary text-sm">{`#${tag}`}</p>
              <button>
                <Image
                  src="/assets/image/cancel-tag.svg"
                  width={11}
                  height={11}
                  alt="tag-delete-button"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 장소 및 최대 인원 */}
      <div className="flex gap-[10px]">
        <div id="place">
          <div className="mt-[20px] mb-[10px]">장소</div>
          <div className="flex">
            <Select
              items={placeSiItems}
              selectedItem={selectedPlaceSi}
              setSelectedItem={setSelectedPlaceSi}
              height="47px"
              className="mr-[10px] w-[175px]"
            />
            <Select
              items={placeGuItems}
              selectedItem={selectedPlaceGu}
              setSelectedItem={setSelectedPlaceGu}
              width="175px"
              height="47px"
            />
          </div>
        </div>

        <div id="max-people-count">
          <div className="mt-[20px] mb-[10px]">최대인원</div>
          <NumberSelect
            width="130px"
            height="47px"
            targetNumber={maxPeopleCount}
            setTargetNumber={setMaxPeopleCount}
          />
        </div>
      </div>

      <div className="flex gap-[10px]">
        <div>
          <div className="mt-[20px] mb-[10px]">시작 날짜</div>
        </div>

        <div>
          <div className="mt-[20px] mb-[10px]">시작 날짜</div>
        </div>
      </div>
    </div>
  );
}
