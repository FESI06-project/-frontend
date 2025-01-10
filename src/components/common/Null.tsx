// NullComponent.tsx
interface NullProps {
  message: string;
}

export default function Null({ message }: NullProps) {
  return (
    <div className="w-full h-[227px] flex-shrink-0 bg-dark-200 rounded-[20px] flex items-center justify-center">
      <span className="text-white font-normal">{message}</span>
    </div>
  );
}