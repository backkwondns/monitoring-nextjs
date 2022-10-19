type Token = string;
export const setToken = (token: Token) => {
  const now = new Date();
  const item = { value: token, expiry: now.getTime() + 1200000 };
  localStorage.setItem('token', JSON.stringify(item));
};

export const getToken = (): Token | null => {
  const itemString = localStorage.getItem('token');
  if (!itemString) return null;
  const item = JSON.parse(itemString);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token');
    return null;
  }
  return item.value;
};

export const updateToken = (): void => {
  const token = getToken();
  if (token) setToken(token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};
