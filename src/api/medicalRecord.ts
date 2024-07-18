import axiosTooth from "./api";

export const searchDentist = async (query: string) => {
  const response = await axiosTooth.get(`/dentists/search?query=${query}`);
  return response.data;
};
