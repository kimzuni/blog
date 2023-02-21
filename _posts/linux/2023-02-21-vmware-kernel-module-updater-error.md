---
title: VMware Kernel Module Updater Error
date: 2023-02-21 20:01:00 +0900
last_modified_at: 2023-02-21 20:01:00 +0900
categories: [Linux]
tags: [VMware, Update, Error]
thumbnail: vmware-kernel-module-updater-error-1.png
---

리눅스에서 VMware를 사용하다 보면 `vmmon`, `vmnet` 모듈을 업데이트해야 할 때가 있다.
{% imgbox %}
![VMware Kernal Module Updater 1](vmware-kernel-module-updater-error-1.png)
![VMware Kernal Module Updater 2](vmware-kernel-module-updater-error-2.png)
{% endimgbox %}
하지만 VMware와 리눅스 커널 버전이 호환되지 않으면 에러가 발생하면서 업데이트가 되지 않는다.

<br/>

## 에러 내용
![VMware Kernal Module Updater - Error](vmware-kernel-module-updater-error-3.png)  
에러 내용은 위 경로의 로그파일에서 확인해도 되고, 업데이트 명령어 `sudo vmware-modconfig --console --install-all`를 실행해도 된다.

![VMware Update Command Error](vmware-kernel-module-updater-error-4.png)  
`stddef.h` 그리고 사진에는 없는 `stdarg.h` 헤더 파일을 찾을 수 없다는 에러다.

이 에러는 VMware 버전과 리눅스의 커널 버전이 호환되지 않아서 발생하는 문제라고 한다.  
최근에 소프트웨어를 업데이트하면서 커널도 업데이트되면서 문제가 생긴듯..

## 해결 방법
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
`uname -r` 명령어는 현재 리눅스 커널 버전을 출력한다.  
`make install`은 루트 권한으로 실행해야 한다.

## 하지만
`sudo vmware-modconfig --console --install-all` 실행 시 발생하는 에러는 해결되지 않았다.  
VMware만 잘 돌아가면 되지 뭐..
