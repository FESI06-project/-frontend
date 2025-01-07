import { GuestbookItem } from '@/types';

export default function GatheringGuestbook({
  guestbook,
}: {
  guestbook: Array<GuestbookItem>;
}) {
  return <div>{guestbook[0].content}</div>;
}
