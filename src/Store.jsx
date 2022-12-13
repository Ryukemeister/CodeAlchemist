import create from "zustand";

const useStore = create((set) => ({
  code: "",
  codeToBeConverted: "",
  codeToBeExplained: "",
  convertedCode: "",
  setConvertedCode: (newValue) =>
    set(() => ({
      convertedCode: newValue,
    })),
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
