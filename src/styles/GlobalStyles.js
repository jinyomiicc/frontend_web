import { createGlobalStyle } from 'styled-components';

// ----------------------------------------------------
// [NEW THEME PALETTE]
// Light Mode Colors: #fffff9, #6b6e7a, #c29180
// ----------------------------------------------------

const LIGHT_BG = '#fffff9';
const LIGHT_TEXT = '#6b6e7a';
const LIGHT_PRIMARY = '#c29180';
const LIGHT_SECONDARY = '#6b6e7a';

// 1. lightTheme 정의 및 export (Named Export)
export const lightTheme = {
  mode: 'light',          // ⭐⭐ 추가됨
  background: LIGHT_BG,
  text: LIGHT_TEXT,
  primary: LIGHT_PRIMARY,
  secondary: LIGHT_SECONDARY,
  cardBg: '#FFFFFF',
  cardBorder: 'rgba(107, 110, 122, 0.3)',
};

// ----------------------------------------------------
// [DARK THEME PALETTE]
// ----------------------------------------------------

const DARK_BG = '#282a36';
const DARK_TEXT = '#f8f8f2';
const DARK_PRIMARY = '#91c280';   // 다크모드 스킬바 색
const DARK_SECONDARY = '#7a91c2';

export const darkTheme = {
  mode: 'dark',          // ⭐⭐ 추가됨
  background: DARK_BG,
  text: DARK_TEXT,
  primary: DARK_PRIMARY,
  secondary: DARK_SECONDARY,
  cardBg: '#363949',
  cardBorder: '#4a4d5e',
};

// Global Styles
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Noto Sans KR', sans-serif;
    transition: all 0.50s linear;
    
    overflow-x: auto; 
    overflow-y: hidden;
    white-space: nowrap; 
    scroll-behavior: smooth;
    height: 100vh;
  }

  main {
    display: flex;
    scroll-snap-type: x mandatory;
  }

  section {
    min-width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    scroll-snap-align: start;
    padding: 0 50px;
    background: ${({ theme }) => theme.background};
  }

  @media print {
    .no-print {
      display: none !important;
    }
  }
`;
