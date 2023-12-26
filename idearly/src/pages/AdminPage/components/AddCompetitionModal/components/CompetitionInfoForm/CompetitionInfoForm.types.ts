import type { CompetitionRequest } from "../../../../../../types";

export interface ICompetitionInfoForm {
  formData: CompetitionRequest;
  handleChange: (key: string, value: string) => void;
}
