import create from "zustand";

const useStore = create((set) => ({
  code: "",
  codeToBeConverted: "",
  codeToBeExplained: "",
  convertedCode: "",
  codeReadyToBeExplained: [],
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
  setCodeReadyToBeExplained: (newValue) =>
    set(() => ({
      codeReadyToBeExplained: newValue,
    })),
}));

export default useStore;
