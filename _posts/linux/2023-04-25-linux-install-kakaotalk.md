---
title: 리눅스에서 카카오톡 사용하기
date: 2023-04-25 22:05:00 +0900
last_modified_at: 2023-08-09 19:42:22 +0900
categories: [Linux]
tags: [KakaoTalk, Install, Setting]
thumbnail: linux-install-kakaotalk-flatpak-1.png
---

이 글에서는 우분투에 설치했지만 Flatpak을 사용하기 때문에 리눅스 배포판 종류와 상관없이 설치할 수 있다.

다만 카카오톡이 열리는데 시간이 약간 오래 걸린다.  
원래 `wine`도 약간 느리긴 하지만 이건 아무래도 `bottles`을 통해 실행해야 하니 더 느리다.  
실행이 되고 나면 속도는 문제없다.

<br/>

## 설치
CentOS를 사용하던 시절부터 카카오톡을 설치해 보려고 `wine`, `PlayOnLinux` 등을 사용해 봤지만, 잘되지 않아서 `bottles`를 사용했다.  
그래서 `wine`으로 카카오톡이 잘 돌아가는 지금도 `bottles`를 사용 중이다.. 종류 및 버전 관리도 편하고, 프로그램들이 컨테이너 방식으로 돌아가기 때문에 관리도 편하다.

