---
title: VMware Kernel Module Updater Error
date: 2023-02-21 20:01:00 +0900
last_modified_at: 2023-04-27 20:25:00 +0900
tags: [VMware, Update, Error]
---

리눅스에서 VMware를 사용하다 보면 `vmmon`, `vmnet` 모듈을 업데이트해야 할 때가 있다.

<Imgbox>

![VMware Kernal Module Updater 1](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/vmware-kernel-module-updater-error-1.png)
![VMware Kernal Module Updater 2](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/vmware-kernel-module-updater-error-2.png)

</Imgbox>

하지만 VMware와 커널 버전이 호환되지 않으면 에러가 발생하면서 업데이트가 되지 않는다.
업데이트를 하지 않으면 VMware를 사용할 수 없기 때문에 어떻게든 해결을 해야 한다.

## 에러 내용

![VMware Kernal Module Updater - Error](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/vmware-kernel-module-updater-error-3.png)

에러 내용은 위 경로의 로그파일에서 확인해도 되고, 터미널에서 업데이트 명령어인 `sudo vmware-modconfig --console --install-all`을 실행해도 된다.

![VMware Update Command Error](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/vmware-kernel-module-updater-error-4.png)

`stddef.h` 그리고 사진에는 없는 `stdarg.h` 헤더 파일을 찾을 수 없다는 에러다.

이 에러가 VMware와 커널 버전이 호환되지 않아서 발생하는 문제라고 한다.
최근에 소프트웨어를 업데이트하면서 커널 버전이 5.15에서 5.19로 업데이트가 된 듯..

## 해결 방법

### 추가된 내용

위 `sudo vmware-modconfig --console --install-all` 명령을 사용했을 때 에러가 뜨지 않고 해결되는 경우도 있다.
먼저 사용해 보고 해결되지 않으면 아래 방법을 사용하길 바람.

### 기존 내용

아래 명령어를 하나씩 차례대로 입력하면 된다.
3번 라인의 `git checkout` 뒤에는 현재 설치된 VMware의 버전을 입력해야 한다.
VMware 버전은 `vmware --version` 명령어로 확인할 수 있다.

```shell
git clone https://github.com/mkubecek/vmware-host-modules.git
cd vmware-host-modules
git checkout [player/workstation]-x.x.x
make VM_UNAME=`uname -r`
sudo make install
```

`uname -r`는 리눅스 커널 버전을 출력하는 명령어다.
`make install`은 루트 권한으로 실행해야 한다.

### 하지만

찾을 수 없다던 헤더 파일을 찾아서 모듈 업데이트를 진행한 게 아니기 때문에 `sudo vmware-modconfig --console --install-all` 실행 시 여전히 에러가 발생한다.

`/usr/src` 하위에 위 두 모듈이 있는 걸 보면 모듈이 있는 위치를 직접 잡아주면 될 것 같긴 한데.. VMware만 잘 돌아가면 되지 뭐..

## 참고 사이트

사라짐

1. ~~<https://communities.vmware.com/t5/VMware-Workstation-Pro/Compiling-vmmon-module-fails-on-linux-kernel-5-16-0-arch1-1/m-p/2921525/highlight/true#M176985>~~
