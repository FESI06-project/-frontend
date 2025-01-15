interface TextArea {
  name?: string;
  value: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

export default function TextArea({
  name = 'name',
  value,
  placeholder = value,
  handleInputChange,
  handleBlur = () => {},
  className = '',
  rows = 1,
}: TextArea) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      onBlur={handleBlur}
      rows={rows}
      className={`w-full  rounded-[10px] px-[20px] py-[14px] outline outline-1 outline-dark-400 bg-dark-300 focus:outline-1 focus:outline-[#FF7487] ${className}`}
    />
  );
}
