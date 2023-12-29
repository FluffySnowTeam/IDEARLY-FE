import { Spinner } from "@chakra-ui/react";
import * as S from "./LoadingComponent.styles";

export const LoadingComponent = () => {
  return (
    <S.LoadingBox>
      {/* <img src="/images/loading.gif" width={150} height={150} /> */}
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </S.LoadingBox>
  );
};
