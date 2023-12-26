import type { ITestcaseData } from "../../AddTestcaseModal.types";

export type IAddTestCase = {
  testcaseData: ITestcaseData[];
  setTestcaseData: React.Dispatch<React.SetStateAction<ITestcaseData[]>>;
};
