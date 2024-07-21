"use client";
import { VisitData } from "../../api/medical";
import MedicalContent from "@/components/medical/MedicalContent";
import { fetchVisitData } from "@/api/medicalRecord";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

const getMedicalHistory = async (): Promise<VisitData[]> => {
  try {
    const response = await fetchVisitData();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MedicalPage = async () => {
  const { data = [], isLoading } = useQuery<VisitData[]>({
    queryKey: ["medicalHistory"],
    queryFn: getMedicalHistory,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  const myData = data.filter((item) => item.writtenByCurrentUser);
  const otherData = data.filter((item) => !item.writtenByCurrentUser);
  const hasMyData = myData.length === 0;

  return (
    <>
      {isLoading && <Loading />}
      <MedicalContent
        myData={myData}
        otherData={otherData}
        hasMyData={hasMyData}
      />
    </>
  );
};

export default MedicalPage;
