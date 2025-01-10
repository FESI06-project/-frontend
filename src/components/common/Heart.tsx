import Image from 'next/image';
export default function Heart({ rating }: { rating: number }) {
  const fill = Math.floor(rating);
  const half = rating % 1;
  const emptyCount = 5 - fill - (half > 0 ? 1 : 0);
  return (
    <div id="hearts" className="flex gap-[5px]">
      {[...Array(fill)].map((_, index) => (
        <Image
          src="/assets/image/heart-fill.svg"
          alt="heart"
          width={22}
          height={22}
          key={index}
        />
      ))}
      {half > 0 && (
        <Image
          src="/assets/image/heart-half.svg"
          alt="heart"
          width={22}
          height={22}
        />
      )}
      {[...Array(emptyCount)].map((_, index) => (
        <Image
          className="mr-[5px]"
          src="/assets/image/heart-empty.svg"
          alt="heart"
          width={22}
          height={22}
          key={index}
        />
      ))}
    </div>
  );
}
