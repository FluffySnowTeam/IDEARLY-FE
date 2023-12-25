import { Input, ModalBody, Textarea } from "@chakra-ui/react";

export const AddProblem = () => {
  return (
    <ModalBody>
      <div>
        <div>문제 제목</div>
        <Input />
      </div>
      <div>
        <div>문제 내용</div>
        <Textarea />
      </div>
    </ModalBody>
  );
};
