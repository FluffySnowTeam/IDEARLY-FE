import { Box, Text } from "@chakra-ui/react";
import { HomePageConfig } from "../../constants";
import { CompetitionsSection } from "./components";
import * as S from "./HomePage.styles";
import { TriangleDownIcon } from "@chakra-ui/icons";

export const HomePage = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <S.MainContainer>
          <S.MainImage src="images/main_image.gif" />
          <S.TextContainer>
            <Text fontSize="5xl" as="b" color="#13228B">
              IDEARLY
            </Text>
            <Text fontSize="2xl">
              WEB-<S.BoldText>IDE</S.BoldText> 환경에서
            </Text>
            <Text fontSize="2xl">
              여러분의 <S.BoldText>IDEA</S.BoldText>를
            </Text>
            <Text fontSize="2xl">
              <S.BoldText>EARLY</S.BoldText> 빠르고
            </Text>
            <Text fontSize="2xl">
              <S.BoldText>IDEALLY</S.BoldText> 완벽하게
            </Text>
            <Text fontSize="2xl">구현해보세요!</Text>
          </S.TextContainer>
        </S.MainContainer>
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt="4">
        <TriangleDownIcon fontSize={"5xl"} color="#13228B" />
      </Box>
      <S.HomeContainer>
        {HomePageConfig.map((config) => (
          <CompetitionsSection key={config.id} config={config} />
        ))}
      </S.HomeContainer>
    </>
  );
};
