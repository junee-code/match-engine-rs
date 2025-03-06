NestJS 헥사고날 아키텍처 보일러플레이트

1.  개요 : NestJS를 기반으로 헥사고날 아키텍처를 따르게 구현했습니다. 비즈니스 로직, 인프라, 애플리케이션 레이어를 명확히 분리하여 확장성과 유지보수성을 극대화하는 구조입니다.
2.  프로젝트 구조

|── src                      # 애플리케이션 소스 코드
│   ├── app.module.ts        # 루트 모듈
|   ├── main.ts              # 애플리케이션 엔트리 포인트
│   ├── application          # 애플리케이션 레이어 (DTO, Use Case)
│   │   ├── dto              # 데이터 전송 객체 (DTO)
│   │   │   ├── base         # 기본적인 DTO (예: 공통 페이징, 응답 DTO 등)
│   │   │   ├── command      # 명령형(쓰기 작업) DTO (예: 생성, 수정, 삭제 요청)
│   │   │   ├── common       # 공통적으로 사용되는 DTO (예: 기본 응답 형식 등)
│   │   │   ├── credential   # 인증 및 보안 관련 DTO (예: 파라미타 검증, 로그인, 액세스 토큰 등)
│   │   │   ├── query        # 조회(읽기 작업) DTO (예: 필터, 검색 조건)
│   │   └── use-case         # 비즈니스 로직 구현 (추상화, 핸들러)
│   ├── common               # 공통 유틸 및 공유 모듈
│   │   ├── helper           # 헬퍼 함수
│   │   └── interface        # 공통 인터페이스
│   ├── config               # 애플리케이션 설정 (예: 데이터베이스)
│   │   └── database
│   ├── domain               # 도메인 레이어 (엔티티, 모델, 값 객체 등)
│   │   ├── entity           # 데이터베이스 엔티티
│   │   ├── mapper           # 데이터 매핑 로직
│   │   ├── model            # 비즈니스 모델
│   │   ├── repository       # 도메인 레포지토리 인터페이스
│   │   └── value-object     # 값 객체 (Value Object)
│   ├── infrastructure       # 인프라 레이어 (레포지토리 및 서비스 구현체)
│   │   ├── adapter          # 레포지토리 구현체
│   │   └── implementation   # Use Case 구현체
│   |
│   └── module               # 도메인별 모듈 (예: 대시보드)
│       └── dashboard
│           ├── dashboard.controller.ts  # API 컨트롤러
│           └── dashboard.module.ts      # 대시보드 모듈 정의
|
├── README.md
├── nest-cli.json            # NestJS CLI 설정
├── package.json             # 프로젝트 의존성 및 메타데이터
├── pnpm-lock.yaml           # 패키지 관리자 락 파일
├── tsconfig.build.json      # 타입스크립트 빌드 설정
└── tsconfig.json            # 타입스크립트 설정

3.  아키텍처 개요 : 이 프로젝트는 헥사고날 아키텍처를 기반으로 아래와 같은 레이어로 구성됩니다
  3-1.  애플리케이션 레이어 (src/application/) 
    - Use Case와 DTO를 정의
    - 인프라에 의존하지 않고 애플리케이션 로직을 처리

  3-2.  도메인 레이어 (src/domain/)
    - 엔티티, 값 객체, 매퍼, 레포지토리 인터페이스 포함
    - 핵심 비즈니스 로직 및 규칙을 담당

  3-3.  인프라 레이어 (src/infrastructure/)
    - 데이터베이스 레포지토리 및 외부 서비스 구현
    - 애플리케이션 로직과 실제 환경을 연결

  3-4.  프레젠테이션 레이어 (모듈 & 컨트롤러) (src/module/)
    - API 엔드포인트 제공
    - 요청을 애플리케이션 레이어로 전달