// src/sections/ContactSection.js
import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  font-size: 4em;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 1.5em;
  text-align: center;
`;

const ContactItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  a {
    color: ${({ theme }) => theme.secondary};
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
  }
`;

const ContactSection = ({ data }) => {
    if (!data) return <div>데이터 로딩 중...</div>;
    
    return (
        <section id="contact-section">
            <SectionTitle>Contact</SectionTitle>
            <ContactInfo>
                <ContactItem>
                    📞 전화: {data.phone}
                </ContactItem>
                <ContactItem>
                    📧 이메일: <a href={`mailto:${data.email}`}>{data.email}</a>
                </ContactItem>
                <ContactItem>
                    💻 GitHub: <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub Address</a>
                </ContactItem>
            </ContactInfo>
        </section>
    );
};

export default ContactSection;
