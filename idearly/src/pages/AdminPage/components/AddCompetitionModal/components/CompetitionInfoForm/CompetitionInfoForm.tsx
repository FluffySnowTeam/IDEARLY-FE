import { Input, Textarea } from "@chakra-ui/react";
import { CompetitionInfoFormConfig } from "../../../../../../constants";

export const CompetitionInfoForm = () => {
  return (
    <>
      {CompetitionInfoFormConfig.map((formConfig) => (
        <div>
          <div>{formConfig}</div>
          {formConfig !== "대회 내용" ? <Input /> : <Textarea />}
        </div>
      ))}
    </>
  );
};
