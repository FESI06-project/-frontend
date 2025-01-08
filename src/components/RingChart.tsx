interface RingChartProps {
  total: number;
  value: number;
}
export default function RingChart({ total, value }: RingChartProps) {
  const primary = '#FF2140';
  const valuePercentage = (value / total) * 100;
  const conicGradient = `conic-gradient(${primary} ${valuePercentage}%, transparent ${100 - valuePercentage}%)`;

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <div className="absolute w-[14px] h-[14px] rounded-full bg-dark-100 z-30"></div>
        <div className="absolute bg-dark-600 w-5 h-5 rounded-full z-10"></div>
        <div
          className="absolute w-5 h-5 rounded-full z-20"
          style={{ background: conicGradient }}
        ></div>
      </div>
    </div>
  );
}
