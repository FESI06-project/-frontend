interface TagProps {
  tagName: string;
}

interface TagListProps {
  tagList: string[];
}
export function Tag({ tagName }: TagProps) {
  return (
    <div className="px-[20px] py-[10px] bg-dark-200 flex justify-center items-center rounded-full">
      <p className="text-primary text-base font-semibold">{`#${tagName}`}</p>
    </div>
  );
}

export default function TagList({ tagList }: TagListProps) {
  if (!tagList) return;
  return (
    <>
      <div className="flex gap-2">
        {tagList.map((tag, index) => (
          <Tag key={index} tagName={tag} />
        ))}
      </div>
    </>
  );
}
