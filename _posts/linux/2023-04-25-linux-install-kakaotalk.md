---
title: 리눅스에서 카카오톡 사용하기
date: 2023-04-25 22:05:00 +0900
last_modified_at: 2023-04-25 22:05:00 +0900
categories: [Linux]
tags: [KakaoTalk, Install, Setting]
thumbnail: ubuntu-install-kakaotalk-flatpak-1.png
---

우분투에서 설치했지만 Flatpak을 사용하기 때문에 어느 리눅스든 설치 과정은 똑같을 것이라 생각한다.

<br/>

## 설치
CentOS를 사용하던 시절부터 카카오톡을 설치해 보려고 `wine`, `PlayOnLinux` 등을 사용해 봤지만, 잘되지 않아서 `bottles`를 사용했다.  
그래서 `wine`으로 카카오톡이 잘 돌아가는 지금도 `bottles`를 사용 중이다.. 종류 및 버전 관리도 편하고, 프로그램들이 컨테이너 방식으로 돌아가기 때문에 관리도 편하다.

### Flatpak, Bottles 설치
먼저 [Flatpak](https://flatpak.org/setup/Ubuntu)을 설치해야 한다.
```terminal
# sudo apt -y install flatpak gnome-software-plugin-flatpak
# flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
```
{% imgbox %}
![apt install flatpak](ubuntu-install-kakaotalk-flatpak-1.png)
![flatpak remote add](ubuntu-install-kakaotalk-flatpak-2.png)
{% endimgbox %}
설치가 끝났다면 재부팅을 해줘야 한다.

그리고 Flatpak으로 [bottles](https://flathub.org/apps/com.usebottles.bottles) 설치
```terminal
# flatpak install flathub com.usebottles.bottles
```
{% imgbox %}
![flatpak install bottles 1](ubuntu-install-kakaotalk-bottles-1.png)
![flatpak install bottles 2](ubuntu-install-kakaotalk-bottles-2.png)
{% endimgbox %}
또 재부팅

### KakaoTalk 설치
터미널에서 `flatpak run com.usebottles.bottles`를 입력하거나 우분투 메뉴에서 Bottles 선택해서 실행 후 계속 진행
{% imgbox %}
![bottles start 1](ubuntu-install-kakaotalk-bottles-3.png)
![bottles start 2](ubuntu-install-kakaotalk-bottles-4.png)
![bottles start 3](ubuntu-install-kakaotalk-bottles-5.png)
{% endimgbox %}

오른쪽 상단 삼선 메뉴 - Preferences - Runners에서 원하는 것으로 다운로드
{% imgbox %}
![bottles settings 1](ubuntu-install-kakaotalk-bottles-6.png)
![bottles settings 2](ubuntu-install-kakaotalk-bottles-7.png)
{% endimgbox %}

왼쪽 상단 + 누른 후 Bottle 생성
{% imgbox %}
![Create Bottle 1](ubuntu-install-kakaotalk-bottles-8.png)
![Create Bottle 2](ubuntu-install-kakaotalk-bottles-9.png)
![Create Bottle 3](ubuntu-install-kakaotalk-bottles-10.png)
![Create Bottle 4](ubuntu-install-kakaotalk-bottles-11.png)
![Create Bottle 5](ubuntu-install-kakaotalk-bottles-12.png)
{% endimgbox %}

[카카오톡 사이트](https://www.kakaocorp.com/page/service/service/KakaoTalk)에서 Windows 설치 파일 다운로드 및 생성한 Bottle 클릭 후 "Run Executable..."에서 카카오톡 설치 파일 선택
{% imgbox %}
![Install KakaoTalk 1](ubuntu-install-kakaotalk-1.png)
![Install KakaoTalk 2](ubuntu-install-kakaotalk-2.png)
![Install KakaoTalk 3](ubuntu-install-kakaotalk-3.png)
![Install KakaoTalk 4](ubuntu-install-kakaotalk-4.png)
![Install KakaoTalk 5](ubuntu-install-kakaotalk-5.png)
![Install KakaoTalk 6](ubuntu-install-kakaotalk-6.png)
![Install KakaoTalk 7](ubuntu-install-kakaotalk-7.png)
![Install KakaoTalk 8](ubuntu-install-kakaotalk-8.png)
![Install KakaoTalk 9](ubuntu-install-kakaotalk-9.png)
{% endimgbox %}

## 설정
### 한글 깨짐 현상
한글 폰트가 설치되어 있지 않기 때문에 한글이 깨진다.

[네이버](https://hangeul.naver.com/font#font-info-section)에서 나눔 폰트를 다운로드한 후 `unzip`으로 압축을 푼다.  
그리고 KakaoTalk이 설치된 곳에 폰트를 ~~설치~~복사하면 된다.

bottles와 drive_c 사이에 오는 KakaoTalk은 위에서 생성한 Bottle의 이름이다.
```terminal
# unzip nanum-all.zip
# find 나눔\ 글꼴/ -type f -exec cp {} ~/.var/app/com.usebottles.bottles/data/bottles/bottles/KakaoTalk/drive_c/windows/Fonts/ \;
```
{% imgbox %}
![KakaoTalk Fonts 1](ubuntu-install-kakaotalk-fonts-1.png)
![KakaoTalk Fonts 2](ubuntu-install-kakaotalk-fonts-2.png)
{% endimgbox %}

한글은 이제 안 깨지고 보이는데.. ~~하단 광고와~~ 입력란의 한글은 여전히 깨진다.  
이건 카카오톡 설정에서 폰트를 변경하면 된다.
{% imgbox %}
![KakaoTalk Fonts 3](ubuntu-install-kakaotalk-fonts-3.png)
![KakaoTalk Fonts 4](ubuntu-install-kakaotalk-fonts-4.png)
{% endimgbox %}

### 실행 파일 생성
카카오톡을 실행하려면 Bottles을 열고 카카오톡을 실행하고... 귀찮다. 파일을 만들자.

kakaotalk이라는 텍스트 파일 생성 후 실행 권한을 주고 `~/bin` 디렉토리에 두면 터미널에서 언제 어디서든 `kakaotalk`을 입력하면 카카오톡이 실행된다.  
켜지는 시간은 약간 오래 걸리므로 기다리자.. `wine`도 약간 느리긴 하지만 이건 아무래도 `bottles`을 통해 실행해야 하니 더 느리다.

첫 번째 KakaoTalk은 생성한 Bottle 이름, 두 번째 kakaoTalk은 Bottle 내 Programs 이름이다.
```bash
#!/usr/bin/env bash

if [ `ps -ef | grep -i bottles.*kakaotalk | wc -l` != 1 ]; then
	exit 1
fi

nohup flatpak run --command=bottles-cli com.usebottles.bottles run -b KakaoTalk -p KakaoTalk 2>&1 > /dev/null &
```
{: file="kakaotalk"}

### 카카오톡에서 파일 업로드 및 다운로드
#### 업로드
파일 업로드 시 Z 드라이버와 현재 우분투 루트 디렉토리가 마운트 되어있기 때문에 여기 들어가서 파일을 선택하면 되..ㄹ 것 같지만..  
이유는 모르겠지만 홈 디렉토리에는 Downloads 폴더밖에 보이지 않는다. 그래서 업로드할 파일을 Downloads 디렉토리에 복사한 후 업로드하는 중..  
어차피 아래 과정을 거치면 그 경로가 업로드 창을 열었을 때 뜨는 기본 경로기 때문에 파일이 바로 떠서 편하긴 하다.  
![KakaoTalk File Upload](ubuntu-install-kakaotalk-uploads.png)

#### 다운로드
카카오톡 내에서 파일을 다운로드할 때 파일을 홈 디렉토리의 Downloads 디렉토리에 다운로드되게 하려고 한다.  
그냥 원래 다운로드되는 디렉토리를 지우고 심볼릭 링크를 걸어주면 된다.
```terminal
# rmdir ~/.var/app/com.usebottles.bottles/data/bottles/bottles/KakaoTalk/drive_c/users/jh1950/Documents/KakaoTalk\ Downloads/
# ln -s ~/Downloads/ ~/.var/app/com.usebottles.bottles/data/bottles/bottles/KakaoTalk/drive_c/users/jh1950/Documents/KakaoTalk\ Downloads
```
![KakaoTalk File Upload](ubuntu-install-kakaotalk-downloads.png)
