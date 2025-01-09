import Image from 'next/image';
export default function Heart({ rating }: { rating: number }) {
  const fill = Math.floor(rating);
  const half = rating % 1;
  return (
    <div id="hearts" className="flex">
      {[...Array(fill)].map((_, index) => (
        <Image
          className="mr-[5px]"
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
    </div>
  );
}
