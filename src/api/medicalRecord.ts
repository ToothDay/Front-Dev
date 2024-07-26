import axiosClient from "@/api/axiosApi/axiosClient";
import { SaveParams } from "@/components/medical/MedicalWrite";
import { VisitData } from "./medical";

export type SaveMyDentistResponse = {
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  isShared: boolean;
  treatmentList: [
    {
      toothId: number | null;
      category: string;
      amount: number;
    }
  ];
  totalAmount: number;
  writtenByCurrentUser: boolean;
};
type Treatment = {
  toothId: number;
  category: string;
  amount: number;
};

type VisitToothDetail = {
  visitId: number;
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  isShared: boolean;
  treatmentList: Treatment[];
  totalAmount: number;
  writtenByCurrentUser: boolean;
};

export type VisitsByToothId = {
  [key: number]: VisitToothDetail[];
};

export const searchDentist = async (query: string) => {
  const response = await axiosClient.get(`/dentists/search?query=${query}`);
  return response.data;
};

export const saveMyDentist = async (
  params: SaveParams
): Promise<SaveMyDentistResponse> => {
  const response = await axiosClient.post(`/visit`, params);
  return response.data;
};

export const modifyMyDentist = async (
  visitId: string,
  params: SaveParams
): Promise<SaveMyDentistResponse> => {
  const response = await axiosClient.put(`/visit/${visitId}`, params);
  return response.data;
};

export const fetchVisitData = async (
  offset: number = 0,
  limit: number = 10
): Promise<VisitData[]> => {
  const response = await axiosClient.get(
    `/visit?offset=${offset}&limit=${limit}`
  );
  return response.data;
};
export const fetchVisitMyData = async (
  pageParam: number = 0
): Promise<VisitData[]> => {
  const limit = 10;
  const response = await axiosClient.get(`/mypage/visit`, {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return response.data;
};

export const deleteMyData = async (visitId: string) => {
  const response = await axiosClient.delete(`/visit/${visitId}`);
  return response.data;
};

export const fetchMyToothList = async () => {
  const response = await axiosClient.get(`/mypage/treatment`);
  return response.data;
};

export const fetchOtherVisitData = async (
  pageParam: number = 0,
  category: number = 1
): Promise<VisitData[]> => {
  const limit = 10;
  const response = await axiosClient.get(`/visit/category/${category}`, {
    params: {
      offset: pageParam,
      limit: limit
    }
  });
  return response.data;
};
