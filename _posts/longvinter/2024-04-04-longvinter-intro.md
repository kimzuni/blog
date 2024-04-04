---
title: 롱빈터(Longvinter)
date: 2024-04-04 11:38:11 +0900
categories: [Game, Longvinter]
thumbnail: https://cdn.akamai.steamstatic.com/steam/apps/1635450/header.jpg?t=1711546754
---

AMD64, ARM64 아키텍처에서 서버 여는 법은 아래 글 참고 바람
[Docker로 Longvinter 서버 열기](/posts/longvinter-docker-server/){: .post-infobox}

<br/>

---

<br/>

![Steam - Longvinter](https://cdn.akamai.steamstatic.com/steam/apps/1635450/header.jpg?t=1711546754){: .center}  
약 두 달 전.. Palworld 서버 여는 방법의 글들을 올리고 난 후 [Longvinter](https://store.steampowered.com/app/1635450/Longvinter/?l=koreana)라는 게임을 발견하고 되게 재밌어 보이길래 시작했다.

<br/>

역시 단순히 게임만 플레이할 거면 이 글을 안 올렸을 텐데.. 롱빈터도 개인이 사설 서버를 열 수 있다길래 또 한 번 열어보겠다고 시작했다가 ARM64 버전에서 돌릴 수 있는 도커 이미지가 없어서 직접 [Longvinter 공식 도커 이미지 소스 코드](https://github.com/Uuvana-Studios/longvinter-docker-server)를 참고하여 [Palworld때 쓰던 이미지 소스 코드](https://github.com/thijsvanloef/palworld-server-docker)를 롱빈터용으로 싹 바꿔버렸다.

그 결과 정상적으로 작동하는 것을 확인했고, [GitHub](https://github.com/kimzuni/longvinter-docker-server), [Docker Hub](https://hub.docker.com/r/kimzuni/longvinter-docker-server)에 소스 코드와 이미지를 올렸는데 2주가 지난 지금까지 전혀 구글 검색에 노출이 안되고 있다. (GitHub Topic에 올라간 내 저장소는 뜨는데 저장소 자체는 검색이 되지 않는다.)

<br/>

그래서 결론은 이 글이라도 구글 검색 노출돼서 유입되라고 적는 글이다.
