import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import * as S from "./CompletePage.styles";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const CompletePage = () => {
  const navigate = useNavigate();

  const handleMoveToPath = (path: string) => {
    if (path === "main") navigate("/");
    else navigate(path);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      m="4"
      mt="20"
      p="4"
    >
      <S.ImageDiv src="images/complete.gif" />
      <Box display="flex" flexDirection={"column"}>
        <Text fontSize="4xl" as="b" mb="3">
          🎉 대회가 종료되었습니다.
        </Text>
        <Text fontSize="lg">수고하셨습니다.</Text>
        <Text fontSize="lg">
          대회 결과는 <S.BoldText>2일 후 마이페이지</S.BoldText>
          에서 확인하실 수 있습니다.
        </Text>
        <Button
          mt="5"
          display="flex"
          alignItems={"center"}
          colorScheme="facebook"
          backgroundColor="#5A84FF"
          onClick={() => {
            handleMoveToPath("main");
          }}
        >
          <ExternalLinkIcon mr="2" />
          메인 화면으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
};
