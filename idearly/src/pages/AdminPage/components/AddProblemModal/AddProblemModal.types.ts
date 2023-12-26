export interface IAddProblemModal {
  isOpen: boolean;
  onClose: () => void;
}

export type IFormData = {
  name: string;
  description: string;
};
