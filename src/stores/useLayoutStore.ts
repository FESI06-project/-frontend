import { create } from 'zustand';

interface LayoutStates {
  isListExpanded: boolean;
  toggleListExpanded: () => void;
}
const useLayoutStore = create<LayoutStates>((set, get) => ({
  isListExpanded: false,
  toggleListExpanded: () => {
    const { isListExpanded } = get();
    set({
      isListExpanded: !isListExpanded,
    });
  },
}));

export default useLayoutStore;
