import React from 'react'; // useRef는 더 이상 필요 없습니다.
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
// import myPortfolioPdf from '../assets/fortpolio.pdf'; // 🚨 이 import는 제거합니다.

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

  // 🚨 인쇄 시 헤더 숨기기
  @media print {
    display: none;
  }
`;

const Logo = styled.h1`
  font-size: 1.5em;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

const NavList = styled.nav`
  display: flex;
  gap: 25px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  padding: 5px 0;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: ${({ $active }) => ($active ? '100%' : '0')};
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

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


const Header = ({ currentSectionId, scrollToSection }) => { // scrollToSection은 App.js에서 계속 받습니다.

  const sections = [
    { id: 'intro-section', name: 'Intro' },
    { id: 'skills-section', name: 'Skills' },
    { id: 'projects-section', name: 'Projects' },
    { id: 'about-section', name: 'About' },
    { id: 'contact-section', name: 'Contact' },
  ];

  //  window.print()를 호출하여 현재 페이지를 인쇄합니다.
  const handlePrint = () => {
    window.print();
  };

  return (
    <NavWrapper> {/* className="no-print"는 NavWrapper 자체에 @media print로 적용 */}
      <Logo>JM.DEV</Logo>
      <NavList>
        {sections.map((sec) => (
          <NavLink 
            key={sec.id} 
            onClick={() => scrollToSection(sec.id)}
            $active={sec.id === currentSectionId}
          >
            {sec.name}
          </NavLink>
        ))}
      </NavList>
      
      <ButtonGroup>
        <ThemeToggle />
        <PrintButton onClick={handlePrint} title="포트폴리오 인쇄"> {/* handlePrint로 변경 */}
          <PrinterIcon />
          인쇄
        </PrintButton>
      </ButtonGroup>
    </NavWrapper>
  );
};

export default Header;