import create from "zustand";

const useStore = create((set) => ({
  bears: ["Jake"],
  addBear: (bear) =>
    set((state) => ({
      bears: [...state.bears, bear],
    })),
}));

export default useStore;
