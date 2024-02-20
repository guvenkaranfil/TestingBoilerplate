import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const set = (
  key: string,
  value: string | number | boolean | Uint8Array,
) => {
  storage.set(key, value);
};

export const get = (key: string) => {
  return storage.getString(key);
};
