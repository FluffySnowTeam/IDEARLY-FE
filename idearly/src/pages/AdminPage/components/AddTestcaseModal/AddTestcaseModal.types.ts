export interface IAddTestcasemModal {
  isOpen: boolean;
  onClose: () => void;
}

export type ITestcaseData = {
  id: string;
  input: string;
  answer: string;
  hidden: boolean;
};

export type IproblemList = {
  description: string;
  id: number;
  name: string;
};
