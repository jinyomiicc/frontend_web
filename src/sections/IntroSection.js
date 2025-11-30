// src/sections/IntroSection.js

import React from 'react';
import styled from 'styled-components';
// 🚨 1. 사진 파일 임포트: 실제 이미지 경로와 파일명으로 수정하세요.
import profileImage from '../assets/profile.jpg'; 

// --- 스타일 컴포넌트 ---

const IntroContent = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center;
  gap: 50px; /* 사진과 텍스트 사이 간격 */
  max-width: 900px;
  width: 100%;
`;

const ProfileImage = styled.img`
  /* 세로로 긴 타원형 모양 스타일 */
  width: 250px; /* 가로 길이 */
  height: 300px; /* 세로 길이 */
  object-fit: cover; /* 이미지 비율 유지 */
  
  /* 타원 모양 만들기: border-radius를 50% / 50%로 설정 */
  border-radius: 50% / 50%; 
  border: 4px solid ${({ theme }) => theme.primary}; /* 테마 색상으로 테두리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 왼쪽 정렬 */
  text-align: left;
`;

const Title = styled.h1`
  font-size: 4em;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 2em;
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
`;

const SummaryList = styled.ul`
  list-style: none;
  text-align: left; /* 텍스트 정렬 변경 */
  font-size: 1.1em;
  color: ${({ theme }) => theme.text};
  max-width: 600px;

  li {
    margin-bottom: 8px;
    white-space: pre-wrap;
  }
`;

// --- 컴포넌트 로직 ---

const IntroSection = ({ data }) => {
  if (!data) return <div>데이터 로딩 중</div>;
  
  return (
    <section id="intro-section">
      <IntroContent>
        {/* 2. 이미지 컴포넌트 추가 */}
        <ProfileImage 
          src={profileImage} 
          alt={`${data.name} 프로필 사진`} 
        />
        
        <TextContent>
          <Title>{data.name}</Title>
          <SubTitle>{data.title}</SubTitle>
          <SummaryList>
            {data.summary.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </SummaryList>
        </TextContent>
      </IntroContent>
    </section>
  );
};

export default IntroSection;