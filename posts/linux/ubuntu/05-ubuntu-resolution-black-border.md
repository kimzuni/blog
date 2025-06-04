---
title: 해상도 설정 시 Black Border 문제
date: 2023-03-01 16:25:00 +0900
last_modified_at: false
tags: [Xorg, Error]
---

지금 사용하고 있는 노트북 화면 비율이 16:10이고 최대 해상도가 2880x1800인데,
이건 너무 높고 1920x1200은 너무 낮아서 그 사이 유일한 16:10 비율인 2560x1600로 쓰고 있었다.

그런데 언제부턴가 재부팅을 해보니 아래 사진처럼 2880x1800에서 2560x1600만 사용하고 남은
오른쪽과 아래 공간에는 검은 공간(Black Border)으로 채워진 상태로 바뀌었다.

![Black Border](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border.svg)

마우스가 설정한 해상도 밖으로 나갈 수는 없지만, 끝으로 가면 커서가 검은부분에 가려지지 않고 그 위에 그대로 표시된다.
그리고 화면이 터치도 가능한데, 검은 부분에서 터치로 스크롤, 줌인, 줌아웃 등 모두 가능하다.

## 해결 방법

먼저 해결 방법은 로그인 시 'Ubuntu on Xorg' 옵션을 사용하는 것이다.

![Login](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border-1.png)

로그인 시 유저명을 입력하고 오른쪽 아래에 생긴 톱니바퀴를 누른 후 'Ubuntu on Xorg'로 변경하면 된다.
설정하고 나면 다음부터는 자동으로 선택이 되어있다.

## 원인

Xorg가 아닌 기본 설정으로 로그인 후 각 해상도에서 `xrandr -q` 명령어를 사용하면 결과가 아래처럼 뜬다.

<Imgbox>

![xrandr command - 2880x1800](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border-2.png)
![xrandr command - 2560x1600](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border-3.png)

</Imgbox>

그리고 아래 사진들은 Xorg로 로그인 후 같은 명령어를 사용한 결과다.

<Imgbox>

![xrandr command - 2880x1800 on Xorg](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border-4.png)
![xrandr command - 2560x1600 on Xorg](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/ubuntu-resolution-black-border-5.png)

</Imgbox>

설정은 모두 바탕화면에서 마우스 우클릭 - Display Settings에서 했는데도 결과가 다르다.
Xorg가 아닌 기본 설정에서는 해상도를 바꾸면 `xrandr` 명령에서 현재 해상도가 제일 높은 해상도로 설정되어 있지만, Xorg에서는 화면의 최대 해상도인 2880x1800에서 설정한 해상도가 선택되어 있다.

최근에 Xorg를 사용하다가 기본으로 바꾸긴 했지만, 기본으로 바꾸고 바로 이런 문제가 생겼는지 어느정도 지나서 생겼는지 모르겠다.
하지만 분명한 건 Xorg를 사용하기 이전에도 같은 해상도를 사용했는데 이런 문제는 생기지 않았다는 것이다.
아무래도 소프트웨어를 업데이트하면서 해상도를 변경할 때 설정하는 방법이 바뀐 것 같다.

~~에라 모르겠다 그냥 Xorg 쓰자.~~ 그냥 2880x1800으로 사용하기로..
