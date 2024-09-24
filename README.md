# 숙박 · 예약 서비스

<br>

<div align=center>
  <a href="" target="_blank">
    <img src="https://img.shields.io/badge/GABOJAGO-006769?style=for-the-badge&logoColor=white" alt="example"/>
  </a>
</div>
<br>
<br>

📌 회원가입 절차 없이 게스트 아이디를 통해 '가보자고' 플랫폼을 이용해보세요!

<br>

```
🌟 게스트 아이디 🌟
ID : guest@email.com
PW : qqqq1111
```

<br>

```

🎯 작업 Organization Repo : https://github.com/mini-team1/FE_mini
```

## 팀원 소개 및 분담

| <p align='center'>김여진B<p>                                                                                                                                                                                                                        | <p align='center'>유현욱<p>                                                                                                    | <p align='center'>이진영</p>                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img width='60%' height='60%' src='https://github.com/toy2-1/devtube/assets/140046183/2458f0da-e1c0-41e9-8dfb-694c528c6bc0'> </p>                                                                                                 | <p align="center">![image](https://github.com/YuHyeonWook/TIL/assets/110236953/8c15475a-7cbb-4428-af4b-361d1d0e04b4) </p>      | <p align="center">![image](https://github.com/KDT1-FE/KDT_FE8_Mini-Project/assets/140046183/7af68eeb-4a42-48f6-979c-dd910b6a10e9)</p> |
| [`https://github.com/oxlzlo`](https://github.com/oxlzlo)                                                                                                                                                                                            | [`https://github.com/YuHyeonWook`](https://github.com/YuHyeonWook)                                                             | [`https://github.com/holololob`](https://github.com/holololob)                                                                        |
| 로그인, 회원가입, 이메일 찾기, 패스워드 재설정, 마이페이지(프로필 사진 업로드/수정, 핸드폰번호 재설정), 옵션 검색(키워드, 날짜, 인원수), 검색 후 데이터 필터링/렌더링, 로그인 시 header 변경, 메인페이지 스크롤 위치에 따른 header 변경/검색바 고정 | 초기 개발환경 세팅, 메인페이지(전체 숙박 조회), 장바구니, header, footer, 개별 상품 상세 조회, 개별 객실 상세 조회, 무한스크롤 | 장뱌구니, 결제, 결제확인, 주문목록 조회                                                                                               |

<br>
<br>

## 사용한 기술 스택

|            | Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 개발 환경  | <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">                                                                                                                                         |
|  유틸리티  | <img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESlint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=Prettie&logoColor=white">                                                                                                                                                                                                                                       |
|   디자인   | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                                                                                                                                                   |
| 서버/배포  | <img src="https://img.shields.io/badge/amazonwebservices-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">                                                                                                                                                                                                                                                                                                                           |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src ="https://img.shields.io/badge/chakraui-319795.svg?&style=for-the-badge&logo=chakraui&logoColor=white"/> <img src ="https://img.shields.io/badge/zustand-00465B.svg?&style=for-the-badge&logo=zustand&logoColor=white"/> <img src ="https://img.shields.io/badge/emotion-83B81A.svg?&style=for-the-badge&logo=emotion&logoColor=white"/> |
|   협업툴   | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">                                                                                                                                         |

<br>

## 프로젝트 소개

> 제작기간 : `2024.06.17 ~ 2024.07.07`  
> 제작인원 : `3명 [김여진B, 유현욱, 이진영]`

<br>

### 로그인 · 회원가입 · 아이디 찾기 · 비밀번호 재설정 페이지

![로그인](https://github.com/toy2-1/devtube/assets/140046183/cbfe49c9-afb2-47f9-b3a2-17dac88a58c8)

![회원가입](https://github.com/toy2-1/devtube/assets/140046183/117d2c0e-8005-4860-b97a-e2d254f0f456)

- 회원으로 등록된 `이메일`과 `패스워드`를 통해 로그인이 가능합니다
- `이메일`, `이름`, `핸드폰번호`를 포함한 정보를 통해 회원가입이 가능합니다
- 회원가입 시 비밀번호와 비밀번호 확인에 입력된 값이 다르면 사용자에게 알려주고, 회원가입이 불가능합니다.

![아이디찾기](https://github.com/toy2-1/devtube/assets/140046183/db6aeb07-d08a-4c8c-9338-32e089de972f)

- `이름`과 `핸드폰번호`를 입력하면 해당 데이터와 일치하는 `기존 이메일`을 확인할 수 있습니다.

![패스워드재설정](https://github.com/toy2-1/devtube/assets/140046183/5891f059-5d9d-4b9a-af91-9e58747193e5)

- `이메일`과 `새로운 패스워드`를 입력하고 입력한 `패스워드`를 검사한 후, 일치할 경우 패스워드 재설정이 가능합니다.

<br>
 
---

### 마이페이지

![마이페이지](https://github.com/toy2-1/devtube/assets/140046183/4a6cdaab-cd2e-4172-8434-abf2b2050eb2)

- 현재 로그인 되어 있는 유저의 `데이터(이름, 이메일)`를 보여줍니다
- 프로필 사진을 `업로드`, `수정`할 수 있습니다
- 마이페이지에서 `핸드폰번호` 재설정이 가능합니다
- 로그인 되어있는 경우 마이페이지에서 `패스워드` 재설정이 가능합니다
- `이름`과 `이메일`은 재설정이 불가능합니다

<br>

---

### 옵션 검색

![옵션검색](https://github.com/toy2-1/devtube/assets/140046183/3e4856f0-34ce-4889-9a42-5b0c52fb65fb)

- `키워드`, `날짜`, `인원수`를 선택하여 검색할 수 있습니다
- `키워드`는 숙박 데이터의 `주소`에 포함될 경우 필터링 됩니다

<br>

---

### 숙박 전체 조회

![image](https://github.com/YuHyeonWook/TIL/assets/110236953/8fc89eb0-7f75-47b4-bbe1-a913aa6ab156)
![image](https://github.com/YuHyeonWook/TIL/assets/110236953/c7684228-aa29-45f6-814d-0def703de480)

- 각 지역에 있는 숙박에 대한 정보 목록들을 보여줍니다.

<br>

---

### 숙박 상세 조회

![image](https://github.com/YuHyeonWook/TIL/assets/110236953/b2376317-9ab3-4ebf-b50d-b69bd735af4f)
![image](https://github.com/YuHyeonWook/TIL/assets/110236953/53ae90e0-f5a0-433f-ba92-f71ee7f3e6b4)
![image](https://github.com/YuHyeonWook/TIL/assets/110236953/9ac14b6b-f29b-4bf4-a144-eff417bea1e1)
![image](https://github.com/YuHyeonWook/TIL/assets/110236953/998f9d0b-3703-4dd7-983a-0b13304bcfb4)
![image](https://github.com/YuHyeonWook/TIL/assets/110236953/80f54125-5327-45df-adb5-e5a7e1516d7d)

- 해당 숙박에 대한 객실 상세정보를 보여줍니다.
- 객실들을 장바구니 추가, 예약할 수 있습니다.
- 로그인한 유저가 해당 객실을 장바구니로 추가하면 성공 alert창이 보여지고, 로그인 안한 유저가 장바구니 추가하면 실패한 alert창이 보여집니다.

  <br>

---

### 장바구니

![image](https://github.com/YuHyeonWook/health/assets/110236953/e73f95ab-e888-4b66-ba2f-31bd0d6a3724)

- 장바구니에 추가한 해당 객실들을 볼 수 있습니다.
- 장바구니에 추가한 아이템을 모두 삭제 및 선택해서 삭제할 수 있습니다.

<br>

---

### 결제 페이지

![image](https://github.com/YuHyeonWook/health/assets/110236953/eb50a1ec-8756-44c9-9eea-24b9b8343ef4)

- 장바구니에서 선택한 아이템을 결제합니다.
- 필수약관에 동의에 체크하지 않으면 결제 버튼이 활성화되지 않습니다.
- 체크하지 않고 결제 버튼을 누르는 경우 필수약관에 동의하여야 한다는 팝업이 표시됩니다.

<br>

---

### 결제확인 페이지

![image](https://github.com/YuHyeonWook/health/assets/110236953/025542ff-9e34-44b6-a3a8-11f4127eb2e3)

- 직전에 완료된 결제내역을 표시합니다.

<br>

---

### 전체 결제내역 확인 페이지

![image](https://github.com/YuHyeonWook/health/assets/110236953/c3cbf382-3b48-4440-9133-52f4bce6316c)

- 이전에 완료된 모든 결제내역을 표시합니다.

<br>

<br>

## Userflow

![userflow](https://github.com/mini-team1/FE_mini/assets/140046183/365b5cb6-b250-4c1d-8489-2d5f478c9ebb)
