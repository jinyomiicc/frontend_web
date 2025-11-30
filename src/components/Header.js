import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
// 💡 중요: assets 폴더에 portfolio.pdf 파일이 있어야 합니다.
// 파일명이 다르다면 아래 이름을 실제 파일명으로 변경해주세요.
import myPortfolioPdf from '../assets/fortpolio.pdf'; 

const NavWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 50px;
  background: ${({ theme }) => theme.background}B0;
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5em;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

const NavList = styled.nav`
  display: flex;
  gap: 25px;
  
  /* 모바일 대응 */
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  padding: 5px 0;
  position: relative;
  cursor: pointer;
  
  /* 활성화된 링크 스타일 */
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  
  &::after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.secondary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// 💡 버튼들을 감싸는 그룹 (오른쪽 정렬 및 간격 조절)
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* 다크모드 버튼과 인쇄 버튼 사이 간격 */
`;

// 💡 인쇄 버튼 스타일 (ThemeToggle과 유사한 스타일)
const PrintButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// 인라인 SVG 프린터 아이콘
const PrinterIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

const Header = ({ currentSectionId }) => {
  const sections = [
    { id: 'intro-section', name: 'Intro' },
    { id: 'skills-section', name: 'Skills' },
    { id: 'projects-section', name: 'Projects' },
    { id: 'about-section', name: 'About' },
    { id: 'contact-section', name: 'Contact' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrintPdf = () => {
    // PDF 파일을 새 탭에서 엽니다. (브라우저 내장 뷰어에서 인쇄 가능)
    window.open(myPortfolioPdf, '_blank');
  };

  return (
    <NavWrapper className="no-print">
      <Logo>JM.DEV</Logo>
      <NavList>
        {sections.map(sec => (
          <NavLink 
            key={sec.id} 
            onClick={() => scrollToSection(sec.id)}
            active={sec.id === currentSectionId}
          >
            {sec.name}
          </NavLink>
        ))}
      </NavList>
      
      {/* 💡 변경됨: 버튼 그룹으로 묶어서 배치 */}
      <ButtonGroup>
        <ThemeToggle /> {/* 다크모드 버튼이 왼쪽 */}
        <PrintButton onClick={handlePrintPdf} title="PDF 포트폴리오 인쇄/다운로드">
          <PrinterIcon />
          PDF
        </PrintButton>
      </ButtonGroup>
    </NavWrapper>
  );
};

export default Header;