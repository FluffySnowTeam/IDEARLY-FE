import * as S from "./Header.styles";

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        <img src="/images/test_logo.jpeg" width={40} />
        <div>IDEARLY</div>
      </S.LogoContainer>
    </S.HeaderContainer>
  );
};
