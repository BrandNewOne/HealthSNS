# HealthSNS

##  목차
- [서비스 소개](#서비스-소개)
- [기술스택](#기술스택)
- [향후계획](#향후계획)
----
## 서비스 소개
### 1. HealthSNS란
 - 먹은 음식을 공유하고 기록 할수있는 SNS

### 2. 기능소개
#### 2-1 로그인 및 회원가입
 - 로그인
 - 회원가입
    - 메일인증 필요
 - 회원정보수정

![image.jpg1](/Image/로그인.png)|![image.jpg1](/Image/회원가입.png)|![image.jpg1](/Image/회원정보 수정.png)
--- | --- | --- |


#### 2-2. 게시글
- 게시글
    - 좋아요
    - 게시글 검색
    - 좋아요 누른 게시글만 보기 
    - 댓글
- 게시글 등록
    - 이미지 업로드 가능
- 게시글 수정


![image.jpg1](/Image/게시글 등록.png)|![image.jpg1](/Image/게시글 수정.png)|![image.jpg1](/Image/게시글.png)|![image.jpg1](/Image/게시글.png)|![image.jpg1](/Image/메인화면.png)
--- | --- | --- | --- | --- |

#### 2-3. 관리
- 나의 음식등록
    - 검색 클릭 시 음식 정보 알려줌 출처(fatsecret-kr)
    - 처음 등록하는 음식은 정보를 모두 입력
    - 2번째 등록 부터는 음식이름 입력 후 엔터를 누르면 정보 자동 기입
    - 등록된 음식 comboBox로 알려줌
    - 등록 한 음식 데이터 수정, 삭제 가능
- 먹은 음식 등록
    - 처음 등록 하는 음식 등록가능
    - 등록된 음식 comboBox로 알려줌
    - 등록된 음식이름 입력 후 엔터를 누르면 정보 자동 기입
- 차트보기
    - Pie 차트 : 기간동안 칼로리
    - Bar 차트 : 성분 상세보기
    - 먹은 음식 Table
    - 먹은 음식 삭제가능

![image.jpg1](/Image/나의 음식.png)|![image.jpg1](/Image/오늘먹은 음식.png)|![image.jpg1](/Image/차트.png)
--- | --- | --- |

----
## 기술스택
 - BackEnd
    - SpringBoot MVC
    - MySQL & Redis
    - JPA & QueryDsl
    - Spring Security & JWT
    - JSoup
    - STMP

- FrontEnd
    - React & React-router
    - Chart.JS
    - Redux & Context Api
    - Axios & Proxy
    - Bootstrap
----

## 향후계획
1. 음식등록의 검색 데이터 자동 파싱
2. UI 일관성 있게 개선
3. Toast메세지와 오류 메세지 두개를 띄우고있는데 어떨때 어떤 메세지를 띄울지 생각