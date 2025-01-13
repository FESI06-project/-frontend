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
  hasError: boolean;
  errorMessage: string;
}

export default function FormField({
  label,
  type,
  name,
  value,
  placeholder,
  handleInputChange,
  handleBlur,
  hasError,
  errorMessage,
}: FormFieldProps) {
  return (
    <>
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
    </>
  );
}
