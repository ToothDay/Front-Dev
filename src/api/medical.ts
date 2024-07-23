import axiosClient from "./axiosApi/axiosClient";

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
  visitId: number;
  userId: number;
  profileImageUrl?: string;
  isShared: boolean;
};

export type VisitDetail = {
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  treatmentList: TreatmentItem[];
  totalAmount: number;
  writtenByCurrentUser: boolean;
  visitId?: number;
  userId?: number;
  profileImageUrl?: string;
  isShared?: boolean;
};

export type VisitMyDetail = Omit<
  VisitDetail,
  "visitId" | "userId" | "profileImageUrl" | "shared"
>;

export type VisitMyHistory = Omit<
  VisitDetail,
  "userId" | "profileImageUrl" | "shared"
>;

export const fetchOtherMedicalDetail = async (
  visitId: string
): Promise<VisitDetail> => {
  const response = await axiosClient.get(`/visit/${visitId}`);
  return response.data;
};

export const fetchMyMedicalDetail = async (
  visitId: string
): Promise<VisitMyDetail> => {
  const response = await axiosClient.get(`/mypage/visit/${visitId}`);
  return response.data;
};
