import Heart from "@/components/common/Heart";
import Null from "@/components/common/Null";
import Popover from "@/components/common/Popover";
import { GatheringItem, GuestbookItem } from "@/types";
import Image from 'next/image';

// components/guestbook/WrittenGuestbooks.tsx
interface WrittenGuestbooksProps {
    guestbooks: GuestbookItem[];
    gatherings: GatheringItem[];
    onEditClick: (guestbook: GuestbookItem) => void;
}

export default function WrittenGuestbooks({
    guestbooks,
    gatherings,
    onEditClick
}: WrittenGuestbooksProps) {
    if (guestbooks.length === 0) {
        return <Null message="아직 작성된 방명록이 없습니다." />;
    }

    return (
        <div className="space-y-6">
            {guestbooks.map((guestbook) => (
                <div
                    key={guestbook.reviewId}
                    className="flex gap-[30px] bg-dark-900 rounded-lg"
                >
                    <div className="relative w-[300px] h-[200px]">
                        <Image
                            src="/assets/image/default_img.png"
                            alt="모임 이미지"
                            width={300}
                            height={200}
                            className="rounded-[20px] object-cover"
                        />
                    </div>

                    <div className="flex-1 py-6 pr-6">
                        <div className="flex justify-between items-start mb-4">
                            <Heart rating={guestbook.rating} />
                            <Popover
                                type="dot"
                                items={[
                                    {
                                        id: 'edit',
                                        label: '수정하기',
                                        onClick: () => onEditClick(guestbook)
                                    },
                                    {
                                        id: 'delete',
                                        label: '삭제하기',
                                        onClick: () => console.log('delete clicked')
                                    }
                                ]}
                            />
                        </div>

                        <p className="mb-4 break-all line-clamp-4">
                            {guestbook.content}
                        </p>

                        <div className="flex items-end justify-between">
                            {(() => {
                                const gathering = gatherings.find(g => g.gatheringId === guestbook.gatheringId);
                                return (
                                    <>
                                        <p className="text-primary font-normal">
                                            {gathering?.gatheringTitle} |
                                            {gathering?.gatheringSi}
                                            {gathering?.gatheringGu}
                                        </p>
                                        <p className="text-dark-700 font-medium">
                                            {gathering?.gatheringStartDate} ~ {gathering?.gatheringEndDate}
                                        </p>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}