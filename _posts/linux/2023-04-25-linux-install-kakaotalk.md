---
title: 리눅스에서 카카오톡 사용하기
date: 2023-04-25 22:05:00 +0900
last_modified_at: 2023-05-01 14:23:00 +0900
categories: [Linux]
tags: [KakaoTalk, Install, Setting]
thumbnail: linux-install-kakaotalk-flatpak-1.png
---

이 글에서는 우분투에 설치했지만 Flatpak을 사용하기 때문에 리눅스 배포판 종류와 상관없이 설치할 수 있다.

<br/>

## 설치 및 실행
CentOS를 사용하던 시절부터 카카오톡을 설치해 보려고 `wine`, `PlayOnLinux` 등을 사용해 봤지만, 잘되지 않아서 `bottles`를 사용했다.  
그래서 `wine`으로 카카오톡이 잘 돌아가는 지금도 `bottles`를 사용 중이다.. 종류 및 버전 관리도 편하고, 프로그램들이 컨테이너 방식으로 돌아가기 때문에 관리도 편하다.

### Flatpak, Bottles 설치
먼저 [Flatpak](https://flatpak.org/setup/Ubuntu)을 설치해야 한다.
```terminal
# sudo apt -y install flatpak gnome-software-plugin-flatpak
# flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
```
{% imgbox %}
![apt install flatpak](linux-install-kakaotalk-flatpak-1.png)
![flatpak remote add](linux-install-kakaotalk-flatpak-2.png)
{% endimgbox %}

그리고 Flatpak으로 [bottles](https://flathub.org/apps/com.usebottles.bottles) 설치 후 재부팅
```terminal
# flatpak install flathub com.usebottles.bottles
# sudo reboot
```
{% imgbox %}
![flatpak install bottles 1](linux-install-kakaotalk-bottles-1.png)
![flatpak install bottles 2](linux-install-kakaotalk-bottles-2.png)
{% endimgbox %}

### KakaoTalk 설치
터미널에서 `flatpak run com.usebottles.bottles`를 입력하거나 우분투 메뉴에서 Bottles 선택해서 실행 후 계속 진행
{% imgbox %}
![bottles start 1](linux-install-kakaotalk-bottles-3.png)
![bottles start 2](linux-install-kakaotalk-bottles-4.png)
![bottles start 3](linux-install-kakaotalk-bottles-5.png)
{% endimgbox %}

오른쪽 상단 삼선 메뉴 - Preferences - Runners에서 원하는 것으로 다운로드
{% imgbox %}
![bottles settings 1](linux-install-kakaotalk-bottles-6.png)
![bottles settings 2](linux-install-kakaotalk-bottles-7.png)
{% endimgbox %}

왼쪽 상단 + 누른 후 Bottle 생성
{% imgbox %}
![Create Bottle 1](linux-install-kakaotalk-bottles-8.png)
![Create Bottle 2](linux-install-kakaotalk-bottles-9.png)
![Create Bottle 3](linux-install-kakaotalk-bottles-10.png)
![Create Bottle 4](linux-install-kakaotalk-bottles-11.png)
![Create Bottle 5](linux-install-kakaotalk-bottles-12.png)
{% endimgbox %}

[카카오톡 사이트](https://www.kakaocorp.com/page/service/service/KakaoTalk)에서 Windows 설치 파일 다운로드 및 생성한 Bottle 클릭 후 "Run Executable..."에서 카카오톡 설치 파일 선택.

설치 과정에서 선택할 수 있는 언어는 영어, 한국어, 일본어.  
하지만 영어 외 언어는 모두 깨져서 보인다. [이 과정](#한글-깨짐-현상)에서 Fonts 디렉토리에 폰트를 미리 복사하더라도 깨진다.  
다른 언어로 설치 후 폰트 설정만 제대로 해준다면 선택한 언어로 카카오톡을 사용할 수 있기 이 글의 캡쳐본을 참고하여 설치 및 설정하면 어렵지 않게 설치할 수 있긴 하지만.. 여전히 깨져 보이는 글자가 있긴 하다.  
참고로 언어 선택 콤보 박스의 두 번째가 한국어, 세 번째가 일본어다.
{% imgbox %}
![Install KakaoTalk 1](linux-install-kakaotalk-1.png)
![Install KakaoTalk 2](linux-install-kakaotalk-2.png)
![Install KakaoTalk 3](linux-install-kakaotalk-3.png)
![Install KakaoTalk 4](linux-install-kakaotalk-4.png)
![Install KakaoTalk 5](linux-install-kakaotalk-5.png)
![Install KakaoTalk 6](linux-install-kakaotalk-6.png)
![Install KakaoTalk 7](linux-install-kakaotalk-7.png)
![Install KakaoTalk 8](linux-install-kakaotalk-8.png)
![Install KakaoTalk 9](linux-install-kakaotalk-9.png)
{% endimgbox %}

#### 2023.05.01 - caffe-7.20 에러
2023년 5월 1일 현재 caffe(v7.20)로 진행 시 에러가 발생한다.

아무런 업데이트가 없었는데 갑자기 되던 게 안 되니 내가 문제인지 caffe가 문제인지는 모르겠다.  
Bottle을 제거 후 다른 Runner로 새로 생성하거나 Bottle의 Settings에 들어가서 Runner를 변경하면 문제없이 설치가 된다.
{% imgbox %}
![Install KakaoTalk - Error](linux-install-kakaotalk-caffe-error.png)
![Bottle - Settings](linux-install-kakaotalk-change-runner-1.png)
![Bottle - Settings - Runner](linux-install-kakaotalk-change-runner-2.png)
{% endimgbox %}

### 카카오톡 실행
지금 이상태로는 카카오톡을 실행하려면 Bottles을 열고 카카오톡을 실행하고... 귀찮다.  
Apps 목록에서 카카오톡이 뜨게 .desktop 파일을 만들거나, 터미널에서 실행할 수 있게 실행 파일을 생성하면 훨씬 편하다.

#### Applications 목록에 카카오톡 생성
`/usr/share/applications/`, `/usr/local/share/applications/` 등 디렉토리에 .desktop 확장자 파일들 두면 Apps 메뉴에 아이콘이 생성된다.

카카오톡이 열리는데 시간이 약간 오래 걸린다.  
원래 `wine`도 약간 느리긴 하지만 이건 아무래도 `bottles`을 통해 실행해야 하니 더 느리다.  
실행이 되고 나면 속도는 문제없다.

##### 직접 생성
카카오톡은 현재 유저만 사용할 수 있으므로 `~/.local/share/applications/` 디렉토리를 사용.

[아래](#실행-파일-생성)에서 실행 파일을 생성했다면 `Exec=` 뒤에 해당 파일의 경로를 적어줘도 된다.  
이 방법의 단점은 KakaoTalk의 기본 아이콘이 어디에도 없다는 것.  
아이콘을 직접 다운로드 하거나 exe 파일에서 아이콘 추출 후 해당 경로를 `Icon=` 뒤에 적으면 된다.
```terminal
# sudo apt -y install icoutils
# wrestool -x -t3 -n1 --raw KakaoTalk_Setup.exe --output=/path/to/KakaoTalk.png
```
```
[Desktop Entry]
Encoding=UTF-8
Name=KakaoTalk
Comment=KakaoTalk
Exec=flatpak run --command=bottles-cli com.usebottles.bottles run -p KakaoTalk -b 'KakaoTalk' -- %u
Terminal=false
Type=Application
Icon=/path/to/KakaoTalk.png
```
{: path="~/.local/share/applications/KakaoTalk.desktop"}

##### Bottles 기능 사용
Bottles의 기능을 사용하여 Apps 목록에 아이콘을 생성할 수 있다.

먼저 Bottles에 권한을 줘야한다. Bottles 종료 후 아래 명령어 실행
```terminal
# flatpak override com.usebottles.bottles --user --filesystem=xdg-data/applications
```
![KakaoTalk - Create icon in Show Applications 1](linux-install-kakaotalk-run-1.png)  

이제 Bottles에서 아래 버튼을 클릭하면 .desktop 파일이 생성되는 것을 확인할 수 있다.
{% imgbox %}
![KakaoTalk - Create icon in Show Applications 2](linux-install-kakaotalk-run-2.png)
![KakaoTalk - Create icon in Show Applications 3](linux-install-kakaotalk-run-3.png)
![KakaoTalk - Create icon in Show Applications 4](linux-install-kakaotalk-run-4.png)
{% endimgbox %}

#### 실행 파일 생성
kakaotalk이라는 텍스트 파일 생성 후 실행 권한을 주고 `~/bin` 디렉토리에 두면 터미널에서 언제 어디서든 `kakaotalk`을 입력하여 카카오톡을 실행할 수 있다.

첫 번째 KakaoTalk은 생성한 Bottle 이름, 두 번째 kakaoTalk은 Bottle 내 실행시킬 Programs의 이름이다.
```bash
#!/usr/bin/env bash

if [ `ps -ef | grep -i bottles.*kakaotalk | wc -l` != 1 ]; then
	exit 1
fi

nohup flatpak run --command=bottles-cli com.usebottles.bottles run -b KakaoTalk -p KakaoTalk -- %u 2>&1 > /dev/null &
```
{: file="kakaotalk"}

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
![KakaoTalk Fonts 1](linux-install-kakaotalk-fonts-1.png)
![KakaoTalk Fonts 2](linux-install-kakaotalk-fonts-2.png)
{% endimgbox %}

한글은 이제 안 깨지고 보이는데.. ~~하단 광고와~~ 입력란의 한글은 여전히 깨진다.  
이건 카카오톡 설정에서 폰트를 변경하면 된다.
{% imgbox %}
![KakaoTalk Fonts 3](linux-install-kakaotalk-fonts-3.png)
![KakaoTalk Fonts 4](linux-install-kakaotalk-fonts-4.png)
{% endimgbox %}

### 카카오톡에서 파일 업로드 및 다운로드
#### 업로드
Z 드라이브에 우분투의 루트 디렉토리가 마운트 되어있기 때문에 파일 업로드 시 Z 드라이브에 들어가서 파일을 선택하면 되..ㄹ 것 같지만..  
이유는 모르겠지만 홈 디렉토리에는 Downloads 폴더밖에 보이지 않는다. 그래서 업로드할 파일을 Downloads 디렉토리에 복사한 후 업로드하는 중..  
어차피 아래 과정을 거치면 그 경로가 업로드 창을 열었을 때 뜨는 기본 경로기 때문에 파일이 바로 떠서 편하긴 하다.  
![KakaoTalk File Upload](linux-install-kakaotalk-uploads.png)

#### 다운로드
카카오톡 내에서 파일을 다운로드할 때 파일을 홈 디렉토리의 Downloads 디렉토리에 다운로드되게 하려고 한다.  
그냥 원래 다운로드되는 디렉토리를 지우고 심볼릭 링크를 걸어주면 된다.
```terminal
# cd ~/.var/app/com.usebottles.bottles/data/bottles/bottles/KakaoTalk/drive_c/users/jh1950/Documents
# rmdir ./KakaoTalk\ Downloads/
# ln -s ~/Downloads/ ./KakaoTalk\ Downloads
```
![KakaoTalk File Upload](linux-install-kakaotalk-downloads.png)
