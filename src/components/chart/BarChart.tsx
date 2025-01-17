interface BarChartProps {
  total: number;
  value: number;
}
export default function BarChart({ total, value }: BarChartProps) {
  const valuePercentage = (value / total) * 100;
  const valueBarWidth = `${valuePercentage}%`;
  return (
    <div className="relative w-full">
      <div
        style={{ width: valueBarWidth }}
        className="absolute bg-primary z-20 h-[2px]"
      />
      <div className="absolute bg-dark-400 w-full z-10 h-[2px]" />
    </div>
  );
}
