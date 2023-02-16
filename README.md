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

![image.jpg1](/Image/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png)|![image.jpg1](/Image/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png)|![image.jpg1](/Image/%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4%20%EC%88%98%EC%A0%95.png)
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


![image.jpg1](/Image/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EB%93%B1%EB%A1%9D.png)|![image.jpg1](/Image/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%88%98%EC%A0%95.png)|![image.jpg1](/Image/%EA%B2%8C%EC%8B%9C%EA%B8%80.png)|![image.jpg1](/Image/%EB%8C%93%EA%B8%80.png)|![image.jpg1](/Image/%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B4.png)
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

![image.jpg1](/Image/%EB%82%98%EC%9D%98%20%EC%9D%8C%EC%8B%9D.png)|![image.jpg1](/Image/%EC%98%A4%EB%8A%98%EB%A8%B9%EC%9D%80%20%EC%9D%8C%EC%8B%9D.png)|![image.jpg1](/Image/%EC%B0%A8%ED%8A%B8.png)
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
4. 에러페이지 추가