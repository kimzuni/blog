---
title: 우분투 설치
date: 2023-04-16 10:08:00 +0900
last_modified_at: 2023-04-21 17:30:00 +0900
categories: [Linux, Ubuntu]
tags: [Install]
thumbnail: ubuntu-installation-1.png
---

이 포스트에서는 가상머신이 아닌 **실제 디스크**에 우분투를 설치합니다.  
이 포스트에서는 Windows와 Ubuntu의 **멀티부팅을 다루지 않습니다.**  
이 과정에서 **포맷**{: .danger}이 진행되기 때문에 중요한 데이터가 날아갈 수 있습니다.  
**잘 모른다면 가상머신에 설치하세요. 저는 아무런 책임도 지지 않습니다.**{: .danger}
{: #post-notice .danger}

<br/>



오늘 수업 중에 60GB라는 대용량의 여유 공간이 필요하다는 말에 저번부터 업그레이드해야지 했던 SSD를 드디어 구매..  
내장 SSD를 교체하고 지금 SSD는 ~~케이스 사서 외장으로 사용할 예정.~~ 데스크탑 사면 추가로 장착할 예정.  
아무래도 2TB 짜리를 사서 외장으로 쓰지는 않을 듯..

SSD 교체하고 우분투를 재설치하면서 tar로 백업으로 복구하려고 했으나 블로그에 글 올릴 거리도 필요하고 해서 우분투 설치 방법부터 이것저것 설치나 설정하는 것까지 글을 올려보려고 한다.  
일단 우분투 설치 과정은 SSD 오기 전에 가상머신에서 진행하는 걸로.

<br/>

## 준비물 및 유의사항
1. 우분투 ISO 파일 다운로드
2. ~~4GB~~ ISO 파일 크기 이상의 저장 장치
  - 대부분 USB를 사용한다.
  - 저장 장치를 **포맷**{: .danger}하기 때문에 데이터 백업 필수
3. ISO 파일을 부팅 USB로 만들어줄 프로그램
  - Windows: 기본 기능 (Only CD/DVD), Rufus 프로그램 등
  - Unix/Linux: `dd` 명령어
  - Ubuntu: "Startup Disk Creator(시동 디스크 만들기)" 프로그램 등
4. 우분투를 설치할 디스크 및 USB
  - 리눅스는 USB에도 설치가 가능하다..!
  - 설치할 저장 장치도 **포맷**{: .danger}하기 때문에 백업 필수

가상머신에 설치한다면 다 필요 없고 ISO 파일만 있으면 된다.

<br/>

## 우분투 부팅 USB 만들기
먼저 [우분투 홈페이지](https://ubuntu.com/download/desktop)에서 LTS 버전으로 다운로드  
일반 버전은 9개월, LTS(Long Term Support) 버전은 5년(ESM 사용 시 10년)동안 지원한다. 새로운 버전이 나올 때마다 업그레이드 할 예정이 아니라면 LTS 버전를 쓰자.  
![Ubuntu ISO File Download](ubuntu-installation-iso-download-page.png)  
버전이 22.04.1에서 04.2로 오르면서 용량이 3.6G에서 4.6G로 커졌다. 그래서 8GB 이상의 USB가 필요하다.

### Windows의 기본 기능 (CD/DVD)
다운로드 한 ISO 파일 우클릭하면 목록 중에 굽기가 있다.  
Windows 11은 우클릭 후 더 많은 옵션 보기

USB 대신 CD/DVD에 직접 구워 사용할 수 있다.

### Rufus (Windows)
Rufus 홈페이지에서 프로그램 다운로드  
![Rufus Download](ubuntu-installation-rufus-0.png)

장치에서 부팅 USB로 만들 USB 선택  
부트 유형 오른쪽에 선택 버튼 클릭 후 ISO 파일 선택  
나머지는 기본값
{% imgbox %}
![Rufus - ISO, USB Select](ubuntu-installation-rufus-1.png)
![Rufus - ISO Image, DD Image Select](ubuntu-installation-rufus-2.png)
{% endimgbox %}

**포맷**{: .danger}된다는 경고창  
![Rufus - Format Warning](ubuntu-installation-rufus-3.png)

진행 중  
상태에 "준비 됨" 이라고 뜨면 완료.  
완료되면 닫기. 시작 누르면 다시 시작한다.
{% imgbox %}
![Rufus - Progress](ubuntu-installation-rufus-4.png)
![Rufus - Suceess](ubuntu-installation-rufus-5.png)
{% endimgbox %}

### dd 명령어 (Unix/Linux)
**부팅 USB로 만들 USB가 sda인지 sdb, sdc인지 아니면 또 다른 파일명인지 확인할 수 있는 경우에만 사용해야 한다.**{: .danger}  
무작정 아래 명령어만 따라친다면 다른 USB 파일이 포맷되거나, 내장 디스크 종류에 따라 sda로 인식하는 경우도 있는데 해당 디스크에 OS가 설치되어 있으면 시스템이 싹 날아가 버린다.

```terminal
# sudo dd bs=10M if=/path/to/ubuntu.iso of=/dev/Diskfile status=progress oflag=sync && sync
```

파티션을 선택해도 되지만 디스크 자체를 선택해도 된다.  
파티션을 선택할 경우 해당 파티션의 크기가 ISO 파일보다 크거나 같아야한다.
![dd Command](ubuntu-installation-dd-command.png)

### Startup Disk Creator(시동 디스크 만들기) (Ubuntu)
우분투에 기본적으로 설치되어 있는 프로그램을 사용할 수 있다.  
다른 리눅스 배포판에도 있는 프로그램인지는 모르겠다.

프로그램 검색  
![Menu - Startup Disk Creator](ubuntu-installation-startup-disk-creator-0.png)

Other을 눌러 ISO 파일 선택, 밑에는 부팅 USB를 만들 USB 선택
{% imgbox %}
![Startup Disk Creator - ISO, USB Select](ubuntu-installation-startup-disk-creator-1.png)
![Startup Disk Creator - Yes or No](ubuntu-installation-startup-disk-creator-2.png)
{% endimgbox %}
root 권한이 필요하기 때문에 패스워드를 묻는 창이 나타난다. 정상이다.

몇 분만 기다리다 보면  
![Startup Disk Creator - Progress 99%](ubuntu-installation-startup-disk-creator-3.png)

완료 창이 뜬다. "Quit"  
여기서 "Test Disk"를 누르면 부팅 USB가 실행된다.  
![Startup Disk Creator - Quit](ubuntu-installation-startup-disk-creator-4.png)

<br/>

## 우분투 설치하기
먼저 PC에 부팅 USB를 연결한 채로 BIOS로 진입해야 해서 부트 순서 1순위를 해당 USB로 변경해야 한다.  
참고로 요즘 부팅 메뉴 선택을 지원하는 경우가 있다. 부팅 순서를 변경하지 않고 이번 한 번만 해당 디스크로 부팅하는 기능인데, 만약 이 기능이 있다면 순서 바꾸지 말고 이 기능을 쓰자.

순서를 바꿨다면 저장 후 재부팅.

부팅 USB가 처음 실행되면 아래와 같은 화면이 뜬다.  
한글로 설치하면 글자가 깨질 수 있기 때문에 영어로 설치했다.
{% imgbox %}
![Ubuntu Installation - Welcome](ubuntu-installation-1.png)
![Ubuntu Installation - Keyboard layout](ubuntu-installation-2.png)
{% endimgbox %}

무선랜카드가 있다면 와이파이를 잡을 수 있는 창이 뜬다.  
![Ubuntu Installation - Wireless](ubuntu-installation-wireless.jpg)

Minimal로 설치하면 그래픽 없이 CLI 모드로 설치된다. 아마..?  
그러니 Mormal 선택, 체크박스 모두 체크 후 Continue  
![Ubuntu Installation - Update and other software](ubuntu-installation-3.png)

어떻게 설치할 것이냐  
디스크가 하나밖에 없고 OS가 설치되어 있지 않으면 아래처럼 뜬다.  
그 외 윈도우 등 다른 OS가 설치되어 있으면 상황에 따라 더 많은 옵션이 생긴다.  
직접 파티셔닝을 하려면 **"Something else"**를 선택.  
![Ubuntu Installation - Installation type](ubuntu-installation-4.jpg)

- EFI: 512MB
- /boot: 1024MB
- SWAP: 16384MB (16GB)
- / : 204800MB (200GB)
- /home: 나머지 (약 1.8TB)

SWAP은 여기서 하지 않아도 설치 후에 스왑파일을 따로 생성하여 설정할 수 있다.  
루트와 home을 분리한 이유는 혹시 OS를 재설치할 일이 생기면 홈 디렉토리를 포맷하지 않기 위해.
{% imgbox %}
![Ubuntu Installation - Partitioning 1](ubuntu-installation-partitioning-1.jpg)
![Ubuntu Installation - Partitioning 2](ubuntu-installation-partitioning-2.jpg)
{% endimgbox %}

파티셔닝 설정 요약  
![Ubuntu Installation - Partitioning](ubuntu-installation-5.jpg)

국가 선택  
![Ubuntu Installation - Where are you](ubuntu-installation-6.png)

사용할 유저명, 호스트명, 패스워드 등 모두 입력  
자동 로그인을 사용하려면 "Log in automatically" 선택  
![Ubuntu Installation - Who are you](ubuntu-installation-7.png)

이제 디스크가 **포맷**{: .danger}되면서 설치가 진행되고, 끝나면 Restart Now
{% imgbox %}
![Ubuntu Installation - Installing](ubuntu-installation-8.png)
![Ubuntu Installation - Installed](ubuntu-installation-9.png)
{% endimgbox %}

![Ubuntu Installation - Reboot](ubuntu-installation-10.png)  
설치 끝.
