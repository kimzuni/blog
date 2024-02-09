---
title: Docker로 Palworld 서버 열기
date: 2024-02-08 13:22:13 +0900
last_modified_at: 2024-02-08 13:22:13 +0900
categories: [Game, Palworld]
tags: [Linux, Docker]
---

Palworld에서는 공식적으로 도커 이미지를 제공하지 않지만, 역시 누군가 만들어둔 [이미지](https://hub.docker.com/r/thijsvanloef/palworld-server-docker)([GitHub](https://github.com/thijsvanloef/palworld-server-docker))가 있어서 사용해 봤다.
업데이트도 매우 빠르고 각종 기능도 계속 추가되고 있다.

솔직히 GitHub와 Docker 사이트에 실행 방법이 다 나와있기 때문에 별로 설명할 건 없고, `docker-compose.yml` 파일 내용을 올리기 위해 작성하는 글이다.

<br/>

리눅스에 도커가 설치되어 있다는 가정 하에 진행

## 이미지 다운로드
이 과정은 생략해도 어차피 나중에 자동으로 다운로드가 진행된다.
```shell
docker pull thijsvanloef/palworld-server-docker
```

## 서버 실행 준비
`docker-compose.yml` 파일 작성
```shell
mkdir -p ~/docker/palworld
cd ~/docker/palworld
vi docker-compose.yml
```

```yaml
version: "3.9"
services:
  palworld:
    container_name: palworld
    restart: unless-stopped
    stop_grace_period: 30s
    image: thijsvanloef/palworld-server-docker:latest
    ports:
      - 8211:8211/udp
      - 27015:27015/udp
    env_file:
      - .env
      - settings.env
    environment:
      - PUID=1000
      - PGID=1000
      - MULTITHREADING=true
      - UPDATE_ON_BOOT=true
      - TZ=Asia/Seoul
    volumes:
      - ./server:/palworld
    networks:
      games:
        ipv4_address: 172.16.11.11
networks:
  games:
    name: games
    external: true
```
{: file="docker-compose.yml"}

`.env` 파일에는 포트 번호, 서버명, 서버 설명, 패스워드 등의 내용이 들어있고, `settings.env` 파일에는 [게임에 적용되는 설정](https://github.com/thijsvanloef/palworld-server-docker?tab=readme-ov-file#with-environment-variables)들이 저장되어 있다.

## 서버 실행
```shell
docker compose up -d # 실행
docker logs -f palworld # 컨테이너 로그 확인
```

아래와 같은 로그가 뜨면 서버 실행 완료.  
마지막에 `[S_API FAIL] ...`이라고 뜨는데, 상관없는지 제대로 돌아간다.

```
*****STARTING SERVER*****
./PalServer.sh -port=8211 -queryport=27015 EpicApp=PalServer -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS
time="2024-02-07T18:14:21+09:00" level=info msg="read crontab: /home/steam/server/crontab"
...
Setting breakpad minidump AppID = 2394010
[S_API FAIL] Tried to access Steam interface SteamUser021 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface SteamFriends017 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface STEAMAPPS_INTERFACE_VERSION008 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface SteamNetworkingUtils004 before SteamAPI_Init succeeded.
```
{: lang="Log"}

\+ 처음 실행하거나 Palworld 서버가 설치된 디렉토리를 삭제 또는 이동했다면 서버를 설치해야 하기 때문에 조금 오래 걸린다. 이때 서버를 설치하는 동안의 로그가 실시간으로 뜨지 않고 조금씩 모아져서 한 번에 뜨는 문제가 있기 때문에 특별한 에러가 없다면 멈춘 것이 아니니 기다리면 된다.

## 그 외
`docker compose` 명령어는 `docker-compose.yml` 파일이 있는 위치 또는 그 하위에서 실행해야 한다.

```shell
docker exec -it palworld rcon-cli # rcon 연결
docker restart palworld # 재시작
docker compose down # 종료
docker pause palworld # 일시정지
docker unpause palworld # 일시정지 해제
```
