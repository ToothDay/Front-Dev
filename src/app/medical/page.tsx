"use client";
import { VisitData } from "../../api/medical";
import MedicalContent from "@/components/medical/MedicalContent";
import { fetchVisitData } from "@/api/medicalRecord";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { useEffect, useState } from "react";

const MedicalPage = () => {
  const [myClinicData, setMyClinicData] = useState<VisitData[]>([]);
  const { data = [], isLoading } = useQuery<VisitData[]>({
    queryKey: ["medicalHistory"],
    queryFn: () => fetchVisitData(0, 10),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  useEffect(() => {
    if (data) {
      const myData = data.filter((item) => item.writtenByCurrentUser);
      if (myData.length > 0) setMyClinicData(myData);
    }
  }, [data]);
  const hasMyData = myClinicData.length === 0;

  return (
    <>
      {isLoading && <Loading />}
      <MedicalContent myData={myClinicData} hasMyData={hasMyData} />
    </>
  );
};

export default MedicalPage;
