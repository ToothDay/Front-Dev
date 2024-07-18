import axiosTooth from "./api";
import { SaveParams } from "@/components/medical/MedicalWrite";

export const searchDentist = async (query: string) => {
  const response = await axiosTooth.get(`/dentists/search?query=${query}`);
  return response.data;
};

export const saveMyDentist = async (params: SaveParams) => {
  const response = await axiosTooth.post(`/visit`, params);
  return response.data;
};
