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
  profileImageUrl?: string;
  shared: boolean;
};

export type VisitDetail = {
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  treatmentList: TreatmentItem[];
  totalAmount: number;
  writtenByCurrentUser: boolean;
  visitID?: number;
  userID?: number;
  profileImageUrl?: string;
  shared?: boolean;
};

export type VisitMyDetail = Omit<
  VisitDetail,
  "visitID" | "userID" | "profileImageUrl" | "shared"
>;

export type VisitMyHistory = Omit<
  VisitDetail,
  "userID" | "profileImageUrl" | "shared"
>;

export const fetchOtherMedicalDetail = async (
  visitId: string
): Promise<VisitDetail> => {
  const response = await axiosServer.get<VisitDetail>(`/visit/${visitId}`);
  return response.data;
};

export const fetchMyMedicalDetail = async (
  visitId: string
): Promise<VisitMyDetail> => {
  const response = await axiosServer.get<VisitMyDetail>(
    `/mypage/visit/${visitId}`
  );
  return response.data;
};
