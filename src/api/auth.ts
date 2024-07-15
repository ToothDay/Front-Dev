export const getToken = () => localStorage.getItem("jwtToken");

export const setToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
  const expires = new Date();
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);

  document.cookie = `jwtToken=${token}; path=/; expires=${expires.toUTCString()}; secure; SameSite=Lax`;
};

export const removeToken = () => {
  localStorage.removeItem("jwtToken");
  document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
