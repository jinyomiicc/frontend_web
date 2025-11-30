// src/components/ProjectCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
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

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
`;

const RoleTag = styled.span`
  display: inline-block;
  background-color: ${({ theme, role }) => 
    role.includes('Front-End') ? theme.secondary : theme.primary};
  color: ${({ theme }) => theme.background};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const ProjectCard = ({ project, onClick }) => {
  return (
    <Card onClick={() => onClick(project)}>
      <RoleTag role={project.role}>{project.role} 중심</RoleTag>
      <Title>{project.title}</Title>
      <p style={{flexGrow: 1}}>{project.summary}</p>
      <small style={{marginTop: '10px'}}>Stack: {project.stack.slice(0, 3).join(', ')}...</small>
    </Card>
  );
};

export default ProjectCard;