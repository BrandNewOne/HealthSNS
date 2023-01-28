# HealthSNS

##  목차
- [서비스 소개](#서비스-소개)
- [기술스택](#기술스택)
- [향후계획](#향후계획)
----
## 서비스 소개
### 1. HealSNS란
 - 먹은 음식을 공유하고 기록 할수있는 SNS

### 2. 기능소개
#### 2-1 로그인 및 회원가입
<figure class="image">
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/로그인.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/회원가입.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/중복확인.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/회원정보 수정.png" width="100" height="130"/>
</figure>

#### 2-2. 게시글
<figure class="image">
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/게시글 등록.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/게시글 수정.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/게시글.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/검색.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/좋아요 보기.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/메인화면.png" width="100" height="130"/>
</figure>

#### 2-3. 관리
<figure class="image">
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/먹은음식.png" width="100" height="130"/>
    <img src="https://github.com/BrandNewOne/HealthSNS/blob/main/Image/차트.png" width="100" height="130"/>
</figure>

----
## 기술스택
 - BackEnd
    1. SpringBoot MVC
    2. MySQL & Redis
    3. JPA & QueryDsl
    4. Spring Security & JWT
    5. STMP

- FrontEnd
    1. React & React-router
    2. Chart.JS
    3. Redux
    4. Axios & Proxy
    5. Bootstrap
----

## V2 계획
1. 음식과 식사 1:N 관계로 설계하였으나 이렇게 될 경우 나만의 음식을 저장할수없음
2. 비밀번호 확인 추가
3. 식사 입력 시 스크립트 기능 추가
