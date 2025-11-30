import React from 'react';
import styled from 'styled-components';
// 💡 수정: lucide-react 임포트 제거 (Can't resolve 오류 해결)

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
  max-width: 900px;
  max-height: 90vh;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-y: auto;
  white-space: normal;
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

// 💡 추가: 인라인 SVG로 깃허브 아이콘 구현
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

  return (
    <ModalOverlay onClick={onClose} className="no-print">
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2 style={{ color: project.details?.isPrimary ? 'red' : 'inherit', marginBottom: '10px' }}>
          {project.title}
        </h2>
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
                     {/* 💡 수정: Github 컴포넌트를 인라인 SVG 컴포넌트로 대체 */}
                     <GithubIcon size={18} />
                     GitHub 바로가기
                 </GithubLink>
             )}
        </div>
        
      </ModalContent>
    </ModalOverlay>
  );
};

export default DetailModal;