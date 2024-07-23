export type Treatment = {
  id: number;
  keywordId: number;
  name: string;
};

export const TREATMENT_LIST: Treatment[] = [
  { id: 1, keywordId: 2, name: "잇몸" },
  { id: 2, keywordId: 3, name: "스케일링" },
  { id: 3, keywordId: 4, name: "레진" },
  { id: 4, keywordId: 5, name: "인레이" },
  { id: 5, keywordId: 6, name: "크라운" },
  { id: 6, keywordId: 7, name: "신경" },
  { id: 7, keywordId: 8, name: "임플란트" }
];
