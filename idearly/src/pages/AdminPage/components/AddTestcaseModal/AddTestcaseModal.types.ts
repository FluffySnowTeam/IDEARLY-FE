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
