import { create } from "zustand";

type TableLayoutState = {
  tableLayout: boolean;
  setToggleLayout: () => void;
};

export const useTableLayout = create<TableLayoutState>((set) => {
  return {
    tableLayout: true,
    setToggleLayout: () =>
      set((state) => ({ tableLayout: !state.tableLayout })),
  };
});
