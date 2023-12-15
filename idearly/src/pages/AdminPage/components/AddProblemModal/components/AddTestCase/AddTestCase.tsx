import { Button, ModalBody, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export const AddTestCase = () => {
  const [testCaseList, setTestCaseList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  console.log(inputValue);
  return (
    <ModalBody>
      <div>추가된 테스트케이스 리스트 보여주기</div>
      <Textarea value={inputValue} onChange={handleChange} />
      <Button>추가</Button>
    </ModalBody>
  );
};
