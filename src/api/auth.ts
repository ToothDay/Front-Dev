export const getToken = () => localStorage.getItem("jwtToken");

export const setToken = (token: string) => {
  document.cookie = `jwtToken=${token}; path=/; secure; httponly`;
};

export const removeToken = () => {
  document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
