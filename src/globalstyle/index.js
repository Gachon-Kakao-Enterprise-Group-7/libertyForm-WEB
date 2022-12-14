import { createGlobalStyle } from "styled-components";
import Montserrat from ".././assets/fonts/Montserrat/Montserrat-Bold.ttf";
import RobotoMono from ".././assets/fonts/RobotoMono/RobotoMono-Medium.ttf";
import SpoqaHanSansNeo from ".././assets/fonts/SpoqaHanSansNeo_all/SpoqaHanSansNeo-Medium.otf";
import SpoqaHanSansNeo2 from ".././assets/fonts/SpoqaHanSansNeo_all/SpoqaHanSansNeo-Bold.otf";
import SpoqaHanSansNeo3 from ".././assets/fonts/SpoqaHanSansNeo_all/SpoqaHanSansNeo-Light.otf";

//1. 특수문자 범위: U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E
//2. 영문 범위: U+0041-005A(대문자), U+0061-007A(소문자)
//3. 숫자 범위: U+0030-0039

//전체 U+0020-007E

export const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Montserrat';
  src: url('${Montserrat}') format('truetype');

  }

  @font-face {
  font-family: 'RobotoMono';
  src: url('${RobotoMono}') format('truetype');
  }

  @font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('${SpoqaHanSansNeo}') format('opentype');
  /* unicode-range: U+AC00-D7A3; //한글 */ 
  font-weight: bold;
  }

  @font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('${SpoqaHanSansNeo2}') format('opentype');
  /* unicode-range: U+AC00-D7A3; //한글 */
  font-weight: black;
  }

  @font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('${SpoqaHanSansNeo3}') format('opentype');
  /* unicode-range: U+AC00-D7A3; //한글 */
  }

  body {
    font-family: 'SpoqaHanSansNeo';
}
`;
