import axiosServer from "./axiosApi/axiosServer";

export type TreatmentItem = {
  toothId: number | null;
  category: string;
  amount: number;
};

export type VisitData = {
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  treatmentList: TreatmentItem[];
  totalAmount: number;
  writtenByCurrentUser: boolean;
  visitID: number;
  userID: number;
  profileImageUrl: string | null;
  shared: boolean;
};

export const fetchVisitData = async (): Promise<VisitData[]> => {
  const response = await axiosServer.get<VisitData[]>(`/visit`);
  return response.data;
};
