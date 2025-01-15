import { create } from 'zustand';

export enum SelectType {
  DEFAULT = 'default',
  DETAIL_EDIT_MODAL_PLACE_SI = 'detail_edit_modal_place_si',
  DETAIL_EDIT_MODAL_PLACE_GU = 'detail_edit_modal_place_gu',
}
interface SelectStates {
  selectType: SelectType | null;
  open: boolean;
  setSelectType: (selectType: SelectType | null) => void;
  setOpen: (open: boolean) => void;
}

const useSelectStore = create<SelectStates>((set) => ({
  selectType: null,
  open: false,
  setSelectType: (selectType: SelectType | null) =>
    set({ selectType: selectType }),
  setOpen: (open: boolean) => set({ open: open }),
}));

export default useSelectStore;