### Flatpak 설치
먼저 [Flatpak](https://flatpak.org/setup/Ubuntu)을 설치해야 한다.

- Ubuntu
```terminal
# sudo apt -y install flatpak gnome-software-plugin-flatpak
```

- RHEL/CentOS 7
```terminal
# sudo yum -y install flatpak
```

- RHEL/CentOS 8 & Fedora
```terminal
# sudo dnf -y install flatpak
```

그리고 Flatpak의 Repository 추가
```terminal
# flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
```
{% imgbox %}
![apt install flatpak](linux-install-kakaotalk-flatpak-1.png)
![flatpak remote add](linux-install-kakaotalk-flatpak-2.png)
{% endimgbox %}

### Bottles 설치
Flatpak으로 [Bottles](https://flathub.org/apps/com.usebottles.bottles) 설치 후 **재부팅**
```terminal
# flatpak install flathub com.usebottles.bottles
# sudo reboot
```
{% imgbox %}
![flatpak install bottles 1](linux-install-kakaotalk-bottles-1.png)
![flatpak install bottles 2](linux-install-kakaotalk-bottles-2.png)
{% endimgbox %}

### KakaoTalk 설치 준비
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

### 폰트 설치
폰트를 설치하지 않으면 설치 과정에서 영어를 사용해야 하며, 다른 언어는 모두 깨져서 보인다.  
물론 이 과정을 거치지 않고 영어로 설치하거나 깨진 언어로 설치한 후에 [폰트를 직접 설치](#폰트-직접-설치)하고 카카오톡 설정에서 폰트를 변경해도 된다.

Bottle에서 제공하는 폰트(cjkfonts)를 설치할 수 있다.  
cjkfonts 설치 시 굴림, 돋움, 맑은 고딕, 바탕 등의 폰트를 포함한 중국어(c), 일본어(j), 한국어(k)의 여러 폰트가 설치된다.
{% imgbox %}
![bottles - Dependencies](linux-install-kakaotalk-cjkfonts-1.png)
![bottles - Dependencies - cjkfonts](linux-install-kakaotalk-cjkfonts-2.png)
{% endimgbox %}

### KakaoTalk 설치
[카카오톡 사이트](https://www.kakaocorp.com/page/service/service/KakaoTalk)에서 Windows 설치 파일 다운로드 및 "Run Executable..."에서 카카오톡 설치 파일 선택.
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

## 설정

### 카카오톡 실행
지금 이상태로는 카카오톡을 실행하려면 Bottles을 열고 카카오톡을 실행하고... 귀찮다.  
Apps 목록에서 카카오톡이 뜨게 .desktop 파일을 만들거나, 터미널에서 실행할 수 있게 실행 파일을 생성하면 훨씬 편하다.

기본적으로 `flatpak` 명령어를 통해 실행하며 `xdg-open` 명령어를 사용할 수도 있다.

#### Applications 목록에 카카오톡 생성
`/usr/share/applications/`, `/usr/local/share/applications/` 등 디렉토리에 .desktop 확장자 파일들 두면 Apps 목록에 아이콘이 생성된다.

##### 직접 생성
카카오톡은 현재 유저만 사용할 수 있으므로 `~/.local/share/applications/` 디렉토리를 사용.

[아래](#실행-파일-생성)에서 실행 파일을 생성했다면 `Exec=` 뒤에 해당 파일의 경로를 적어줘도 된다.  
이 방법의 단점은 KakaoTalk의 기본 아이콘이 어디에도 없다는 것.  
아이콘을 직접 다운로드 하거나 exe 파일에서 아이콘 추출 후 해당 경로를 `Icon=` 뒤에 적으면 된다.

- 카카오톡 아이콘 추출
```terminal
# sudo apt -y install icoutils
# wrestool -x -t3 -n1 --raw KakaoTalk_Setup.exe --output=/path/to/KakaoTalk.png
```
- .desktop 파일 생성
```
[Desktop Entry]
Encoding=UTF-8
Name=KakaoTalk
Comment=KakaoTalk
Exec=xdg-open bottles:run/KakaoTalk/KakaoTalk
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
	echo "KakaoTalk is already running."
	exit 1
fi

# nohup flatpak run --command=bottles-cli com.usebottles.bottles run -b KakaoTalk -p KakaoTalk 2>&1 > /dev/null &
xdg-open bottles:run/KakaoTalk/KakaoTalk
```
{: file="kakaotalk"}

### 폰트 직접 설치
원래 이 내용은 cjkfonts를 설치하지 않았을 때 한글 깨짐 현상을 해결하기 위해 적은 내용이지만, 폰트를 직접 추가하려면 필요한 내용이므로 삭제하지 않았다.

[네이버](https://hangeul.naver.com/font#font-info-section)에서 나눔 폰트를 다운로드한 후 `unzip`으로 압축을 푼다.  
그리고 KakaoTalk이 설치된 곳에 폰트를 ~~설치~~복사하면 된다.

bottles와 drive_c 사이에 오는 KakaoTalk은 생성한 Bottle의 이름이다.
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
이유는 모르겠지만 홈 디렉토리에는 Downloads 폴더밖에 보이지 않는다. 그래서 업로드할 파일을 Downloads 디렉토리에 복사한 후 전송하는 중..  
어차피 아래 과정을 거치면 그 경로가 업로드 창을 열었을 때 뜨는 기본 경로기 때문에 파일이 바로 떠서 편하긴 하다.  
![KakaoTalk File Upload](linux-install-kakaotalk-uploads.png)

#### 업로드 (2023.08.09 추가)
어제 익명의 어느 분께서 메일을 남겨주셨다.  
그 내용은..  
![flatpak override --user --filesystem=host com.usebottles.bottles](linux-install-kakaotalk-sendmail-override-filesystem-0.png)

```terminal
flatpak override --user --filesystem=host com.usebottles.bottles
```

위 명령어를 사용하면 모든 디렉토리에 접근이 가능하다고 한다.  

{% imgbox %}
![filesystem=host - before](linux-install-kakaotalk-sendmail-override-filesystem-1.png)
![filesystem=host - after](linux-install-kakaotalk-sendmail-override-filesystem-2.png)
{% endimgbox %}

다만, 시스템의 모든 파일에 접근이 가능하기 때문에 주의가 필요할 듯.  
권한을 제거하려면 `--filesystem`을 `--nofilesystem`으로 바꿔주기만 하면 된다.

```terminal
flatpak override --user --nofilesystem=host com.usebottles.bottles
```

도움을 주신 익명님 감사합니다!

#### 다운로드
카카오톡 내에서 파일을 다운로드할 때 파일을 홈 디렉토리의 Downloads 디렉토리에 다운로드되게 하려고 한다.

카카오톡에서 다운로드한 파일들은 "카카오톡 받은 파일"(영어로 설치했다면 "KakaoTalk Downloads") 폴더에 저장된다.  
카카오톡 설정에서 이 경로만 변경하면 된다.

Documents 폴더에서 "카카오톡 받은 파일"을 제외한 나머지 폴더가 모두 리눅스의 홈 디렉토리에 심볼릭 링크가 걸려있다.  
즉, 아무거나 선택 후 Downloads 폴더를 선택하면 파일 다운로드 시 홈 디렉토리에 저장된다.
{% imgbox %}
![KakaoTalk - Settings - Chatting](linux-install-kakaotalk-downloads-1.png)
![KakaoTalk - Settings - Chatting - Download Folder](linux-install-kakaotalk-downloads-2.png)
{% endimgbox %}

이게 귀찮다면 그냥 터미널에서 `카카오톡 받은 파일` 폴더를 직접 홈 디렉토리의 `Downloads`에 심볼릭 링크를 걸어도 된다.
```terminal
# cd ~/.var/app/com.usebottles.bottles/data/bottles/bottles/KakaoTalk/drive_c/users/jh1950/Documents
# rmdir ./카카오톡\ 받은\ 파일/
# ln -s ~/Downloads/ ./카카오톡\ 받은\ 파일
```
