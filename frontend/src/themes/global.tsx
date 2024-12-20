/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const GlobalStyles = styled.div`
  .global {
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.background};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyles;
