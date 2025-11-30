// src/sections/AboutSection.js
import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  font-size: 3em;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 800px;
  width: 100%;
`;

const EducationBox = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  white-space: normal;
`;

const ActivitiesBox = styled(EducationBox)`
    ul {
        list-style-type: disc;
        padding-left: 20px;
    }
    li {
        margin-bottom: 8px;
    }
`;

const AboutSection = ({ data }) => {
    if (!data || !data.education || !data.activities) return <div>데이터 로딩 중...</div>;

    return (
        <section id="about-section">
            <SectionTitle>자기소개 및 활동 (About Me)</SectionTitle>
            <ContentGrid>
                <EducationBox>
                    <h3>🏫 학력 사항</h3>
                    <p style={{marginTop: '10px'}}> {data.education.college}</p>
                </EducationBox>

                <ActivitiesBox>
                    <h3>🏆 수상 내역 및 주요 활동</h3>
                    <br></br>
                    <ul>
                        
                        {data.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                </ActivitiesBox>
            </ContentGrid>
        </section>
    );
};

export default AboutSection;