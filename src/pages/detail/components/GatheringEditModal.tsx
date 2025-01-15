import Button from '@/components/common/Button';
import DatePickerCalendar from '@/components/common/DatePicker';
import Input from '@/components/common/Input';
import NumberSelect from '@/components/common/NumberSelect';
import Select from '@/components/common/Select';
import { SelectType } from '@/stores/useSelectStore';
import { GatheringItem } from '@/types';
import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export default function GatheringEditModal({
  information,
}: {
  information: GatheringItem;
}) {
  const [title, setTitle] = useState(information.gatheringTitle);
  const [description, setDescription] = useState(
    information.gatheringDescription,
  );
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<Array<string>>(information.gatheringTags);
  const [imageUrl, setImageUrl] = useState(information.gatheringImage);
  const [selectedPlaceSi, setSelectedPlaceSi] = useState('seoul');
  const [selectedPlaceGu, setSelectedPlaceGu] = useState('dongjak');
  const [maxPeopleCount, setMaxPeopleCount] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(
      information.gatheringStartDate.split('-').map((str) => parseInt(str))[0],
      information.gatheringStartDate.split('-').map((str) => parseInt(str))[1],
      information.gatheringStartDate.split('-').map((str) => parseInt(str))[2],
    ),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(
      information.gatheringEndDate.split('-').map((str) => parseInt(str))[0],
      information.gatheringEndDate.split('-').map((str) => parseInt(str))[1],
      information.gatheringEndDate.split('-').map((str) => parseInt(str))[2],
    ),
  );
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

  const handleTagDeleteButtonClick = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleNewTagOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 6) {
      alert('태그는 최대 5글자까지 추가 가능합니다.');
      return;
    }
    setNewTag(e.target.value);
  };

  const handleEnterKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      console.log(tags.length, newTag);
      if (tags.length === 3) {
        alert('태그는 최대 3개까지 추가 가능합니다.');
        setNewTag('');
        return;
      }
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  const handleEditButtonClick = () => {
    const editedInformation = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      startDate: startDate,
      endDate: endDate,
      mainLocation: '서울시',
      subLocation: '송파구',
      tags: tags,
    };
    console.log(editedInformation);
  };
  return (
    <div>
      {/* 모임 정보 */}

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
        <div className="relative">
          <div className="  h-[47px] bg-dark-400 border-dark-500 rounded-[8px] flex items-center gap-[10px] px-5 ">
            {tags.map((tag, index) => (
              <div
                className=" h-[30px] w-[121px] flex items-center justify-center py-[7px] px-[10px] bg-dark-200 rounded-[10px] gap-2 z-10"
                key={index}
              >
                <p className=" text-primary text-sm">{`#${tag}`}</p>
                <button onClick={() => handleTagDeleteButtonClick(tag)}>
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
          <input
            className={`absolute w-full bg-transparent top-0 h-[47px] outline-none`}
            style={{
              paddingLeft: `${tags.length * 121 + 30 + (tags.length - 1) * 10}px`,
            }}
            value={newTag}
            onChange={(e) => handleNewTagOnChange(e)}
            onKeyDown={(e) => handleEnterKeyDown(e)}
          />
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
              width="175px"
              height="47px"
              className="mr-[10px] w-[175px]"
              currentSelectType={SelectType.DETAIL_EDIT_MODAL_PLACE_SI}
            />
            <Select
              items={placeGuItems}
              selectedItem={selectedPlaceGu}
              setSelectedItem={setSelectedPlaceGu}
              width="175px"
              height="47px"
              currentSelectType={SelectType.DETAIL_EDIT_MODAL_PLACE_GU}
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
          <DatePickerCalendar
            selectedDate={startDate}
            setSelectedDate={setStartDate}
            className="w-[245px] h-[47px]"
            width="245px"
            height="47px"
          />
        </div>

        <div>
          <div className="mt-[20px] mb-[10px]">마감 날짜</div>
          <DatePickerCalendar
            selectedDate={endDate}
            setSelectedDate={setEndDate}
            className="w-[245px] h-[47px]"
            width="245px"
            height="47px"
            minDate={startDate!}
          />
        </div>
      </div>

      <Button
        handleButtonClick={handleEditButtonClick}
        name="확인"
        className="h-[52px] mt-[30px]"
      />
    </div>
  );
}
