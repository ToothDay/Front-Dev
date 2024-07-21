import styles from "./page.module.scss";
import { fetchVisitData } from "@/api/medical";
import { VisitData } from "../../api/medical";
import MedicalContent from "@/components/medical/MedicalContent";

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
  const data: VisitData[] = await getMedicalHistory();
  const myData = data.filter((item) => item.writtenByCurrentUser);
  const otherData = data.filter((item) => !item.writtenByCurrentUser);
  const hasMyData = myData.length === 0;

  return (
    <MedicalContent
      myData={myData}
      otherData={otherData}
      hasMyData={hasMyData}
    />
  );
};

export default MedicalPage;
