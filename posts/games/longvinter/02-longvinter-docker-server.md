---
title: Docker로 Longvinter 서버 열기 (AMD64, ARM64)
date: 2024-04-04 16:04:53 +0900
last_modified_at: false
tags: [Linux, Docker, steamcmd, AMD64, ARM64]
---

먼저 AMD64 아키텍처에서는
[Longvinter](https://store.steampowered.com/app/1635450/Longvinter/?l=koreana)에서 공식적으로 사설 서버를 도커로 돌릴 수 있도록
[소스 코드](https://github.com/Uuvana-Studios/longvinter-docker-server)를 올려두긴 했다.
하지만 이를 제대로 사용하려면 소스 코드를 수정해야 한다.
그렇지 않으면 단순히 서버를 실행하기만 하는 용도로만 사용할 수 있다.

여기서 사용할
[이미지](https://hub.docker.com/r/kimzuni/longvinter-docker-server)([GitHub](https://github.com/kimzuni/longvinter-docker-server))는
[Palworld 서버를 열 때 사용한 이미지](https://github.com/thijsvanloef/palworld-server-docker)의 소스 코드를 롱빈터용으로 수정한 것이다.

리눅스에 도커가 설치되어 있다는 가정 하에 진행

## 이미지 다운로드

이 과정은 생략해도 어차피 나중에 자동으로 다운로드가 진행된다.

```shell
docker pull kimzuni/longvinter-docker-server:latest
```

## 서버 실행 준비

`docker-compose.yml` 파일 작성

```shell
mkdir -p ~/docker/longvinter
cd ~/docker/longvinter
vi docker-compose.yml
```

원래 제일 첫 번째 줄에 적던 `version: "x.x"` 구문은 이제 의미가 없어졌다고 작성하지 않아도 된다고 한다.

```yaml [docker-compose.yml]
version: "3.9" // [!code --]
services:
  longvinter-server:
    container_name: longvinter-server
    image: kimzuni/longvinter-docker-server:latest
    restart: unless-stopped
    stop_grace_period: 30s
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    ports:
      - "7777:7777/tcp"
      - "7777:7777/udp"
      - "27016:27016/tcp"
      - "27016:27016/udp"
    environment:
      TZ: "UTC"
      PUID: 1000
      PGID: 1000
      PORT: 7777
      QUERY_PORT: 27016
      CFG_SERVER_NAME: "Unnamed Island"
      CFG_MAX_PLAYERS: 32
      CFG_SERVER_MOTD: "Welcome to Longvinter Island!"
      CFG_PASSWORD: ""
      CFG_COMMUNITY_WEBSITE: "www.longvinter.com"
      CFG_COOP_PLAY: false
      CFG_COOP_SPAWN: 0
      CFG_SERVER_TAG: "none"
      CFG_ADMIN_STEAM_ID: ""
      CFG_ENABLE_PVP: true
      CFG_TENT_DECAY: true
      CFG_MAX_TENTS: 2
    volumes:
      - ./data:/data
    networks:
      games:
        ipv4_address: 172.16.11.12
networks:
  games:
    name: games
    external: true
```

## 서버 실행

```shell
docker compose up -d # 실행
docker logs -f longvinter-server # 컨테이너 로그 확인
```

필터링을 위한 비속어가 포함된 굉장히 긴 로그가 나타나고 잠시 후 아래와 같은 로그가 뜨면 서버에 접속할 수 있다.

```log
****Starting Server****
/data/LongvinterServer.sh -Port=7777 -QueryPort=27016
time="2024-04-04T08:50:08Z" level=info msg="read crontab: /home/steam/server/crontab"
...
[2024.04.04-09.04.21:243][ 74]LogEOS: Verbose: CreateSession: Successfully created session 'Unnamed Island' with ID 'fb347698360146d5971fe63b8ad04bfe'
[2024.04.04-09.04.21:573][ 84]LogNet: ReplicationDriverClass is null! Not using ReplicationDriver.
[2024.04.04-09.04.21:573][ 84]LogNetCore: DDoS detection status: detection enabled: 0 analytics enabled: 0
[2024.04.04-09.04.21:573][ 84]LogInit: BSD IPv4/6: Socket queue. Rx: 262144 (config 131072) Tx: 262144 (config 131072)
[2024.04.04-09.04.21:573][ 84]LogNet: Created socket for bind address: 0.0.0.0 on port 7787
```

## 그 외

`docker compose` 명령어는 `docker-compose.yml` 파일이 있는 위치 또는 그 하위에서 실행해야 햔다.

```shell
docker restart longvinter-server # 재시작
docker compose down # 종료
docker pause longvinter-server # 일시정지
docker unpause longvinter-server # 일시정지 해제
```

### Failed to find object

ARM64 버전에선 아래와 같은 경고 메시지가 굉장히 많이 뜨긴 하지만, 서버를 들어가보면 모든 오브젝트들이 아무런 문제 없이 표시되며, 정상적으로 플레이가 가능하다.

```log
[2024.04.03-12.41.47:651][  0]LogUObjectGlobals: Warning: Failed to find object 'Object None.None'
```
