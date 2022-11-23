import create from "zustand";

const useStore = create((set) => ({
  cousins: ["Rajiv", "Abhishek", "Vaibhav"],
  count: 0,
  incrementCount: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  decrementCount: () =>
    set((state) => ({
      count: state.count - 1,
    })),
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
