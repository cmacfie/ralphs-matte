import { MinMax } from "@/interfaces";
import useLocalStorage from "@/hooks/use-local-storage";

export interface ISettings {
  additionRange: MinMax;
  multiplicationRange: MinMax;
  numberOfProblems: number;
}

const useSettings = () => {
  const { getItem, setItem } = useLocalStorage();
  const defaultSettings: ISettings = {
    additionRange: { min: 1, max: 25 },
    multiplicationRange: { min: 1, max: 10 },
    numberOfProblems: 20,
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
