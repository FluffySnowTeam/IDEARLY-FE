import { IFormData } from "../../AddProblemModal.types";

export interface IAddProblem {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}
