import { CloseIcon } from "@chakra-ui/icons";
import { ModalBody, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import * as S from "./AddTestCase.styles";
import { useAtom } from "jotai";
import { testCaseDataAtom } from "../../../../../../store";

export const AddTestCase = () => {
  const [testCaseList, setTestCaseList] = useAtom(testCaseDataAtom);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTestCase = () => {
    if (inputValue.trim() === "") return setInputValue("");
    const randomId =
      "id" + Date.now() + Math.random().toString(36).substr(2, 9);

    setTestCaseList((prev) => [
      ...prev,
      {
        id: randomId,
        case: inputValue,
      },
    ]);
    setInputValue("");
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCaseList((prev) => prev.filter((testCase) => testCase.id !== id));
  };

  return (
    <ModalBody>
      {testCaseList.map((testCase) => (
        <S.TestCaseList key={testCase.id}>
          <div>{testCase.case}</div>
          <S.TestCaseDeleteButton
            size={"xs"}
            aria-label="delete testCase"
            onClick={() => {
              handleDeleteTestCase(testCase.id);
            }}
            icon={<CloseIcon />}
          ></S.TestCaseDeleteButton>
        </S.TestCaseList>
      ))}

      <Textarea value={inputValue} onChange={handleChange} />
      <S.TestCaseAddButton onClick={handleAddTestCase}>
        추가
      </S.TestCaseAddButton>
    </ModalBody>
  );
};
