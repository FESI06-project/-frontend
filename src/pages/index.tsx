import ListChallenge from '@/pages/main/components/ListChallenge';

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-8 pt-20">
      <h2 className="text-[1.75rem] font-semibold pb-[30px]">
        지금 핫한 챌린지 🔥
      </h2>
      <div className="overflow-hidden">
        <ListChallenge />
      </div>
    </div>
  );
}
