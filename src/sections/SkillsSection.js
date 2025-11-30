// src/sections/SkillsSection.js
import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  font-size: 3em;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
`;

const SkillCategory = styled.div`
  flex: 1 1 300px;
  min-width: 250px;
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.cardBorder};
  padding-bottom: 5px;
`;

/* 라이트 모드 스킬바 색상 */
const PRIMARY_LIGHT_COLOR = '#b85c4a';

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.95em;

  span {
    flex: 0 0 120px;
    font-weight: bold;
  }

  /* progress 스타일 */
  progress {
    flex-grow: 1;
    height: 8px;
    margin-right: 10px;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
  }

  progress::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.cardBorder};
    border-radius: 5px;
  }

  progress::-webkit-progress-value {
  background-color: ${({ theme }) =>
    theme.mode === 'light'
      ? PRIMARY_LIGHT_COLOR
      : '#403de1'};   // ⭐ 다크모드 바 색 = #0500ff
  border-radius: 5px;
}

  progress::-moz-progress-bar {
    background-color: ${({ theme }) =>
      theme.mode === 'light' ? PRIMARY_LIGHT_COLOR : theme.primary};
    border-radius: 5px;
  }

  small {
    width: 40px;
    text-align: right;
  }
`;

const SkillsSection = ({ data }) => {
  if (!data) return <div>데이터 로딩 중...</div>;
  
  const groupedSkills = data.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills-section">
      <SectionTitle>기술 스택 (Skills)</SectionTitle>
      <SkillGrid>
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <SkillCategory key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            {skills.map(skill => (
              <SkillItem key={skill.name}>
                <span>{skill.name}</span>
                <progress value={skill.level} max="100"></progress>
                <small>{skill.level}%</small>
              </SkillItem>
            ))}
          </SkillCategory>
        ))}
      </SkillGrid>
    </section>
  );
};

export default SkillsSection;
