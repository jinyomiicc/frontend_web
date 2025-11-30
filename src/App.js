import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './styles/GlobalStyles'; // Named Import
import { ThemeContext } from './contexts/ThemeContext'; // Named Import
import Header from './components/Header'; // Default Import
import styled from 'styled-components'; // styled-components 추가
import { personalData, skillsData, projectsData } from './data/portfolioData';

// 섹션 컴포넌트 임포트 (모두 Default Import)
import IntroSection from './sections/IntroSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection'; 

// --- 새로운 스타일 컴포넌트 (페이지 전환 버튼) ---

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
  opacity: 0.6; /* 불투명하게 설정 */
  transition: opacity 0.3s, transform 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }

  /* 모바일 환경에서는 버튼 숨김 */
  @media (max-width: 768px) {
    display: none;
  }
`;

const App = () => {
  const [theme, setTheme] = useState('light'); 
  const mainRef = useRef(null);
  const sectionIds = ['intro-section', 'skills-section', 'projects-section', 'about-section', 'contact-section'];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // 마우스 휠 이벤트로 가로 스크롤 구현 (기존 로직 유지)
  useEffect(() => {
    const handleScroll = (e) => {
      if (window.innerWidth < 768) return; 
      
      if (e.deltaY !== 0) {
        e.preventDefault();
        window.scrollBy({
          left: e.deltaY * 1.5,
          behavior: 'smooth'
        });
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);
  
  // 현재 섹션 인덱스를 추적하는 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setCurrentSectionIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.8, // 섹션이 80% 이상 보일 때
      }
    );

    // 모든 섹션 관찰
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []); // sectionIds는 상수이므로 빈 배열

  // 페이지 이동 함수
  const navigateSection = (direction) => {
    let newIndex = currentSectionIndex;
    if (direction === 'next' && currentSectionIndex < sectionIds.length - 1) {
      newIndex += 1;
    } else if (direction === 'prev' && currentSectionIndex > 0) {
      newIndex -= 1;
    }
    
    if (newIndex !== currentSectionIndex) {
      document.getElementById(sectionIds[newIndex]).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 데이터 로드 실패 방지
  if (!personalData || !skillsData || !projectsData) {
      return <div>데이터를 로드하는 중... (portfolioData.js 확인 필요)</div>;
  }

  return (
    <Router>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Header currentSectionId={sectionIds[currentSectionIndex]} /> {/* Header에 현재 섹션 ID 전달 */}
          
          {/* Main Content: 모든 섹션이 가로로 배치됨 */}
          <main ref={mainRef}>
            <IntroSection data={personalData} />
            <SkillsSection data={skillsData} />
            <ProjectsSection data={projectsData} />
            <AboutSection data={personalData} />
            {/* contact 데이터 누락 방지 */}
            <ContactSection data={personalData.contact} /> 
          </main>
          
          {/* 이전 섹션 버튼 (IntroSection에서는 숨김) */}
          {currentSectionIndex > 0 && (
            <NavButton direction="left" onClick={() => navigateSection('prev')}>
              &lt;
            </NavButton>
          )}

          {/* 다음 섹션 버튼 (마지막 섹션에서는 숨김) */}
          {currentSectionIndex < sectionIds.length - 1 && (
            <NavButton direction="right" onClick={() => navigateSection('next')}>
              &gt;
            </NavButton>
          )}
          
        </ThemeProvider>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;