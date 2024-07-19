import axiosTooth from "./api";
import { SaveParams } from "@/components/medical/MedicalWrite";

export type SaveMyDentistResponse = {
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  isShared: boolean;
  treatmentlist: [
    {
      toothId: number | null;
      category: string;
      amount: number;
    }
  ];
  totalAmount: number;
  writtenByCurrentUser: boolean;
};

export const searchDentist = async (query: string) => {
  const response = await axiosTooth.get(`/dentists/search?query=${query}`);
  return response.data;
};

export const saveMyDentist = async (
  params: SaveParams
): Promise<SaveMyDentistResponse> => {
  const response = await axiosTooth.post(`/visit`, params);
  return response.data;
};
