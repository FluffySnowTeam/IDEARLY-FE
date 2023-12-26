import { Input, Textarea } from "@chakra-ui/react";
import { CompetitionInfoFormConfig } from "../../../../../../constants";
import { PropsWithChildren } from "react";
import * as S from "./CompetitionInfoForm.styles";
import type { ICompetitionInfoForm } from "./CompetitionInfoForm.types";

export const CompetitionInfoForm = ({
  formData,
  handleChange,
}: PropsWithChildren<ICompetitionInfoForm>) => {
  return (
    <div>
      {CompetitionInfoFormConfig.map((formConfig) => (
        <S.CompetitionInfoFormContainer key={formConfig.name}>
          <div>{formConfig.label}</div>
          {formConfig.type !== "textarea" ? (
            <Input
              value={formData[formConfig.name]}
              placeholder={formConfig.placeholder}
              onChange={(e) => {
                handleChange(formConfig.name, e.target.value);
              }}
            />
          ) : (
            <Textarea
              value={formData[formConfig.name]}
              placeholder={formConfig.placeholder}
              onChange={(e) => {
                handleChange(formConfig.name, e.target.value);
              }}
            />
          )}
        </S.CompetitionInfoFormContainer>
      ))}
    </div>
  );
};
