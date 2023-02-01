# HealthSNS

##  목차
- [서비스 소개](#서비스-소개)
- [기술스택](#기술스택)
- [향후계획](#v2-계획)
----
## 서비스 소개
### 1. HealSNS란
 - 먹은 음식을 공유하고 기록 할수있는 SNS

### 2. 기능소개
#### 2-1 로그인 및 회원가입
 - 로그인
 - 회원가입
    - 메일인증 필요

![image.jpg1](/Image/로그인.png)|![image.jpg1](/Image/회원가입.png)|![image.jpg1](/Image/중복확인.png)|![image.jpg1](/Image/%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4%20%EC%88%98%EC%A0%95.png)
--- | --- | --- | --- | 



#### 2-2. 게시글
- 게시글
    - 좋아요
    - 게시글 검색
    - 좋아요 누른 게시글만 보기 
- 게시글 등록
    - 이미지 업로드 가능
- 게시글 수정

![image.jpg1](/Image/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EB%93%B1%EB%A1%9D.png)|![image.jpg1](/Image/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%88%98%EC%A0%95.png)|![image.jpg1](/Image/게시글.png)|![image.jpg1](/Image/검색.png)|![image.jpg1](/Image/%EC%A2%8B%EC%95%84%EC%9A%94%20%EB%B3%B4%EA%B8%B0.png)|![image.jpg1](/Image/메인화면.png)
--- | --- | --- | --- | --- | --- |

#### 2-3. 관리
- 음식등록
    - 처음등록하는 음식은 정보를 모두 입력
    - 2번째 등록 부터는 음식이름, 먹은 음식 그램 만 입력해도 등록 가능
- 차트보기
    - Pie 차트 : 기간동안 칼로리
    - Bar 차트 : 성분 상세보기

![image.jpg1](/Image/먹은음식.png)|![image.jpg1](/Image/차트.png)
--- | --- | 

----
## 기술스택
 - BackEnd
    - SpringBoot MVC
    - MySQL & Redis
    - JPA & QueryDsl
    - Spring Security & JWT
    - STMP

- FrontEnd
    - React & React-router
    - Chart.JS
    - Redux
    - Axios & Proxy
    - Bootstrap
----

## V2 계획
1. 음식과 식사 1:N 관계로 설계하였으나 이렇게 될 경우 나만의 음식을 저장할수없음 해결방안 생각 ( 수정완료 : 음식에 uid추가로 개인별 음식 가능하게 변경 )
2. 비밀번호 확인 추가 ( 수정완료 )
3. 식사 입력 시 스크립트 기능 추가
4. 댓글기능 추가 ( 수정완료 )
5. 에러페이지 추가
