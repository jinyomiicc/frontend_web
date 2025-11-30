import React from 'react';
import styled from 'styled-components';
// 🚨 이미지 파일 경로는 실제 프로젝트에 맞게 require() 또는 import하세요. 
// 여기서는 `project.imageSrc`를 통해 URL 문자열 배열을 받는다고 가정합니다.

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow-y: auto;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 40px; 
  border-radius: 10px;
  max-width: 1200px; /* 🚨 모달 너비 확장 (이미지 블록 공간 확보) */
  max-height: 90vh;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-y: hidden; /* 스크롤은 내부 블록에서 관리 */
  white-space: normal;
  
  display: flex; /* 🚨 핵심: 이미지 블록과 콘텐츠 블록을 좌우로 나열 */
  gap: 30px; /* 좌우 블록 간 간격 */

  @media (max-width: 1024px) {
    display: block; /* 모바일/태블릿에서는 블록으로 변경 (세로 나열) */
    overflow-y: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5em;
  cursor: pointer;
  z-index: 10; 
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

// 💡 왼쪽 세로 이미지 블록
const ProjectImageWrapper = styled.div`
  width: 350px; /* 🚨 이미지 블록 고정 너비 */
  flex-shrink: 0; 
  
  display: flex;
  flex-direction: column; /* 이미지를 세로로 나열 */
  gap: 20px; 
  
  /* ModalContent 높이 - 상하 패딩(40px*2) */
  max-height: calc(90vh - 80px); 
  overflow-y: auto; /* 이미지 블록에 스크롤 적용 */
  padding-right: 10px; /* 스크롤 바 공간 확보 */

  .project-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    
    img {
      width: 100%;
      height: auto; 
      display: block;
      object-fit: cover;
    }
  }

  @media (max-width: 1024px) { /* 🚨 너비가 좁아지면 이미지 블록 숨김 */
      display: none;
  }
`;

// 💡 오른쪽 콘텐츠 블록
const ContentWrapper = styled.div`
  flex-grow: 1; /* 남은 공간을 모두 차지 */
  
  max-height: calc(90vh - 80px); /* ModalContent 높이 - 상하 패딩(40px*2) */
  overflow-y: auto; /* 콘텐츠 블록에 스크롤 적용 */

  @media (max-width: 1024px) {
      width: 100%; 
      max-height: none; /* 모바일에서는 ModalContent에 스크롤이 있으므로 해제 */
  }
`;

// 🚨 추가: project.name에 적용할 스타일 컴포넌트
const ProjectNameTitle = styled.h1`
  color: ${({ theme }) => theme.primary}; /* 💡 theme.primary 색상 적용 */
  font-size: 2em; /* 크기 강조 */
  margin-bottom: 5px; 
  margin-top: 0;
`;


// 💡 인라인 SVG로 깃허브 아이콘 구현
const GithubIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-.6-.3-1.1-1-1.4l-4-1.8c-.8-.4-1.6-.6-2.4-.6c-.8 0-1.6.2-2.4.6l-4 1.8c-.7.3-1 .8-1 1.4V22"></path>
    <path d="M9 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0z"></path>
    <path d="M15 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0z"></path>
    <path d="M12 2v2"></path>
    <path d="M12 18v2"></path>
    <path d="M4.2 4.2l1.4 1.4"></path>
    <path d="M18.4 18.4l1.4 1.4"></path>
  </svg>
);


const DetailModal = ({ project, onClose }) => {
  if (!project) return null;
  
  // 🚨 [이미지 경로 추출 로직] require()로 불러온 이미지 객체에서 실제 URL을 추출합니다.
  const rawImageSources = Array.isArray(project.imageSrc) 
    ? project.imageSrc 
    : (project.imageSrc ? [project.imageSrc] : []); 

  const imageSources = rawImageSources.map(src => {
    // Webpack이 require()한 이미지는 객체 { default: 'url' } 형태로 넘어옵니다.
    if (typeof src === 'object' && src.default) {
      return src.default;
    }
    return src; 
  });
  // -----------------------------------------------------------

  const hasImages = imageSources.length > 0; 

  return (
    <ModalOverlay onClick={onClose} className="no-print">
      <ModalContent onClick={e => e.stopPropagation()}>
        
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        {/* 🚨 1. 이미지 블록 (왼쪽) */}
        {hasImages && (
          <ProjectImageWrapper>
             {/* 모든 이미지를 세로로 렌더링 */}
            {imageSources.map((src, index) => (
                <div key={index} className="project-image">
                    <img src={src} alt={`${project.title} 이미지 ${index + 1}`} />
                </div>
            ))}
          </ProjectImageWrapper>
        )}

        {/* 🚨 2. 콘텐츠 블록 (오른쪽) */}
        <ContentWrapper>
          
          {/* 💡 수정: ProjectNameTitle 컴포넌트 사용 */}
          <ProjectNameTitle>
            {project.name}
          </ProjectNameTitle>
          
          {/* project.title은 보조 제목으로 유지 */}
          <h3 style={{ color: 'gray', marginBottom: '10px', marginTop: '0' }}>
            {project.title}
          </h3>

          <p style={{ color: 'gray', marginBottom: '20px' }}>
            {project.role} 중심 | 기여도: {project.contribution}
          </p>
          
          <h3>프로젝트 개요</h3>
          <p style={{marginBottom: '20px'}}>{project.summary}</p>

          <h3>주요 기능</h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
            {project.details.keyFeatures.map((f, i) => <li key={i} style={{ marginBottom: '5px' }}>{f}</li>)}
          </ul>
          
          <h3 style={{ marginTop: '20px' }}>담당 역할</h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
            {project.details.myRole.map((r, i) => <li key={i} style={{ marginBottom: '5px' }}>{r}</li>)}
          </ul>
          
          <h3 style={{ marginTop: '20px' }}>사용 기술 스택</h3>
          <p>{project.stack.join(' | ')}</p>

          <div style={{ marginTop: '30px' }}>
              {project.githubUrl && (
                  <GithubLink 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                  >
                      <GithubIcon size={18} />
                      GitHub 바로가기
                  </GithubLink>
              )}
          </div>
        </ContentWrapper>
        
      </ModalContent>
    </ModalOverlay>
  );
};

export default DetailModal;