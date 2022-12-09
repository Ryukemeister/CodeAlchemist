import create from "zustand";

const useStore = create((set) => ({
  code: "",
  codeToBeConverted: "",
  codeToBeExplained: "",
  setCodeToBeConverted: (newValue) =>
    set(() => ({
      codeToBeConverted: newValue,
    })),
  setCodeToBeExplained: (newValue) =>
    set(() => ({
      codeToBeExplained: newValue,
    })),
}));

export default useStore;
