interface Input {
  type: string;
  name?: string;
  value: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type,
  name,
  value,
  placeholder,
  handleInputChange,
  handleBlur,
  className = '',
}: Input) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className={`w-full h-16 rounded-[10px] px-5 py-6 outline outline-1 outline-dark-400 bg-dark-300 focus:outline-1 focus:outline-[#FF7487] ${className}`}
    />
  );
}
