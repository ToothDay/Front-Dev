export const getToken = () => localStorage.getItem("jwtToken");

export const setToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
};

export const removeToken = () => {
  localStorage.removeItem("jwtToken");
};
