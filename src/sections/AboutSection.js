// src/sections/AboutSection.js
import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  font-size: 3em;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 위 2칸 */
  grid-gap: 30px;
  max-width: 1100px;
  width: 100%;

  /* 아래 1칸 전체 폭 */
  .full-width {
    grid-column: span 2;
  }

  /* 모바일에서는 1열로 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .full-width {
      grid-column: span 1;
    }
  }
`;

const DetailBlock = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 25px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
`;

const DetailTitle = styled.h3`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.5em;
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.cardBorder};
  padding-bottom: 5px;
`;

// ⚠️ DetailList 스타일 수정: • 기호 제거 및 기본 스타일링 변경
const DetailList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 10px 0;

  li {
    font-size: 1.05em;
    margin-bottom: 15px; /* 항목 간 간격 증가 */
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    gap: 4px; /* 내부 요소 간 간격 */

    /* 기존 • 기호 제거 */
    &::before {
      content: none;
    }
  }
`;

// 📚 학력 항목을 위한 별도의 스타일 컴포넌트 추가
const EducationItem = styled.li`
    margin-bottom: 15px;
    padding-left: 0; /* 불릿 없으므로 */
`;

const EducationHeader = styled.div`
    display: flex;
    justify-content: space-between; /* 기간을 오른쪽으로 보냄 */
    font-weight: bold;
    font-size: 1.1em;
`;

const SchoolInfo = styled.span`
    /* 학교명 - 전공 */
    color: ${({ theme }) => theme.text};
`;

const Period = styled.span`
    /* 기간 */
    color: ${({ theme }) => theme.secondary};
    font-weight: normal;
    font-size: 0.9em;
    white-space: nowrap; /* 기간이 줄바꿈 되지 않도록 */
`;

const GPA = styled.div`
    /* 학점 */
    color: #888;
    font-size: 0.9em;
    padding-left: 5px; /* 약간 들여쓰기 */
`;


const AboutSection = ({ data }) => {
  if (!data) return <div>데이터 로딩 중...</div>;

  return (
    <section id="about-section">
      <SectionTitle>About Me</SectionTitle>

      <AboutGrid>
        {/* 📌 학력 - 깔끔하게 수정됨 */}
        <DetailBlock>
            <DetailTitle>학력</DetailTitle>
            
            <DetailList>
                {data.education.map((edu, index) => (
                    <EducationItem key={index}>
                        
                        {/* 🔹 1줄: 학교명 – 전공 (왼쪽) / 기간 (오른쪽) */}
                        <EducationHeader>
                            <SchoolInfo>
                                 {edu.school} {edu.degree}
                            </SchoolInfo>
                            <Period>
                                {edu.period}
                            </Period>
                        </EducationHeader>

                        {/* 🔹 2줄: 학점 (값이 있을 때만 표시) */}
                        {edu.gpa && (
                            <GPA>
                                학점: {edu.gpa}
                            </GPA>
                        )}
                    </EducationItem>
                ))}
            </DetailList>
        </DetailBlock>

        {/* 📌 자격증 (없을 수도 있으니 옵션) */}
        {data.certifications ? (
          <DetailBlock>
            <DetailTitle>자격증</DetailTitle>
            <DetailList>
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </DetailList>
          </DetailBlock>
        ) : (
          <DetailBlock>
            <DetailTitle>자격증</DetailTitle>
            <p>등록된 자격증이 없습니다.</p>
          </DetailBlock>
        )}

        {/* 📌 활동 및 수상 => 아래 전체 폭 */}
        <DetailBlock className="full-width">
          <DetailTitle>활동 및 수상</DetailTitle>
          <DetailList>
            {data.activities.map((act, i) => (
              <li key={i}>{act}</li>
            ))}
          </DetailList>
        </DetailBlock>
      </AboutGrid>
    </section>
  );
};

export default AboutSection;