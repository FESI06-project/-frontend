import Modal from '@/components/dialog/Modal';

interface CreateGatheringProps {
  setShowModal: () => void;
}

export default function CreateGathering({
  setShowModal,
}: CreateGatheringProps) {
  return (
    <Modal title={'모임 만들기 모달입니당'} onClose={setShowModal}>
      테스트
    </Modal>
  );
}
