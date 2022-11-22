import create from "zustand";

const useStore = create((set) => ({
  cousins: ["Rajiv", "Abhishek"],
  bears: ["s"],
  addCousin: (cousin) =>
    set((state) => ({
      cousins: [...state.cousins, cousin],
    })),
  resetCousinValues: () =>
    set(() => ({
      cousins: [],
    })),
}));

export default useStore;
