type KeyType = string;
type ValueType = string;
type ItemType = { value: string; expiry: Date };

export const setItem = (key: KeyType, value: ValueType) => {
  const now = new Date();
  const item = { value, expiry: now.getTime() + 1200000 };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key: KeyType): ValueType => {
  const item = validItem(key);
  if (item) return item.value;
  return '';
};

export const validItem = (key: KeyType): ItemType | undefined => {
  if (typeof window !== 'undefined') {
    const itemString = localStorage.getItem(key);
    if (!itemString) return undefined;
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return undefined;
    }
    return item;
  }
  return undefined;
};

export const removeItem = (key: KeyType): void => {
  localStorage.removeItem(key);
};
