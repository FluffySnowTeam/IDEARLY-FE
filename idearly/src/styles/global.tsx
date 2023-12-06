import { Global, css } from '@emotion/react'

const style = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  }
  ul,
  li {
    list-style: none;
  }
  textarea {
    resize: none;
    outline: none;
  }
`

const GlobalStyle = () => {
  return <Global styles={style} />
}

export default GlobalStyle
