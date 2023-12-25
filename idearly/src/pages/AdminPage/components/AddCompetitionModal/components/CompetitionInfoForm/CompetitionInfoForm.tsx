import { Input, Textarea } from "@chakra-ui/react";
import { CompetitionInfoFormConfig } from "../../../../../../constants";
import { PropsWithChildren } from "react";
import type { CompetitionRequest } from "../../../../../../types";

interface ICompetitionInfoForm {
  formData: CompetitionRequest;
  handleChange: (key: string, value: string) => void;
}

export const CompetitionInfoForm = ({
  formData,
  handleChange,
}: PropsWithChildren<ICompetitionInfoForm>) => {
  return (
    <div>
      {CompetitionInfoFormConfig.map((formConfig) => (
        <div key={formConfig.name}>
          <div>{formConfig.label}</div>
          {formConfig.type !== "textarea" ? (
            <Input
              value={formData[formConfig.name]}
              onChange={(e) => {
                handleChange(formConfig.name, e.target.value);
              }}
            />
          ) : (
            <Textarea
              value={formData[formConfig.name]}
              onChange={(e) => {
                handleChange(formConfig.name, e.target.value);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
