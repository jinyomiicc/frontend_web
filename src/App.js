// src/App.js

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './styles/GlobalStyles'; 
import { ThemeContext } from './contexts/ThemeContext';
import Header from './components/Header';
import styled from 'styled-components';

// 🚨🚨🚨 데이터 파일을 import 합니다.
import { personalData, skillsData, projectsData } from './data/portfolioData';

// 섹션 컴포넌트 import (유지)
import IntroSection from './sections/IntroSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
// 새로 만든 인쇄 레이아웃 컴포넌트 import
import { PrintHeader, PrintTwoColumnLayout } from './components/PrintLayout'; 


// --- Navigation Buttons Style (유지) ---
const NavButton = styled.button`
  position: fixed; 
  top: 50%; 
  ${props => (props.direction === 'left' ? 'left: 20px;' : 'right: 20px;')} 
  transform: translateY(-50%); 
  background: ${({ theme }) => theme.secondary}; 
  color: ${({ theme }) => theme.background}; 
  border: none; 
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  font-size: 2em; 
  font-weight: bold; 
  cursor: pointer; 
  z-index: 1000; 
  opacity: 0.6; 
  transition: opacity 0.3s, transform 0.3s; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  
  &:hover { 
    opacity: 1; 
    transform: translateY(-50%) scale(1.05); 
  } 
  
  /* 인쇄 시 버튼 숨김 */
  @media print {
      display: none !important;
  }
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const mainRef = useRef(null);
  
  // 🚨 수정: 섹션 ID 순서 변경 (Intro - About - Skills - Projects - Contact)
  const sectionIds = ['intro-section', 'about-section', 'skills-section', 'projects-section', 'contact-section'];
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  
  // 1. 현재 스크롤 위치를 기반으로 섹션 인덱스를 계산하는 함수
  const getCurrentSectionIndex = () => {
    if (!mainRef.current) return 0;
    
    const scrollLeft = mainRef.current.scrollLeft;
    const clientWidth = mainRef.current.clientWidth;
    
    // 현재 스크롤 위치를 화면 너비로 나누어 현재 섹션의 인덱스를 계산
    // 0.5를 더해서 섹션의 절반 이상을 넘어갔을 때 다음 섹션으로 인식하도록 함
    return Math.floor(scrollLeft / clientWidth + 0.5); 
  };
  
  // 2. 헤더 링크나 네비게이션 버튼 클릭 시 부드러운 스크롤 실행 함수
  const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement && mainRef.current) {
      const targetOffsetLeft = targetElement.offsetLeft;
      
      mainRef.current.scrollTo({
        left: targetOffsetLeft,
        behavior: 'smooth',
      });
      
      const newIndex = sectionIds.indexOf(targetId);
      if (newIndex !== -1) {
          // 클릭 시 인덱스 즉시 업데이트
          setCurrentSectionIndex(newIndex); 
      }
    }
  };

  // 3. 네비게이션 버튼을 통한 섹션 이동 함수
  const navigateSection = (direction) => {
    let newIndex = currentSectionIndex;
    if (direction === 'next' && currentSectionIndex < sectionIds.length - 1) {
      newIndex += 1;
    } else if (direction === 'prev' && currentSectionIndex > 0) {
      newIndex -= 1;
    }
    if (newIndex !== currentSectionIndex) {
      scrollToSection(sectionIds[newIndex]);
    }
  };
  
  // 4. 스크롤 이벤트 리스너 추가: 사용자가 직접 스크롤할 때 현재 섹션 업데이트
  useEffect(() => {
    const mainElement = mainRef.current;
    
    const handleScroll = () => {
        const newIndex = getCurrentSectionIndex();
        if (newIndex !== currentSectionIndex) {
            setCurrentSectionIndex(newIndex);
        }
    };

    if (mainElement) {
        // 스크롤 이벤트에 리스너 등록
        mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
        if (mainElement) {
            // 컴포넌트 언마운트 시 리스너 제거
            mainElement.removeEventListener('scroll', handleScroll);
        }
    };
  }, [currentSectionIndex]); // currentSectionIndex가 바뀔 때마다 리스너 재등록 (cleanup 필수)


  return (
    <Router>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          
          <Header 
            currentSectionId={sectionIds[currentSectionIndex]} 
            scrollToSection={scrollToSection} 
          />
          
          {/* 인쇄 전용 레이아웃 */}
          <div className="print-layout">
            <PrintHeader data={personalData} />
            <PrintTwoColumnLayout 
                personalData={personalData} 
                skillsData={skillsData} 
            />
          </div>
          
          {/* Main Content: 기존 가로 스크롤 섹션들 */}
          <main ref={mainRef}>
            {/* 🚨 수정: 컴포넌트 렌더링 순서 변경 */}
            <IntroSection data={personalData} id="intro-section" />
            <AboutSection data={personalData} id="about-section" /> {/* 위치 변경 */}
            <SkillsSection data={skillsData} id="skills-section" />
            <ProjectsSection data={projectsData} id="projects-section" />
            <ContactSection data={personalData.contact} id="contact-section" />
          </main>
          
          {/* Navigation Buttons */}
          {currentSectionIndex > 0 && (
            <NavButton className="nav-button" direction="left" onClick={() => navigateSection('prev')}>
              &lt; 
            </NavButton>
          )}
          
          {currentSectionIndex < sectionIds.length - 1 && (
            <NavButton className="nav-button" direction="right" onClick={() => navigateSection('next')}>
              &gt; 
            </NavButton>
          )}
        </ThemeProvider>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;