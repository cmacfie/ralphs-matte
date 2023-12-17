const useLocalStorage = () => {
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

  return { getItem, setItem };
};
export default useLocalStorage;
