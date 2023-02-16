---
title: 소프트웨어 자동 업데이트 기능 켜기/끄기
date: 2023-02-16 14:18:00 +0900
last_modified_at: 2023-02-16 14:18:00 +0900
categories: [Linux, Ubuntu]
tags: [Updates]
thumbnail: ubuntu-automatically-updates-1.png
---

우분투는 별도의 설정을 하지 않으면 자동으로 업데이트가 가능한 소프트웨어가 있는지 체크한다.  
하지만 업데이트를 진행하는 동안 `apt` 명령어를 사용하지 못하고, 가끔 업데이트가 가능한 소프트웨어가 있다고 띄워주는 창도 불편해서 이 기능을 아예 꺼버리려고 한다.

<br/>

## 설정
먼저 메뉴에서 "Software **&** Updates" 앱을 찾아 들어간다.  
![Search - update](ubuntu-automatically-updates-1.png)  
"&"이 없는 앱을 선택하면 즉시 업데이트가 실행된다.

<br/>

"Updates" 탭으로 들어가서 "Automatically check for updates" 값을 원하는 "Never"로 변경하면 끝.  
![Automatically check for updates - Never](ubuntu-automatically-updates-2.png)  
"Never" 대신 자동 업데이트를 실행할 주기를 선택할 수도 있다.
