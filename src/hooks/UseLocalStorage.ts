import { Dispatch, SetStateAction, useState } from "react";

export type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  ignoreStorageValue?: boolean
): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (ignoreStorageValue === true) {
      if (typeof initialValue !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item && typeof initialValue !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      if (typeof initialValue !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
