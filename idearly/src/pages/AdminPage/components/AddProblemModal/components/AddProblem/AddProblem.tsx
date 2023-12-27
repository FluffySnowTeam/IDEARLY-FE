import { Input, ModalBody, Text, Textarea } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IAddProblem } from "./AddProblem.types";

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

  return (
    <ModalBody>
      <div>
        <Text fontSize={"lg"} as={"b"}>
          문제 제목
        </Text>
        <Input
          value={formData.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
          mb="3"
        />
      </div>
      <div>
        <Text fontSize={"lg"} as={"b"}>
          문제 내용
        </Text>
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
