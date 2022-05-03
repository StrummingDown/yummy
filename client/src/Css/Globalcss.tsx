import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body,html,#root { font-family: 'Noto Sans KR', sans-serif; width: 100%}; 
    button {
        border: 0;
        outline: 0;
    }
`;

export default GlobalStyles;
