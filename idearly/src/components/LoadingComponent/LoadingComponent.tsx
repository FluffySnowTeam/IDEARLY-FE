import * as S from "./LoadingComponent.styles";

export const LoadingComponent = () => {
  return (
    <S.LoadingBox>
      <img src="/images/loading.gif" width={150} height={150} />
    </S.LoadingBox>
  );
};
