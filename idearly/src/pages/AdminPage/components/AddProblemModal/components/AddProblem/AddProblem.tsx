import { Input, ModalBody, Textarea } from "@chakra-ui/react";
import type { IFormData } from "../../AddProblemModal.types";
import { PropsWithChildren } from "react";

interface IAddProblem {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export const AddProblem = ({
  formData,
  setFormData,
}: PropsWithChildren<IAddProblem>) => {
  const handleChange = (key: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  console.log(formData);
  return (
    <ModalBody>
      <div>
        <div>문제 제목</div>
        <Input
          value={formData.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
      </div>
      <div>
        <div>문제 내용</div>
        <Textarea
          value={formData.description}
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
        />
      </div>
    </ModalBody>
  );
};
