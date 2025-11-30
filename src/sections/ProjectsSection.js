// src/sections/ProjectsSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard'; // Default Import
import DetailModal from '../components/DetailModal'; // Default Import

const SectionTitle = styled.h2`
  font-size: 3em;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  width: 100%;
`;

const ProjectsSection = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!data) return <div>데이터 로딩 중...</div>;

  return (
    <section id="projects-section">
      <SectionTitle>프로젝트 포트폴리오 (Projects)</SectionTitle>
      <ProjectList>
        {data.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={setSelectedProject} 
          />
        ))}
      </ProjectList>
      
      {/* 상세 모달 컴포넌트 */}
      {selectedProject && (
        <DetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default ProjectsSection;