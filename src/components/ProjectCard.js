// src/components/ProjectCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 12px;
  padding: 20px;
  margin: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  white-space: normal;
  display: flex;
  flex-direction: column;
  min-height: 200px; /* 카드의 최소 높이 설정 (정보량에 관계없이 통일감 부여) */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

// 프로젝트 제목 (메인 주제)
const Title = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom: 5px;
  line-height: 1.3;
`;

// 프로젝트 이름 (부제)
const Name = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.85em;
  font-weight: 500;
  margin-bottom: 10px;
`;

// 프로젝트 기간
const Period = styled.small`
    display: block;
    color: #888;
    font-size: 0.85em;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
`;

const RoleTag = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.background};
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8em;
  font-weight: bold;
  z-index: 10; /* 다른 요소 위에 표시 */
`;

const SummaryText = styled.p`
    flex-grow: 1; /* 요약 내용이 공간을 채우도록 함 */
    font-size: 1em;
    color: ${({ theme }) => theme.text};
    margin-bottom: 6px;
`;

// const StackInfo = styled.small`
//     display: block;
//     margin-top: auto; /* 하단에 고정 */
//     font-size: 0.9em;
//     color: ${({ theme }) => theme.secondary};
//     font-weight: bold;
// `;


const ProjectCard = ({ project, onClick }) => {
  return (
    <Card onClick={() => onClick(project)}>
      {/* 1. 역할 태그 (우측 상단 고정) */}
      <RoleTag>{project.role}</RoleTag>

      {/* 2. 메인 제목 (project.title) */}
      <Title>{project.name}</Title>

      {/* 3. 프로젝트 이름/코드 (project.name) */}
      <Name>{project.title}</Name>

      {/* 4. 프로젝트 기간 */}
      <Period>{project.peroid}</Period>

      {/* 5. 요약 (남은 공간 채움) */}
      <SummaryText>{project.summary}</SummaryText>

      {/* 6. 주요 기술 스택
      <StackInfo>
        Stack: {project.stack.slice(0, 3).join(', ')}...
      </StackInfo> */}
    </Card>
  );
};

export default ProjectCard;