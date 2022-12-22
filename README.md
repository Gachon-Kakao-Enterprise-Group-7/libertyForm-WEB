

<p align="center"><img src="https://user-images.githubusercontent.com/45286570/209203950-c74081d1-2127-4800-ad24-73292b72c6b1.png" width="100" height="100"/></p>
<p align="center">편리하고 자유로운 설문 플랫폼 - <b>LibertyForm</b></p>


# 🔖Index

## Introduction
* What is LibertyForm?
* I.A(Information Architecture)
* S.A(System Architecture)

## Features
* Main + Onboarding
* Signup
* Login
* Dashboard
* Make Survey
* Make Survey Response Link
* Edit Survey
* Preview Survey
* Send History Management
* Delete Survey
* Send Survey by Email
* Address Book
* Response Survey
* Survey Analysis (with machine learning & deep learning)


<br>
<br>



## What is LibertyForm❓
편리하고 자유로운 설문 플랫폼 <b>리버티폼</b> 입니다.<br>
지루하고 딱딱한 설문은 구시대적입니다.<br>
슬라이드 형식으로 보여지는 설문으로 당신이 표현하고 싶은 모든것을 표현하세요.

<br>

## I.A(Information Architecture)
* Survey Creator
 ![image](https://user-images.githubusercontent.com/45286570/209201835-370fbc8e-8fee-4807-9d8f-3a40e89685b2.png)


* Survey Respondents
  <p align="center"><img src="https://user-images.githubusercontent.com/45286570/209201864-6c5cdc5f-22ca-4c01-bdb2-a9db5ed6c87c.png" width="150" height="360"/></p>



<br>

## S.A(System Architecture)
![image](https://user-images.githubusercontent.com/45286570/209202945-62e0a17b-2a66-4321-9e32-98600b43c946.png)

<br>
<br>

# Features


## Main + Onboarding
![image](https://user-images.githubusercontent.com/45286570/209203477-4ec3a6fb-0935-4df9-a20f-4e53fb4c4f90.png)
![image](https://user-images.githubusercontent.com/45286570/209203495-48b82aa1-fc59-40ac-b5d7-580779504877.png)
- 사용자가 페이지에 접속할 때, 처음 보여지는 화면
- 화면 중앙의 시작하기 버튼을 통해 설문 리스트를 보여주는 대시보드로 이동할 수 있다.
- Fullpage 라이브러리를 통해 화면단위로 스크롤 되도록 구현함
- Liberty Form의 주요 기능들을 소개하는 온보딩 페이지를  구현함

<br>

## Signup
  ![image](https://user-images.githubusercontent.com/45286570/209204585-c8a92a50-e794-4ced-8a35-e47512fdaa43.png)
- 회원가입시 이메일, 패스워드, 패스워드확인, 이름을 수집한다.
- 회원가입시 올바르지 않은 형식의 이메일, 패스워드를 입력할 경우 경고 메세지를 출력
- 이메일, 패스워드는 정규식을 이용하여 검증한다.

<br>

## Login
  ![image](https://user-images.githubusercontent.com/45286570/209204698-847e2453-e9c8-4acb-9cb5-495a9b46a70c.png)
- 사용자는 일반로그인, 소셜로그인을 이용해 로그인 할 수 있다.
- 소셜로그인은 카카오 로그인을 지원한다.

<br>

## Dashboard
![image](https://user-images.githubusercontent.com/45286570/209204931-131ecbce-c347-4c7b-9ff4-4c5ac5e5c368.png)
- 사용자가 로그인을 하고 시작하기 버튼을 눌렀을때 보여지는 화면이다.
- 왼쪽 사이드바에는 현재 설문 현황을 보여주고 리버티폼의 다양한 서비스를 이용 할 수 있다.
- 화면 중앙에는 진행중 설문, 완료된 설문으로 나누어 보여진다.
    - 진행중 설문은 드롭다운 버튼을 클릭했을때 링크생성, 수정하기, 미리보기, 이력관리, 마감하기, 삭제하기 기능을 제공한다.
    - 완료된 설문은 드롭다운 버튼을 클릭했을때 미리보기, 이력관리 삭제하기 기능을 제공한다.

<br>

## Make Survey
![image](https://user-images.githubusercontent.com/45286570/209205716-11a34e71-8191-42f3-9f08-c4da94597d48.png)
- 사용자는 대시보드 왼쪽의 새로운 설문 생성 버튼을 클릭해 설문을 생성 할 수 있다.
- 사용자는 설문 배경으로 사용할 사진파일을 업로드 할 수 있다.
- 사용자가 입력한 설문 배경, 제목, 상세정보는 미리보기 모니터창에 보여진다.
- 사용자는 질문 추가를 통해서 질문을 추가 할 수 있다.
- 사용자는 설문 유형으로 객관식(단일, 복수), 단답형, 장문형, 감정바, 선형표현을 선택할 수 있다.
- 사용자는 필수답변 여부를 선택 할 수 있다.


<br>

## Make Survey Response Link
![image](https://user-images.githubusercontent.com/45286570/209205487-2e2ddc60-12e9-4cf6-912b-104cf6b879aa.png)
- 진행중 설문 → 드롭다운 버튼 클릭 → 링크 생성 을 통해서 설문 링크를 생성 할 수 있다.
- 설문 생성자는 발송자 지정 공유를 실시할 수 있으며 버튼을 클릭시 설문 이메일 발송 페이지로 이동할 수 있다.
- 설문 생성자는 설문 링크를 복사하여 원하는 곳에 사용 할 수 있다.


<br>

## Edit Survey
 ![image](https://user-images.githubusercontent.com/45286570/209206362-5b349624-6213-46da-912a-16af12fa99f1.png)
- 진행중 설문, 완료된 설문 → 드롭다운 버튼 클릭 → 설문 수정를 통해 수정 할 수 있다.
- 설문 수정의 경우 상단의 이미지 위에 수정이라고 명시되어있고 기존에 입력된 정보를 확인하여 수정을 진행할 수 있다.

<br>


## Preview Survey
![image](https://user-images.githubusercontent.com/45286570/209206482-b3930cf2-b3fa-4cef-a9b5-080ea6c03f52.png)
- 진행중 설문, 완료된 설문 → 드롭다운 버튼 클릭 → 미리 보기를 통해서 볼 수 있다.
- 설문 제목, 생성, 만료일과 질문에 대한 상세 내용을 보여주어 설문 생성자는 생성한 질문을 한눈에 볼 수 있다.

<br>

## Send History Management
![image](https://user-images.githubusercontent.com/45286570/209206638-e98bd814-bb29-46ae-807f-65e01ff63baf.png)
- 진행중 설문, 완료된 설문 → 드롭다운 버튼 클릭 → 이력 관리를 통해서 볼 수 있다.
    - 읽지않음 : 설문 링크를 클릭하지 않은 상태
    - 읽음 : 설문 링크를 클릭했지만 설문에 응하지 않은 상태
    - 제출완료 : 설문링크를 클릭하고 설문을 완료 한 상태

<br>

## Delete Survey
![image](https://user-images.githubusercontent.com/45286570/209206749-678106da-c740-4ceb-837b-c16d1f8650e7.png)
- 진행중 설문, 완료된 설문 → 드롭다운 버튼 클릭 → 설문 삭제를 통해 삭제 할 수 있다..
- 사용자는 더이상 필요없는 질문에 대해 삭제를 수행 할 수 있고 모달창을 통해 사용자의 의사를 한번 더 확인하고 삭제를 진행한다.


<br>

## Send Survey by Email

  ![image](https://user-images.githubusercontent.com/45286570/209205994-87fafb1b-9f9e-45eb-9cf8-5c08a2131334.png)
- 설문 실시 링크를 원하는 대상에게 이메일로 전송 할 수 있다.
- 설문 선택에서 사용자가 생성한 설문중에 선택 할 수 있다.
- 그룹에서 선택은 사용자가 미리 저장한 주소록이 그룹별로 보여지고 발송 리스트에 쉽게 추가할 수 있다.
- 사용자 직접 추가는 사용자가 이메일을 직접 입력하여 발송 리스트에 추가 할 수 있다.


<br>

## Address Book

![image](https://user-images.githubusercontent.com/45286570/209207133-e8cd59c2-6329-4127-b757-6efb55e07dbb.png)
- 사용자는 자주 사용하는 설문 대상자를 주소록에 추가 할 수 있다.
- 유저 추가를 통해 이메일, 이름, 관계를 설정하고 등록 한다.
- 이미 Liberty Form에 등록된 사용자라면 회원여부가 체크된다.
- 페이징 처리를 통해서 한 페이지에 15명의 사용자 씩 보여준다
- 이름검색 기능을 통해 입력한 내용에 필터링되어 사용자에게 보여진다.

<br>

## Response Survey

![image](https://user-images.githubusercontent.com/45286570/209207345-5da7d1fd-765a-431d-ae6e-d147d2274343.png)
- 설문 링크에 접속하면 처음 보여지는 화면이다. 설문 제목, 설명, 문항수, 시작버튼이 보여진다.
- 배경은 설문 생성자가 등록한 이미지를 배경으로 사용한다.

![image](https://user-images.githubusercontent.com/45286570/209207359-93ef2816-2ff3-4b43-8df9-3e0beff736ca.png)
- <b>객관식(다중선택)</b>으로 사용자는 여러개의 보기 중 다중으로 선택 할 수 있다.
- 상단의 진행바를 통해서 현재 설문 진행도를 보여준다.
- 필수문항 여부는 질문 뒤에  빨간 * 표시가 붙어나온다.
    - 필수문항 미응답시 다음문항으로 넘어 갈 수 없도록 구현

![image](https://user-images.githubusercontent.com/45286570/209207387-052c0724-dfab-4317-99e3-401f1645fff0.png)
- <b>객관식(단일선택)</b>으로 사용자를 여러개의 보기 중 한가지를 선택 할 수 있다.

![image](https://user-images.githubusercontent.com/45286570/209207423-32f9c4dc-70a5-47ed-9d86-311854e23884.png)
- <b>주관식</b>으로 질문에 대한 응답을 자유롭게 할 수 있다.

![image](https://user-images.githubusercontent.com/45286570/209207442-bb37e52d-3fe8-495f-9511-6c7fd535cb24.png)
- <b>선형표현</b>으로 5개의 단계중에서 한가지를 선택할 수 있다. 

![image](https://user-images.githubusercontent.com/45286570/209207470-79207d42-17f0-46fe-b38d-9d28054e15f8.png)
- <b>감정표현식</b>으로 0~100사이의 척도를 마우스 스크롤으로 표현 할 수 있다.


<br>

## Survey Analysis (with machine learning & deep learning)
![image](https://user-images.githubusercontent.com/45286570/209208181-81448048-f899-4dec-9de4-6748af540445.png)
- 사용자는 설문 응답에 대해 다양한 분석 결과를 볼 수 있다.
- 객관식은 막대차트를 통해 결과를 보여준다.
- 주관식(장문)은 워드클라우드, 감정분석, 원본데이터 결과를 보여준다.
- 주관식(단문)은 워드클라우드, 원본데이터 결과를 보여준다.
- 감정바는 파이차트를 통해 결과를 보여준다.
- 선형배율은 막대차트를 통해 비율에 대한 결과를 보여준다.


<br>
<br>

# 👨‍👩‍👧‍👦 SEE ALSO

> [LIBERTYFORM 바로가기](https://liberty-form.shop/)
>
> [LIBERTYFORM 상세설명(노션)](https://gachonkakao.notion.site/366e0b11df094a2db419d16e01c7cdbe)


<br>

### LIBERTYFORM 실행
---
```sh
npm install --force
npm start
```

<br>

### 멤버
---
| 이름                                                  | 역할             | 비고                                                        |
| ----------------------------------------------------- | ---------------- | ------------------------------------------------------------ |
| [김형준](https://github.com/hyeong-jun-kim)       | PM, BE, 기획 | |
| [백우진](https://github.com/bwj0509) | FE, 기획 |  |
| [이가영](https://github.com/gayoung1115)     | FE, 기획 |  |
| [이상협](https://github.com/dltkdguq97)  | ML, 기획 | |
| [한만규](https://github.com/bluesushi264)     | FE, 기획 |  |

  <br>

### Awards
---
🥇 <b>가천-카카오엔터프라이즈 SW아카데미 최우수 프로젝트 선정 </b>
  
  
