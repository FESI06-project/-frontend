import Input from '@/components/common/Input';
import React from 'react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  placeholder: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage: string;
}

// 회원가입, 로그인 input 컴포넌트
export default function FormField({
  label,
  type,
  name,
  value,
  placeholder,
  handleInputChange,
  handleBlur,
  hasError = false,
  errorMessage,
}: FormFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <p className="mb-2.5 text-[1rem]">{label}</p>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        className={hasError ? 'mb-3' : ''}
      />
      {hasError && (
        <p className="mt-3 text-[0.875rem] text-error">{errorMessage}</p>
      )}
    </div>
  );
}
