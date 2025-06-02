---
title: 우분투 설치 후 필요한 것들 설치
date: 2023-04-22 16:53:00 +0900
last_modified_at: 2023-04-25 13:48:00 +0900
categories: [Linux, Ubuntu]
tags: [Install]
---

그냥 내가 설치한 것들

## apt, snap install

1. apt
    - net-tools, openssh, curl
    - gcc, g++, make, build-essential
    - rename, p7zip, python3-pip, git, vim, gedit
    - ufw, ffmpeg, gnome-shell-extensions, gimp, icoutils
2. snap
    - chromium, discord, steam, notion-snap-reborn

```shell
# sudo apt -y install [package_name]
# sudo snap install [package_name]
```

## RealVNC Viewer

VNC Viewer 검색 후 [다운로드 사이트](https://www.realvnc.com/en/connect/download/viewer/) 접속.
우분투는 데비안 계열이므로 DEB 파일로 다운로드.

![VNC Viewer .deb Download](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vnc-viewer-1.png)

dpke 명령어로 설치

```shell
# sudo dpkg -i VNC-Viewer.deb
```

![dpkg -i VNC Viewer](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vnc-viewer-2.png)

실행은 터미널에서 `vncviewer` 명령어를 입력하거나 "VNC Viewer" 앱을 누르면 된다.

## VPN Client

기본적으로는 OpenVPN, PP2P밖에 없으며, 다른 방식을 사용하려면 추가로 설치해야 한다.
VPN 설정은 Settings - Network 탭에서 할 수 있다.

뒤에 `-gnome`이 없는 패키지도 있는데, 없는 패키지를 설치하면 VPN 설정 시 에러가 표시되며 VPN 이름밖에 설정할 수 없다.
아마 터미널에서 사용하는 전용 패키지인 것 같다.
물론 `-gnome` 설치 시 없는 패키지도 자동으로 설치가 된다.

### L2TP

```shell
sudo apt -y install network-manager-l2tp-gnome
```

![L2TP Client](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vpn-l2tp.png)

### openconnect

이거 하나만 설치하면 아래 클라이언트를 모두 사용할 수 있다.

- Cisco AnyConnect or openconnect
- Juniper Network Connect
- Palo Alto Network GlobalProtect
- Pulse Connect Secure
- F5 BIG-IP SSL VPN
- Fortinet SSL VPN
- Array SSL VPN

```shell
sudo apt -y install network-manager-openconnect-gnome
```

![VPN openconnect](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vpn-openconnect.png)

## VirtualBox

VirtualBox 검색 후 [다운로드 사이트](https://www.virtualbox.org/wiki/Downloads) 접속.

![VirtualBox - Linux destributions](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-1.png)

### DEB 파일

![VirtualBox - Ubuntu 22.04](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-2.png)

.deb 파일이 다운로드 되므로 VNC와 마찬가지로 `dpkg` 명령어로 설치할 수 있다.

```shell
sudo dpkg -i virtualbox.deb
```

![VirtualBox - dpkg install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-dpkg.png)

왜 이런진 모르겠지만 에러가 뜬다.

아래 명령어를 입력하면 제대로 설치가 된다.

```shell
sudo apt install -f
```

![VirtualBox - apt install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-apt.png)

### Repository

VirtualBox 6, 7 버전의 패키지만 추가되었고 기존에 존재하던 패키지들은 버전이 업데이트되지 않았다.
그래서 그런지 7.0 버전 설치 후 6.1 버전인 virtualbox-ext-pack 패키지를 설치하니 VirtualBox가 6.1 버전으로 다운그레이드 되었다.

파일 다운로드 아래에 "Debian-based Linux distributions" 부분이 있다.
이 부분을 따라 하면 Repository를 추가할 수 있다.

![Virtualbox - Debian Repository](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-3.png)

명령어 두 개 입력
&lt;mydist&gt; 부분은 jammy로 변경, 키링 경로도 변경해도 된다.

![Virtualbox - Add Repository](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-repository-1.png)

`apt update` 명령어를 입력하면 VirtualBox의 Repo를 읽어오는 것을 확인할 수 있다.

![Virtualbox - Repository Update](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-repository-2.png)

제대로 추가되었나 확인
왼쪽이 Repo 추가하기 전 확인한 내용이다.

![Virtualbox - Check Repository](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-repository-3.png)
![Virtualbox - Check Repository](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-repository-4.png)

7.0 버전으로 설치

```shell
sudo apt -y install virtualbox-7.0
```

![Virtualbox - Install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-virtualbox-repository-5.png)

## VMware

최신 버전의 VMware는 쉽게 찾을 수 있다.

[Player](https://www.vmware.com/kr/products/workstation-player/workstation-player-evaluation.html),
[Pro](https://www.vmware.com/kr/products/workstation-pro/workstation-pro-evaluation.html)

![VMware Player Download Site](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vmware-player-1.png)
![VMware Pro Download Site](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vmware-pro-1.png)

최신 버전이 아닌 다른 버전을 받으려면 아래 사이트에서 원하는 버전을 선택하면 된다.

[Player](https://customerconnect.vmware.com/en/downloads/info/slug/desktop_end_user_computing/vmware_workstation_player/17_0),
[Pro](https://customerconnect.vmware.com/en/downloads/info/slug/desktop_end_user_computing/vmware_workstation_pro/17_0)

![VMware Player Old Version Download Site](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vmware-player-2.png)
![VMware Pro Old Version Download Site](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vmware-pro-2.png)

Player는 Pro와 달리 GO TO DOWNLOADS를 누른 후에 Windows/Linux 선택해서 다운로드하는 방식이다.
이 파일은 .deb가 아닌 .bundle 파일이다.
그냥 실행 권한 주고 실행시키면 자동으로 설치된다.

```shell
chmod +x VMware.bundle
sudo ./VMware.bundle
```

![VMware.bundle Install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-vmware-install.png)

## Wireshark

```shell
sudo apt -y install wireshark
```

![Wireshark Install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-wireshark-install.png)

## GNS3

<https://docs.gns3.com/docs/getting-started/installation/linux/>

```shell
sudo add-apt-repository ppa:gns3/ppa
sudo apt update                                
sudo apt install gns3-gui gns3-server
```

설치 시 Wireshark가 자동으로 설치된다.

![GNS3 PPA](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-gns3-add-ppa.png)
![apt update](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-gns3-apt-update.png)
![GNS3 Install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-gns3-install.png)

## Packet Tracer

<https://www.netacad.com/> 로그인 후 Resources - Download Packet Tracer 접속

![Networking Academy - Resources - Download Packet Tracer](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-packettracer-1.png)

스크롤 내리다 보면 우분투용 다운로드 파일이 있다.

![Networking Academy - Ubuntu Desktop 64bit Download](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-packettracer-2.png)

`dpkg`로 설치

```shell
sudo dpkg -i CiscoPacketTracer.deb
```

![Terminal - dpkg install deb](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-packettracer-3.png)

VirtualBox와 비슷한 에러가 뜬다.

VirtualBox와 마찬가지로 아래 명령어를 입력하면 된다.

```shell
sudo apt install -f
```

![Terminal - apt install -f](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-packettracer-4.png)

## Node.js

현재 `apt install nodejs`로 설치 시 최신 버전이 아닌 12.x 버전이다.
최신 버전을 설치하려면 PPA를 추가해야 한다.

<https://nodejs.org/ko/download/current>에서 LTS 및 최신 버전 확인

원하는 버전으로 PPA 추가

```shell
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt -y install nodejs
```

![Node.js PPA](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-nodejs-1.png)
![Node.js install](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-nodejs-2.png)

## Rclone

<https://rclone.org/downloads/> 접속 후 Intel/AMD - 64 Bit 중 .deb 파일 다운로드 후 설치

```shell
sudo dpkg -i rclone.deb
```

![dpkg install rclone](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-install-apps-rclone.png)

## Anaconda3

<Postbox title="linux-install-anaconda"/>

## KakaoTalk

<Postbox title="linux-install-kakaotalk"/>
