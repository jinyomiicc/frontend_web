// src/components/PrintLayout.js

import React from 'react';
import styled from 'styled-components';
// 🚨 실제 프로젝트에서 프로필 이미지 경로를 확인하여 수정하세요.
import profileImage from '../assets/profile.jpg'; 

// ========================================================
// [스타일 컴포넌트]
// ========================================================

// 1. AboutSection의 내부 구조를 모방하여 학력/활동/자격증을 표시할 컴포넌트
const DetailBlock = styled.div`
    /* 항목 블록 자체의 아래쪽 마진을 늘려 섹션 간 여백 확보 */
    margin-bottom: 25px; 
    
    h3 {
        /* GlobalStyles.js의 h3 스타일을 사용하며, 아래쪽 마진만 조정 */
        margin-bottom: 12px; 
    }
    ul {
        list-style: none;
        padding-left: 0;
        margin-left: 0;
        margin-top: 5px; 
    }
    li {
        margin-bottom: 15px; /* 항목 간격 유지 */
        font-size: 9.5pt; 
        line-height: 1.6;
        border-left: 3px solid #eee; 
        padding-left: 10px;
    }
    li strong {
        font-weight: bold;
        color: #000;
    }
`;

// 2. SkillsSection의 내부 구조를 모방하여 스킬을 표시할 컴포넌트 - ✨간격 및 스타일 최종 반영✨
const SkillItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px; /* 세부 항목 간 간격 살짝 줄여서 카테고리별로 모이게 함 (15px -> 10px) */
    
    .skill-info {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 15px;
        width: 35%;
    }

    .skill-name {
        font-weight: 500;
        color: #333;
        margin-right: 5px;
    }
    
    .progress-bar-container {
        flex: 2;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .progress-bar {
        flex-grow: 1;
        height: 8px;
        background-color: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background-color:#c29180; 
        width: ${({ level }) => level}%;
    }
    
    .skill-level {
        font-size: 8pt; 
        color: #777;
        font-weight: 600;
        min-width: 25px; 
        text-align: right;
    }
`;


// ========================================================
// 1. 인쇄 상단 헤더 컴포넌트 (사진, 이름, 연락처, 요약)
// ========================================================
export const PrintHeader = ({ data }) => {
  return (
      // 🚨 상단 마진/패딩을 추가하여 전체 블록을 아래로 내립니다.
      <div className="print-header-content" style={{ paddingTop: '10px', marginBottom: '5px' }}>
          <div className="profile-contact-row">
              <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="print-profile-image"
                  /* GlobalStyles에서 스타일을 관리해야 하지만, 미리 확인을 위해 임시 인라인 스타일 적용 */
                  style={{ width: '100px', height: '130px', marginRight: '30px', borderRadius: '50% / 60%' }} 
              />
              <div className="personal-info">
                  <h1 style={{ fontSize: '22pt', marginBottom: '10px' }}>{data.name}</h1>
                  <h2 style={{ marginBottom: '18px' }}>{data.title}</h2>
                  <p>전화: {data.contact.phone} | 이메일: {data.contact.email}</p>
                  <p>주소: {data.address} | 생년월일: {data.birthdate}</p>
              </div>
          </div>
          <div className="summary-block" style={{ marginTop: '30px', paddingTop: '15px' }}>
              {data.summary.map((line, index) => (
                  <p key={index}>{line}</p>
              ))}
          </div>
      </div>
  );
};

// ========================================================
// 2. 인쇄 2열 레이아웃 컴포넌트 (학력/자격증/활동 & 스킬) - ✨간격 및 스타일 최종 반영✨
// ========================================================
export const PrintTwoColumnLayout = ({ personalData, skillsData }) => {
    // 스킬 데이터를 카테고리별로 그룹화
    const groupedSkills = skillsData.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {});

    return (
        <div className="print-two-column-layout">
            <div className="print-column-left">
                {/* 1. 학력 사항 */}
                <DetailBlock>
                    <h3>학력 사항</h3>
                    <ul>
                        {personalData.education.map((edu, index) => (
                            <li key={index}>
                                <strong>{edu.school}</strong> ({edu.period})<br />
                                {edu.degree}
                                
                                {/* GPA가 있을 경우에만 표시 */}
                                {edu.gpa && ` | 학점: ${edu.gpa}`}
                            </li>
                        ))}
                    </ul>
                </DetailBlock>

                {/* 2. 자격증 */}
                <DetailBlock>
                    <h3>자격증</h3>
                    <ul>
                        {personalData.certifications.map((cert, index) => (
                            <li key={index}>
                                <strong>{cert}</strong>
                            </li>
                        ))}
                    </ul>
                </DetailBlock>

                {/* 3. 활동/경험 */}
                <DetailBlock>
                    <h3>활동 및 경험</h3>
                    <ul>
                        {personalData.activities.map((act, index) => (
                            <li key={index}>{act}</li>
                        ))}
                    </ul>
                </DetailBlock>
            </div>

            <div className="print-column-right">
                {/* 1. 기술 능력 */}
                <h3>기술 능력</h3>
                {Object.entries(groupedSkills).map(([category, skills]) => (
                    // 카테고리 간의 간격을 늘리기 위해 margin-bottom: 35px 적용
                    <div 
                        key={category} 
                        className="skill-category-print" 
                        style={{ marginBottom: '35px' }} 
                    >
                        {/* 카테고리 제목과 첫 상세 항목 사이 간격을 띄우기 위해 스타일 조정 */}
                        <h4 style={{ marginBottom: '15px' }}>{category}</h4>
                        {skills.map(skill => (
                            <SkillItem key={skill.name} level={skill.level}>
                                <div className="skill-info">
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill" 
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                    <span className="skill-level">{skill.level}%</span>
                                </div>
                            </SkillItem>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};