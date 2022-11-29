import create from "zustand";

const useStore = create((set) => ({
  cousins: ["Rajiv", "Abhishek", "Vaibhav"],
  count: 0,
  teamsData: [],
  playerData: [],
  friends: [],
  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),
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
  removeCousin: (cousinToBeRemoved) =>
    set((state) => ({
      cousins: state.cousins.filter((cousin) => cousin != cousinToBeRemoved),
    })),
  resetCousinValues: () =>
    set(() => ({
      cousins: [],
    })),
}));

export default useStore;
