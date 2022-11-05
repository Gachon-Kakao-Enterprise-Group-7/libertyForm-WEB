import { createGlobalStyle } from 'styled-components'
import Roboto from '../../assets/fonts/Roboto/Roboto-Regular.woff'
import Poppins from '../../assets/fonts/Poppins/Poppins-Regular.woff'
import NaverNanumSquare from '../../assets/fonts/NaverNanumSquare/NanumSquareR.otf'

//1. 특수문자 범위: U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E
//2. 영문 범위: U+0041-005A(대문자), U+0061-007A(소문자)
//3. 숫자 범위: U+0030-0039

//전체 U+0020-007E

export const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Poppins';
  src: url('${Poppins}') format('woff');
  font-weight: 600;
  font-style: normal;
  unicode-range:  U+0020-007E; //영문 특수문자
  }
  @font-face {
  font-family: 'Roboto';
  src: url('${Roboto}') format('woff');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'NaverNanumSquare';
  src: url('${NaverNanumSquare}') format('opentype');
  unicode-range: U+AC00-D7A3; //한글
  
  }
  body {
  font-family: 'Poppins','NaverNanumSquare';
}
`