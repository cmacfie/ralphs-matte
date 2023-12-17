import { MinMax } from "@/interfaces";

export interface ISettings {
  additionRange: MinMax;
  multiplicationRange: MinMax;
  numberOfProblems: number;
}

const useSettings = () => {
  const defaultSettings: ISettings = {
    additionRange: { min: 1, max: 50 },
    multiplicationRange: { min: 1, max: 10 },
    numberOfProblems: 20,
  };

  const getItem = (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  };
  const setItem = (key: string, object: any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, object);
    }
  };

  const getSettings = (): ISettings => {
    const settings = getItem("settings");
    if (!settings) {
      return defaultSettings;
    }
    return JSON.parse(settings) as ISettings;
  };

  const updateSettings = (newSettings: ISettings) => {
    setItem("settings", JSON.stringify(newSettings));
  };

  return {
    getSettings,
    updateSettings,
  };
};
export default useSettings;
