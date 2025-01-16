import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function ChallengeAddModal() {
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [challengeImageUrl, setChallengeImageUrl] = useState('');

  const handleChallengeTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChallengeTitle(e.target.value);
  };
  const handleChallengeDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChallengeDescription(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (file) {
      setChallengeImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageEditButtonClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageDeleteButtonClick = () => {
    setChallengeImageUrl('');
  };

  return (
    <div>
      {/* 챌린지 정보 */}
      <div id="information">
        <div className="mt-[30px] mb-[10px]">챌린지 정보</div>

        {/* 상단 정보 */}
        <div className="flex gap-[10px]">
          {/* 이미지 첨부 */}
          <div className="relative border-[1px] rounded-[10px] border-dark-500 w-[130px] h-[130px] flex">
            <Image
              className=" border-[1px] rounded-[10px] border-dark-500 "
              src={
                challengeImageUrl &&
                ['https', 'http', 'blob'].indexOf(
                  challengeImageUrl.split(':')[0],
                ) !== -1
                  ? challengeImageUrl
                  : '/assets/image/fitmon.png'
              }
              width={130}
              height={130}
              alt="edit-image"
            />

            <div className="absolute bg-black/80  w-full h-full z-10  border-[1px] rounded-[10px] border-dark-500 " />

            <div className="absolute w-[130px] h-[130px] z-20 flex flex-col justify-center items-center gap-2 hover:cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                id="file-input"
                onChange={(e) => handleImageChange(e)}
              />
              <Image
                src={'/assets/image/gathering_edit.svg'}
                width={45}
                height={45}
                alt="pencil"
                onClick={handleImageEditButtonClick}
              />
              <p
                onClick={handleImageDeleteButtonClick}
                className="text-sm text-dark-700 hover:cursor-pointer"
              >
                {'이미지 삭제'}
              </p>
            </div>
          </div>

          {/* 이름, 설명 입력 */}
          <div className="w-[360px]">
            <Input
              type="text"
              handleInputChange={(e) => handleChallengeTitleChange(e)}
              value={challengeTitle}
              className="outline-dark-500 bg-dark-400  mb-[7px] h-[47px]"
              placeholder="챌린지 이름을 입력해 주세요. (25자 제한)"
            />
            <TextArea
              handleInputChange={(e) => handleChallengeDescriptionChange(e)}
              value={challengeDescription}
              className="h-[76px] flex outline-dark-500 bg-dark-400 leading-[24px] overflow-x-auto resize-none whitespace-pre-wrap break-words "
              placeholder="설명을 입력해 주세요. (50자 제한)"
            />
          </div>
        </div>

        <div className="flex gap-[10px]">
          <div>
            <div className="mt-[30px] mb-[10px]">챌린지 정보</div>
          </div>
        </div>
      </div>
    </div>
  );
}
