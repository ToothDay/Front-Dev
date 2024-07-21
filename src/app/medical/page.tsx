"use client";
import { VisitData } from "../../api/medical";
import MedicalContent from "@/components/medical/MedicalContent";
import { fetchVisitData } from "@/api/medicalRecord";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

const MedicalPage = () => {
  const { data = [], isLoading } = useQuery<VisitData[]>({
    queryKey: ["medicalHistory"],
    queryFn: fetchVisitData,
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
