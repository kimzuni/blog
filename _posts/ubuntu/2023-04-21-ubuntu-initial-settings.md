---
title: 우분투 초기 설정
date: 2023-04-21 17:53:00 +0900
last_modified_at: 2023-04-21 17:53:00 +0900
categories: [Linux, Ubuntu]
tags: [Setting, Mirror, 한글]
thumbnail: ubuntu-initial-settings-1.png
---

그냥 내가 설정한 것들

<br/>

## 첫 로그인
제일 처음 로그인을 하면 아래와 같은 창이 뜬다.

우분투와 다른 계정을 연결할 수 있다. 나는 그냥 Skip  
![Ubuntu - Online Accounts](ubuntu-initial-settings-1.png)

우분투 프로를 사용할 수 있다.  
우분투 계정이 필요하며, 사용 시 LTS 버전의 경우 5년 추가 지원을 해주는 등의 혜택이 있다.  
![Ubuntu - Ubuntu Pro](ubuntu-initial-settings-2.png)

우분투에게 내 시스템 정보를 보낼 것인가  
![Ubuntu - Help Improve Ubuntu](ubuntu-initial-settings-3.png)

위치 정보 동의  
![Ubuntu - Welcome to Ubuntu - Privacy](ubuntu-initial-settings-4.png)

이러한 앱들을 설치할 수 있다.  
![Ubuntu - Ready to go](ubuntu-initial-settings-5.png)

## Root Password
터미널에서 `sudo passwd` 명령어를 입력하고 루트 패스워드 설정

## Settings
상단바 오른쪽 클릭 후 Settings로 접속  
![Ubuntu - Settings Button](ubuntu-initial-settings-button.png)

### Power (Screen Blank)
시간이 지나도 화면이 꺼지지 않도록 설정  
![Settings - Power Saving Options - Screen Blank](ubuntu-initial-power.png)

### Display (Resolution)
해상도 설정
![Settings - Displays - Resolution](ubuntu-initial-displays.png)

### Region & Language (한글 입력 설정)
Format - US로 변경  
위에 "Manage Installed Languages" 클릭  
![Settings - Region & Language](ubuntu-initial-language-1.png)

조금 기다리면 이런 화면이 뜬다.  
Install 후 기다리면 언어팩 같은 게 자동으로 다운로드 된다.
{% imgbox %}
![Settings - Region & Language - Manage Installed Languages 1](ubuntu-initial-language-2.png)
![Settings - Region & Language - Manage Installed Languages 2](ubuntu-initial-language-3.png)
{% endimgbox %}

### Keyboard (한글 입력 설정)
Korean(Hangul) 추가(위 Region & Language 과정 진행 후 재부팅 필요) 후 English는 제거.  
![Settings - Keyboard](ubuntu-initial-keyboard-1.png)

Korean(Hangul)의 Preferences 선택  
![Settings - Keyboard - Korean(Hangul)](ubuntu-initial-keyboard-2.png)

표시한 단축키 Delete 후 [리눅스에서 한/영 키, 한자 키 사용하기](/posts/linux-hangul-hanja/) 설정
{% imgbox %}
![Settings - Keyboard - Korean(Hangul) - Preferences Hangul](ubuntu-initial-keyboard-3.png)
![Settings - Keyboard - Korean(Hangul) - Preferences Hanja](ubuntu-initial-keyboard-4.png)
{% endimgbox %}

재부팅하면 윈도우처럼 한/영, 한자 키 사용 가능

### Appearance
다크모드 및 테마 색상 변경  
![Settings - Appearance](ubuntu-initial-appearance.png)

## sudo 명령어 패스워드 생략
`sudo visudo` 명령으로 /etc/sudoers 파일을 쉽게 수정할 수 있다.  
파일 제일 아래에 추가해 주면 해당 유저는 sudo 명령어를 패스워드 없이 사용할 수 있다.  
![Settings - /etc/sudoers](ubuntu-initial-sudo-without-password.png)  
저장은 Ctrl+X -> y -> 엔터

## Mirror(미러) 사이트 변경
모든 리눅스가 기본값으로는 OS 사이트로 되어있기 때문에 국내 OS를 제외하면 모두 해외 서버다.  
`apt` 명령어의 `update`, `upgrade`, `install` 등을 사용할 때 속도를 올리기 위해 국내 사이트로 변경한다.  
우분투의 국내 미러 사이트는 [KAIST](https://ftp.kaist.ac.kr), [Kakao](https://mirror.kakao.com) 등이 있다.  
참고로 [NAVER](https://mirror.navercorp.com)에는 CentOS, Rocky가 있다.

`sudo vi /etc/apt/sources.list` 해당 파일을 수정해야 한다.  
모든 `kr.archive.ubuntu.com` 문자열을 `ftp.kaist.ac.kr`로 변경  
kr이 붙어서 국내 서버인 것 같지만.. 그냥 우분투 도메인에 kr만 갖다 붙인 영국 서버다.
{% imgbox %}
![Ubuntu Mirror Site Change](ubuntu-initial-sources-list-1.png)
![Ubuntu Mirror Site Changed](ubuntu-initial-sources-list-2.png)
{% endimgbox %}
데비안의 경우 security 미러도 KAIST 서버에 있어서 변경할 수 있는데 우분투는 다른 미러 사이트에도 없다.

### 적용 및 확인
우분투 설치 후 첫 `apt upgrade` 명령어는 시간이 오래 걸리는 게 정상이다.  
데스크탑에 설치된 것들을 최신 버전으로 업데이트하는 것이니 생각날 때마다 해주는 것이 좋다.

차례대로 실행해야 한다.
{% imgbox %}
![Terminal - apt update](ubuntu-initial-apt-update.png)
![Terminal - apt full-upgrade](ubuntu-initial-apt-upgrade.png)
![Terminal - apt autoremove](ubuntu-initial-apt-autoremove.png)
{% endimgbox %}
