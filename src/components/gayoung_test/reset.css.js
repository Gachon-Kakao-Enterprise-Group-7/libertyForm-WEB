import { createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle `
* {
  margin: 0;
  padding: 0;
  outline : 0;
  text-decoration:none;
  box-sizing : border-box;
}

body {
  font-family: -apple-system, BlinksMacSystemFont, 'Segoe UI', 'Roboto','0xygen',
  'Ubuntu','Cantarell','Fira Sans' , 'Helvetica Neue', sans-serif;
  color : #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smooting: grayscale;
}
`;