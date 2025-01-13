import React from 'react';

interface ModalInputProps {
  type: 'title' | 'description'; // 입력 타입 (제목: 25자 제한, 설명: 50자 제한)
  placeholder: string; // 플레이스홀더 텍스트
  value: string; // 입력 값
  onChange: (value: string) => void; // 값 변경 핸들러
  defaultValue?: string; // 기본 값 (수정 시 기존 데이터)
  className?: string; // 추가 스타일링을 위한 클래스
}

const ModalInput: React.FC<ModalInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  defaultValue = '',
  className = '',
}) => {
  // 타입에 따른 최대 글자 수 설정
  const maxLength = type === 'title' ? 25 : 50;

  // 초기 마운트 시 기본값 설정
  React.useEffect(() => {
    if (defaultValue && !value) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value || defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-dark-400 text-white rounded-lg 
                  placeholder-gray-400 focus:outline-none focus:ring-2 
                  focus:ring-primary transition-all"
      />
    </div>
  );
};

export default ModalInput;