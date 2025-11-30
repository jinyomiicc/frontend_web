// src/data/portfolioData.js

export const personalData = {
  name: "임진영",
  title: "S/W 개발자",
  birthdate: "2004. 11. 25",
  address: "경기도 안양시 만안구 박달동",
  summary: [
    "웹 개발 프로젝트를 통해 프론트엔드와 백엔드를 모두 경험하며 ",
    "전체적인 개발 흐름을 이해하게 되었습니다.",
    "특히 Spring Boot와 MySQL을 활용한 웹 서비스 구현에 자신이 있습니다.",
    "JAVA 기반의 백엔드 개발과 데이터베이스 연동 경험이 있으며 ",
    "다양한 프로젝트를 통해 개발 능력을 쌓았습니다.",
  ],
  contact: {
    phone: "010-7249-2924",
    email: "jinyou0406@naver.com",
    github: "https://github.com/jinyomiicc?tab=repositories"
  },
  education: [
    {
      degree: "컴퓨터정보과",
      school: "인하공업전문대학",
      period: "2023.3 ~ 2026.2",
      gpa: "4.2/4.5"
    },
     {
      degree: "관광경영과",
      school: "평촌경영고등학교",
      period: "2020.3 ~ 2023.2"    }
  ],
  activities: [
    "컴퓨터정보공학과 학과 반대표 (2년)",
    "학과 학생회 홍보부장 (학과 행사 포스터 및 안내문 제작, SNS)",
    "Fly-튜터링_C언어, 컴퓨터구조",
    "Digital DX 인하몬 GO 랭크 3위 수상"
  ],
  certifications: [
    "정보처리기능사 (2025.08)",
    "컴퓨터활용능력 1급 필기(2025.03)",
    "운전면허 2종 (2024.05)",
    "한국사능력검정시험 3급 (2023. 03)",
    "조주기능사 (2022.07)"    
  ]
};

export const skillsData = [
  { category: "BACKEND", name: "Java", level: 90 },
  { category: "BACKEND", name: "Spring Boot", level: 85 },
  { category: "BACKEND", name: "Python", level: 80 },
  { category: "BACKEND", name: "JSP", level: 80 },
  { category: "BACKEND", name: "C#", level: 75 },
  { category: "FRONTEND", name: "JavaScript", level: 90 },
  { category: "FRONTEND", name: "React.js", level: 90 },
  { category: "FRONTEND", name: "Android Studio", level: 85 },
  { category: "DATABASE", name: "MYSQL", level: 90 },
  { category: "DATABASE", name: "Oracle", level: 90 },
  { category: "DATABASE", name: "MS Access", level: 85 },
  { category: "ETC", name: "Figma", level: 90 },
  { category: "ETC", name: "Excel VBA", level: 80 },
  { category: "ETC", name: "빅데이터", level: 70 },
];

export const projectsData = [
  {
    id: 1,
    name: "새로고침",
    title: "중고마켓 플랫폼",
    peroid: "2024. 09 - 2024. 12",
    imageSrc: [
      require('../assets/새로고침1.png'), // 첫 번째 이미지 (메인)
      require('../assets/새로고침2.png')   // 두 번째 이미지 (서브)
  ],
    role: "Front-End",
    summary: "사용자 위치 기반 편의시설 추천이 가능한 중고마켓 웹 어플리케이션",
    stack: ["React.js", "Spring Boot", "MySQL", "JPA", "Kakao API", "Geolocation API", "Firebase (Realtime Chat)"],
    contribution: "80%",
    details: {
      keyFeatures: ["간편 로그인", "게시글 작성/조회/찜 기능", "실시간 채팅 기능", "중간 장소 도우미 (위치 기반 추천)"],
      myRole: ["프론트엔드 UI 구현", "마크업 구조 설계", "카카오 로그인 초기 연동"],
    },
  },
  {
    id: 2,
    name: "TREENET",
    title: "연말 카드 작성 웹 어플리케이션",
    imageSrc: [
      require('../assets/TreeNet_1.jpg'), // 첫 번째 이미지 (메인)
      require('../assets/TreeNet_2.jpg')   // 두 번째 이미지 (서브)
  ],
    peroid: "2024. 11 - 2024. 12",
    role: "Full-Stack",
    summary: "개인 트리 생성 및 고유 코드를 통한 크리스마스 편지 공유 서비스",
    stack: ["JSP", "Servlet", "Java", "MYSQL", "Apache Tomcat"],
    contribution: "100%",
    details: {
      keyFeatures: ["회원가입/개인 트리 생성", "고유 코드 기반 공유", "트리에 장식 이미지와 함께 편지 표시", "고유 코드 및 비밀번호 입력 시 트리 조회"],
      myRole: ["전체 기능 기획 및 구현", "JSP를 활용한 프론트-백엔드 통합 개발", "입력 처리, 데이터 저장/조회, 동적 페이지 출력 구현"],
    },
  },
  {
    id: 3,
    name: "MOMENT CAPTURE",
    title: "감정일기 & 노래 추천 시스템",
    peroid: "2024. 11 - 2024. 01",
    role: "Back-End",
    summary: "Java Swing 기반 일기 작성 및 기분 데이터 기반 노래 추천 시스템",
    stack: ["Java", "NetBeans (IDE)", "MySQL", "Java Swing (UI)"],
    contribution: "90%",
    details: {
      keyFeatures: ["캡챠 검증", "일기 작성 (날짜, 기분, 내용 입력)", "기분 기반 노래 추천 (DB 연동)", "일기 목록 자동 갱신 및 조회"],
      myRole: ["백엔드 로직 및 DB 연동 전반 구현", "회원가입 시 캡챠 인증 기능 개발", "사용자 인증 및 일기 CRUD 처리", "감정 기반 노래 추천 기능 구현"],
    },
  },
  {
    id: 4,
    name: "기사는 타이밍",
    title: "게임 테마 웹 애플리케이션",
    peroid: "2025. 03 - 2025. 06",
    imageSrc: [
      require('../assets/기사는타이밍_1.png'), // 첫 번째 이미지 (메인)
      require('../assets/기사는타이밍_2.png')   // 두 번째 이미지 (서브)
  ],

    role: "Back-End",
    summary: "기사는 타이밍 게임 기반 커뮤니티 웹사이트. JWT 인증 및 BCrypt 암호화 적용",
    stack: ["React.js", "Spring Boot", "JPA", "Spring Security", "JWT", "MySQL"],
    contribution: "100%",
    details: {
      keyFeatures: ["회원가입/로그인 (JWT)", "비밀번호 암호화 (BCrypt)", "게시글 목록 페이징 처리", "로그인 사용자 기반 글쓰기 제한"],
      myRole: ["백엔드 로직 개발 및 DB 연동", "JWT 토큰 발급 및 인증 기능 구현", "비밀번호 암호화 처리", "게시글 작성 권한 제어 및 페이징 기능 구현"],
    },
    githubUrl: "https://github.com/Terrrrrrra/TTmKweb.git", 
  },
];