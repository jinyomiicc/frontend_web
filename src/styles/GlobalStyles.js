// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components'; // 🚨 createGlobalStyle import 추가

// ----------------------------------------------------
// [THEME PALETTE]
// ----------------------------------------------------
const LIGHT_BG = '#fffff9';
const LIGHT_TEXT = '#6b6e7a';
const LIGHT_PRIMARY = '#c29180';
const LIGHT_SECONDARY = '#6b6e7a';

// 1. lightTheme 정의 및 export
export const lightTheme = {
  mode: 'light',
  background: LIGHT_BG,
  text: LIGHT_TEXT,
  primary: LIGHT_PRIMARY,
  secondary: LIGHT_SECONDARY,
  cardBg: '#FFFFFF',
  cardBorder: 'rgba(107, 110, 122, 0.3)',
};

const DARK_BG = '#282a36';
const DARK_TEXT = '#f8f8f2';
const DARK_PRIMARY = '#91c280';
const DARK_SECONDARY = '#7a91c2';

// 2. darkTheme 정의 및 export
export const darkTheme = {
  mode: 'dark',
  background: DARK_BG,
  text: DARK_TEXT,
  primary: DARK_PRIMARY,
  secondary: DARK_SECONDARY,
  cardBg: '#363949',
  cardBorder: '#4a4d5e',
};

// Global Styles - 🚨 스크롤 문제 해결을 위해 body/main 스타일 수정
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%; 
    margin: 0;
    padding: 0;
    overflow: hidden; /* 브라우저 기본 스크롤 막음 */
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Noto Sans KR', sans-serif;
    transition: all 0.50s linear;
  }

  main {
    display: flex;
    
    /* 🚨 스크롤 문제 해결 핵심: main이 스크롤 컨테이너 역할 */
    height: 100vh;
    width: 100vw;
    
    overflow-x: auto; /* 가로 스크롤 허용 */
    overflow-y: hidden; /* 세로 스크롤 막음 */
    
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
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
    flex-shrink: 0; /* 섹션이 압축되지 않도록 보장 */
  }

  /* ======================================================= */
  /* 💡 인쇄 전용 스타일 (Print Media Query) */
  /* ======================================================= */
  
  /* 인쇄 시 숨겨진 레이아웃을 보이게 하고, 기본 섹션들을 숨깁니다. */
  .print-layout {
      display: none; /* 화면에서는 숨김 */
  }

  @media print {
    /* 1. 페이지 설정: A4 세로 형식 */
    @page {
      size: A4 portrait;
      margin: 1.5cm;
    }
    
    /* 2. 인쇄 레이아웃을 보이게 함 */
    .print-layout {
      display: block !important;
      width: 100%;
      margin: 0;
      padding: 0 1.5cm; /* 페이지 여백 */
      font-size: 10pt;
      color: #333; 
    }
    
    /* 3. 화면용 메인 콘텐츠 숨기기 */
    main,
    header, 
    .NavButton,
    .theme-toggle,
    #intro-section, 
    #about-section, 
    #skills-section 
    {
      display: none !important;
    }

   /* 4. PrintHeader 스타일 (사진, 이름, 연락처) - ✨수정됨✨ */
    .print-header-content {
        /* padding-top: 5cm; <- 이 부분을 제거하여 상단 간격을 줄입니다. */
        padding-top: 0; /* 0으로 변경 */
        padding-bottom: 0.5cm;
        border-bottom: 3px solid ${LIGHT_PRIMARY}; 
        margin-bottom: 0.5cm; /* 헤더 아래쪽 마진도 1cm -> 0.5cm로 줄여서 위로 당김 */
    }
    .profile-contact-row {
        display: flex;
        align-items: center;
        margin-bottom: -10px;
    }

    .print-profile-image {
        width: 100px; /* 세로 타원형을 위한 너비 조정 */
        height: 130px; /* 세로 타원형을 위한 높이 확장 */
        border-radius: 50%; /* 타원형 모양 설정 */
        object-fit: cover;
        margin-right: 30px; /* 마진 확장 */
        border: 1px solid ${LIGHT_PRIMARY}; 
    }

    .personal-info h1 { 
        font-size: 22pt; /* 이름 크기 확장 */
        margin: 0 0 10px 0; /* 마진 확장 */
        color: #000; 
    }
    .personal-info h2 { 
        font-size: 12pt; 
        color: ${LIGHT_PRIMARY}; 
        margin: 0 0 18px 0; /* 마진 확장 */
        font-weight: 700;
    }
    .personal-info p { 
        font-size: 9pt; 
        margin: 2px 0; 
        line-height: 1.5; 
        color: #555;
    }
    
    /* 요약 블록 */
    .summary-block {
        margin-top: 30px; /* 마진 확장 */
        padding-top: 15px; /* 패딩 확장 */
        border-top: 1px dashed #ccc; 
        p {
            font-size: 9pt;
            line-height: 1.6;
            margin: 0;
            text-align: justify;
        }
    }

    /* 5. 2열 레이아웃 스타일 */
    .print-two-column-layout {
        display: flex;
        justify-content: space-between;
        gap: 2cm; 
        margin-bottom: 1cm;
    }

    .print-column-left, .print-column-right {
        flex: 1;
        width: 50%; 
    }
    
    /* DetailBlock 내부 제목 스타일 (공통 섹션 제목) */
    .print-layout h3 {
        font-size: 14pt;
        font-weight: 700;
        margin-top: 10px;
        margin-bottom: 10px;
        color: ${LIGHT_PRIMARY} !important; 
        border-bottom: 2px solid #eee;
        padding-bottom: 5px;
    }
    
    /* 6. 프로젝트 및 연락처 섹션 */
    #projects-section,
    #contact-section {
        display: block !important; 
        width: 100% !important;
        height: auto !important;
        padding: 0 1.5cm !important;
        page-break-before: auto; 
    }

    /* 나머지 모든 요소의 색상 및 그림자 조정 */
    * {
        color: #333 !important; 
    }
    
    div[class*="Block"], div[class*="Card"] {
        box-shadow: none !important;
        border: 1px solid #ddd !important; 
        background: #fafafa !important; 
        margin-bottom: 15px !important;
        padding: 15px !important;
        border-radius: 4px; 
    }
    
    /* 스킬 카테고리 제목 스타일 */
    .skill-category-print h4 {
        margin-top: 15px;
        font-size: 9pt;
        font-weight: 700;
        color: #555 !important;
        padding-bottom: 3px;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px !important; /* 상세 항목과의 간격 */
    }
    
    /* 진행바 색상 (PrintLayout.js에서rgb(231, 170, 137)로 설정됨) */
    .progress-fill {
        /* GlobalStyles에서는 제어하지 않음 */
    }
  }
`;