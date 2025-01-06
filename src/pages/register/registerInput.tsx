interface Input {
  type: string;
  placeholder?: string;
  className?: string;
}
// input py 23 mb 25

export default function RegisterInput({
  type,
  placeholder,
  className = '',
}: Input) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full h-16 mb-6 rounded-lg px-5 py-6 outline outline-dark-400 bg-dark-300 ${className}`}
    />
  );
}
