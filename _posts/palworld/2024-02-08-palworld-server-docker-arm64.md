---
title: Docker로 Palworld 서버 열기 (ARM64)
date: 2024-02-08 15:30:46 +0900
last_modified_at: 2024-02-08 15:30:46 +0900
categories: [Game, Palworld]
tags: [Linux, Docker, ARM64]
---

[이전 글](/posts/palworld-server-docker/)에서 작성한 과정은 노트북에서 진행했고, 서버를 24시간으로 돌리기 위해 오라클 클라우드로 옮겼는데 문제가 발생했다. 사용한 이미지가 AMD 버전만 지원한다는 것을 몰랐다. 그래서 ARM 버전의 이미지가 있는지 찾아보던 중 이전 글에서 사용한 이미지를 [ARM 버전으로 Fork한 저장소](https://github.com/yumusb/palworld-server-docker-arm)를 찾았고, 바로 도전.

...하려고 했으나 앞서 말했듯 기존 이미지의 업데이트가 매우 빠르기 때문에 Fork한 저장소도 벌써 매우 구 버전이 되어버렸다. 그래서 이 이미지를 바로 사용하기보다는 어떤 것들을 바꿨는지 확인하고 현재 [thijsvanloef/palworld-server-docker](https://hub.docker.com/r/thijsvanloef/palworld-server-docker) 저장소의 최신 버전에서 해당 방법을 적용하여 직접 이미지를 빌드해서 사용하고 있다.



## Dockerfile
최종 Dockerfile의 내용  
주요 내용은 AMD 버전만 지원하는 것을 ARM에서 실행하기 위해 [FEX-Emu](https://github.com/FEX-Emu/FEX)를 사용하는 것이다.

```dockerfile
# ARM steamcmd: https://github.com/TeriyakiGod/steamcmd-docker-arm64
# FROM teriyakigod/steamcmd:arm64 # CPU_MHZ Error
FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    git \
    cmake \
    ninja-build \
    pkg-config \
    ccache \
    clang \
    llvm \
    lld \
    binfmt-support \
    libsdl2-dev \
    libepoxy-dev \
    libssl-dev \
    python-setuptools \
    g++-x86-64-linux-gnu \
    nasm \
    python3-clang \
    libstdc++-10-dev-i386-cross \
    libstdc++-10-dev-amd64-cross \
    libstdc++-10-dev-arm64-cross \
    squashfs-tools \
    squashfuse \
    libc-bin \
    expect \
    curl \
    fuse \
    wget

WORKDIR /fex
RUN git clone --recurse-submodules https://github.com/FEX-Emu/FEX.git && \
    cd FEX && \
    mkdir Build && \
    cd Build && \
    CC=clang CXX=clang++ cmake -DCMAKE_INSTALL_PREFIX=/usr -DCMAKE_BUILD_TYPE=Release -DUSE_LINKER=lld -DENABLE_LTO=True -DBUILD_TESTS=False -DENABLE_ASSERTIONS=False -G Ninja .. && \
    ninja && \
    ninja install && \
    ninja binfmt_misc_32 && \
    ninja binfmt_misc_64

RUN useradd -m -s /bin/bash steam
USER steam

WORKDIR /home/steam/.fex-emu/RootFS/
RUN curl -sqL Ubuntu_22_04.tar.gz https://www.dropbox.com/scl/fi/16mhn3jrwvzapdw50gt20/Ubuntu_22_04.tar.gz?rlkey=4m256iahwtcijkpzcv8abn7nf | tar xzf - && \
    echo '{"Config":{"RootFS":"Ubuntu_22_04"}}' > ../Config.json

WORKDIR /home/steam/steamcmd
RUN curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf - \
 && FEXBash -c "/home/steam/steamcmd/steamcmd.sh +quit" \
 && mkdir -p ~/.steam/sdk64/ \
 && ln -sf ../../steamcmd/linux64/steamclient.so ~/.steam/sdk64/




# Palworld Server on Docker: https://github.com/thijsvanloef/palworld-server-docker
USER root

ENV RCON_MD5SUM="8601c70dcab2f90cd842c127f700e398" \
    SUPERCRONIC_SHA1SUM="512f6736450c56555e01b363144c3c9d23abed4c" \
    RCON_VERSION="0.10.3" \
    SUPERCRONIC_VERSION="0.2.29"

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN wget --progress=dot:giga https://github.com/gorcon/rcon-cli/releases/download/v${RCON_VERSION}/rcon-${RCON_VERSION}-amd64_linux.tar.gz -O rcon.tar.gz \
    && echo "${RCON_MD5SUM}" rcon.tar.gz | md5sum -c - \
    && tar -xzvf rcon.tar.gz \
    && rm rcon.tar.gz \
    && echo -e "#!/usr/bin/env bash\nsu steam -c \"FEXBash -c '`pwd`/rcon-${RCON_VERSION}-amd64_linux/rcon \$@'\"" > /usr/bin/rcon-cli \
    && chmod +x /usr/bin/rcon-cli

RUN wget --progress=dot:giga https://github.com/aptible/supercronic/releases/download/v${SUPERCRONIC_VERSION}/supercronic-linux-arm64 -O supercronic \
     && echo "${SUPERCRONIC_SHA1SUM}" supercronic | sha1sum -c - \
     && chmod +x supercronic \
     && mv supercronic /usr/local/bin/supercronic

ENV PORT= \
    PUID=1000 \
    PGID=1000 \
    PLAYERS= \
    MULTITHREADING=false \
    COMMUNITY=false \
    PUBLIC_IP= \
    PUBLIC_PORT= \
    SERVER_PASSWORD= \
    SERVER_NAME= \
    ADMIN_PASSWORD= \
    UPDATE_ON_BOOT=true \
    RCON_ENABLED=true \
    RCON_PORT=25575 \
    QUERY_PORT=27015 \
    TZ=UTC \
    SERVER_DESCRIPTION= \
    BACKUP_ENABLED=true \
    DELETE_OLD_BACKUPS=false \
    OLD_BACKUP_DAYS=30 \
    BACKUP_CRON_EXPRESSION="0 0 * * *" \
    AUTO_UPDATE_ENABLED=false \
    AUTO_UPDATE_CRON_EXPRESSION="0 * * * *" \
    AUTO_UPDATE_WARN_MINUTES=30 \
    AUTO_REBOOT_ENABLED=false \
    AUTO_REBOOT_WARN_MINUTES=5 \
    AUTO_REBOOT_CRON_EXPRESSION="0 0 * * *"

COPY ./scripts/* /home/steam/server/

RUN chmod +x /home/steam/server/*.sh && \
    mv /home/steam/server/backup.sh /usr/local/bin/backup && \
    mv /home/steam/server/update.sh /usr/local/bin/update && \
    mv /home/steam/server/restore.sh /usr/local/bin/restore

WORKDIR /home/steam/server

HEALTHCHECK --start-period=5m \
    CMD pgrep "PalServer-Linux" > /dev/null || exit 1

EXPOSE ${PORT} ${RCON_PORT}

ENTRYPOINT ["/home/steam/server/init.sh"]
```

내가 변경한 주요 내용은
1. FEX-Emu 설치를 위해 `FEX` 유저를 만들고 패스워드 없이 `sudo` 명령어를 사용하도록 함 => 그냥 `root`로 진행
2. `rcon-cli` 명령어를 기존 이미지에서 사용하는 rcon으로 복구
  - Fork 버전에서는 ARM64 버전을 지원하는 [itzg의 rcon-cli](https://github.com/itzg/rcon-cli/)를 사용 => rcon으로 명령어를 전송할 때마다 `Weird. This response is for another request.` 에러가 같이 딸려 나옴
  - 기존 이미지에서는 [gorcon의 rcon-cli](https://github.com/gorcon/rcon-cli/)를 사용 => ARM 버전은 맥 전용밖에 없기 때문에 AMD로 설치하여 `FEX-Emu`로 실행하도록 함
3. 기존 이미지의 최신 버전에서 [supercronic](https://github.com/aptible/supercronic)를 사용 => ARM 버전으로 변경
4. `steamclient.so` 에러 해결. [참고](https://tech.palworldgame.com/dedicated-server-guide)
  - `steamcmd`를 한 번 실행하기 때문에 이미지 용량이 커짐 => [start.sh](#startsh) 파일에서 사용하면 됨
  - 대신 이후에 컨테이너를 실행할 때마다 시간 단축됨

## ./scripts/*
이미지 빌드 시 복사되는 스크립트 파일들이 담긴 디렉토리.

기존 이미지에서 이 파일들이 매우 많이 업데이트가 되었기 때문에 Fork 버전이 아닌 기존 저장소의 scripts 폴더를 통째로 복사하여 수정했다.

### init.sh
```bash
#!/bin/bash

:<< "END"
if [[ ! "${PUID}" -eq 0 ]] && [[ ! "${PGID}" -eq 0 ]]; then
    printf "\e[0;32m*****EXECUTING USERMOD*****\e[0m\n"
    usermod -o -u "${PUID}" steam
    groupmod -o -g "${PGID}" steam
else
    printf "\033[31mRunning as root is not supported, please fix your PUID and PGID!\n"
    exit 1
fi
END

mkdir -p /palworld/backups
chown -R steam:steam /palworld /home/steam/server # /home/steam/

# shellcheck disable=SC2317
term_handler() {
    if [ "${RCON_ENABLED,,}" = true ]; then
        rcon-cli save
        rcon-cli "shutdown 1"
    else # Does not save
        kill -SIGTERM "$(pidof PalServer-Linux-Test)"
    fi
    tail --pid="$killpid" -f 2>/dev/null
}

trap 'term_handler' SIGTERM

su steam -c ./start.sh &
# Process ID of su
killpid="$!"
wait "$killpid"

mapfile -t backup_pids < <(pgrep backup)
if [ "${#backup_pids[@]}" -ne 0 ]; then
    echo "Waiting for backup to finish"
    for pid in "${backup_pids[@]}"; do
        tail --pid="$pid" -f 2>/dev/null
    done
fi

mapfile -t restore_pids < <(pgrep restore)
if [ "${#restore_pids[@]}" -ne 0 ]; then
    echo "Waiting for restore to finish"
    for pid in "${restore_pids[@]}"; do
        tail --pid="$pid" -f 2>/dev/null
    done
fi
```
FEX-Emu를 사용하는 것 때문에 `/home/steam/.fex-emu/RootFS`의 용량이 2~3GB 정도 된다.
그래서 `groupmod`, `chown` 명령어 실행 시간이 매우 오래 걸려서 결국 PUID, PGID 설정은 주석 처리, `chown` 명령어는 `/home/steam` 대신 `/home/steam/server`에만 적용해서 시간 단축. 따라서 무조건 PUID, PGID는 1000으로 고정 => `Dockerfile`에서 유저 만들 때 지정하면 됨

### start.sh
```bash
#!/bin/bash

dirExists() {
    local path="$1"
    local return_val=0
    if ! [ -d "${path}" ]; then
        echo "${path} does not exist."
        return_val=1
    fi
    return "$return_val"
}

fileExists() {
    local path="$1"
    local return_val=0
    if ! [ -f "${path}" ]; then
        echo "${path} does not exist."
        return_val=1
    fi
    return "$return_val"
}

isReadable() {
    local path="$1"
    local return_val=0
    if ! [ -e "${path}" ]; then
        echo "${path} is not readable."
        return_val=1
    fi
    return "$return_val"
}

isWritable() {
    local path="$1"
    local return_val=0
    if ! [ -w "${path}" ]; then
        echo "${path} is not writable."
        return_val=1
    fi
    return "$return_val"
}

isExecutable() {
    local path="$1"
    local return_val=0
    if ! [ -x "${path}" ]; then
        echo "${path} is not executable."
        return_val=1
    fi
    return "$return_val"
}

dirExists "/palworld" || exit
isWritable "/palworld" || exit
isExecutable "/palworld" || exit

cd /palworld || exit

if [ "${UPDATE_ON_BOOT,,}" = true ]; then
    printf "\e[0;32m*****STARTING INSTALL/UPDATE*****\e[0m\n"
    FEXBash -c '/home/steam/steamcmd/steamcmd.sh +@sSteamCmdForcePlatformType linux +@sSteamCmdForcePlatformBitness 64 +force_install_dir "/palworld" +login anonymous +app_update 2394010 validate +quit'
fi

STARTCOMMAND=("./PalServer.sh")

if ! fileExists "${STARTCOMMAND[0]}"; then
    echo "Try restarting with UPDATE_ON_BOOT=true"
    exit 1
fi
isReadable "${STARTCOMMAND[0]}" || exit
isExecutable "${STARTCOMMAND[0]}" || exit

if [ -n "${PORT}" ]; then
    STARTCOMMAND+=("-port=${PORT}")
fi

if [ -n "${QUERY_PORT}" ]; then
    STARTCOMMAND+=("-queryport=${QUERY_PORT}")
fi

if [ "${COMMUNITY,,}" = true ]; then
    STARTCOMMAND+=("EpicApp=PalServer")
fi

if [ "${MULTITHREADING,,}" = true ]; then
    STARTCOMMAND+=("-useperfthreads" "-NoAsyncLoadingThread" "-UseMultithreadForDS")
fi

printf "\e[0;32m*****CHECKING FOR EXISTING CONFIG*****\e[0m\n"

# shellcheck disable=SC2143
if [ ! "$(grep -s '[^[:space:]]' /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini)" ]; then

    printf "\e[0;32m*****GENERATING CONFIG*****\e[0m\n"

    # Server will generate all ini files after first run.
    FEXBash -c 'timeout --preserve-status 15s ./PalServer.sh 1> /dev/null'

    # Wait for shutdown
    sleep 5
    cp /palworld/DefaultPalWorldSettings.ini /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi

fileExists "/palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini" || exit
isWritable "/palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini" || exit

escape_sed() {
    printf '%s\n' "$1" | sed -e 's:[][\/.^$*]:\\&:g'
}

if [ -n "${SERVER_NAME}" ]; then
    SERVER_NAME=$(escape_sed "$SERVER_NAME" | sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/")
    echo "SERVER_NAME=${SERVER_NAME}"
    sed -E -i "s/ServerName=\"[^\"]*\"/ServerName=\"$SERVER_NAME\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${SERVER_DESCRIPTION}" ]; then
    SERVER_DESCRIPTION=$(escape_sed "$SERVER_DESCRIPTION" | sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/")
    echo "SERVER_DESCRIPTION=${SERVER_DESCRIPTION}"
    sed -E -i "s/ServerDescription=\"[^\"]*\"/ServerDescription=\"$SERVER_DESCRIPTION\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${SERVER_PASSWORD}" ]; then
    SERVER_PASSWORD=$(sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/" <<< "$SERVER_PASSWORD")
    echo "SERVER_PASSWORD=${SERVER_PASSWORD}"
    sed -E -i "s/ServerPassword=\"[^\"]*\"/ServerPassword=\"$SERVER_PASSWORD\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ADMIN_PASSWORD}" ]; then
    ADMIN_PASSWORD=$(sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/" <<< "$ADMIN_PASSWORD")
    echo "ADMIN_PASSWORD=${ADMIN_PASSWORD}"
    sed -E -i "s/AdminPassword=\"[^\"]*\"/AdminPassword=\"$ADMIN_PASSWORD\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYERS}" ]; then
    echo "PLAYERS=${PLAYERS}"
    sed -E -i "s/ServerPlayerMaxNum=[0-9]*/ServerPlayerMaxNum=$PLAYERS/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PUBLIC_IP}" ]; then
    PUBLIC_IP=$(sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/" <<< "$PUBLIC_IP")
    echo "PUBLIC_IP=${PUBLIC_IP}"
    sed -E -i "s/PublicIP=\"[^\"]*\"/PublicIP=\"$PUBLIC_IP\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PUBLIC_PORT}" ]; then
    echo "PUBLIC_PORT=${PUBLIC_PORT}"
    sed -E -i "s/PublicPort=[0-9]*/PublicPort=$PUBLIC_PORT/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DIFFICULTY}" ]; then
    echo "DIFFICULTY=$DIFFICULTY"
    sed -E -i "s/Difficulty=[a-zA-Z]*/Difficulty=$DIFFICULTY/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DAYTIME_SPEEDRATE}" ]; then
    echo "DAYTIME_SPEEDRATE=$DAYTIME_SPEEDRATE"
    sed -E -i "s/DayTimeSpeedRate=[+-]?([0-9]*[.])?[0-9]+/DayTimeSpeedRate=$DAYTIME_SPEEDRATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${NIGHTTIME_SPEEDRATE}" ]; then
    echo "NIGHTTIME_SPEEDRATE=$NIGHTTIME_SPEEDRATE"
    sed -E -i "s/NightTimeSpeedRate=[+-]?([0-9]*[.])?[0-9]+/NightTimeSpeedRate=$NIGHTTIME_SPEEDRATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${EXP_RATE}" ]; then
    echo "EXP_RATE=$EXP_RATE"
    sed -E -i "s/ExpRate=[+-]?([0-9]*[.])?[0-9]+/ExpRate=$EXP_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_CAPTURE_RATE}" ]; then
    echo "PAL_CAPTURE_RATE=$PAL_CAPTURE_RATE"
    sed -E -i "s/PalCaptureRate=[+-]?([0-9]*[.])?[0-9]+/PalCaptureRate=$PAL_CAPTURE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_SPAWN_NUM_RATE}" ]; then
    echo "PAL_SPAWN_NUM_RATE=$PAL_SPAWN_NUM_RATE"
    sed -E -i "s/PalSpawnNumRate=[+-]?([0-9]*[.])?[0-9]+/PalSpawnNumRate=$PAL_SPAWN_NUM_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_DAMAGE_RATE_ATTACK}" ]; then
    echo "PAL_DAMAGE_RATE_ATTACK=$PAL_DAMAGE_RATE_ATTACK"
    sed -E -i "s/PalDamageRateAttack=[+-]?([0-9]*[.])?[0-9]+/PalDamageRateAttack=$PAL_DAMAGE_RATE_ATTACK/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_DAMAGE_RATE_DEFENSE}" ]; then
    echo "PAL_DAMAGE_RATE_DEFENSE=$PAL_DAMAGE_RATE_DEFENSE"
    sed -E -i "s/PalDamageRateDefense=[+-]?([0-9]*[.])?[0-9]+/PalDamageRateDefense=$PAL_DAMAGE_RATE_DEFENSE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_DAMAGE_RATE_ATTACK}" ]; then
    echo "PLAYER_DAMAGE_RATE_ATTACK=$PLAYER_DAMAGE_RATE_ATTACK"
    sed -E -i "s/PlayerDamageRateAttack=[+-]?([0-9]*[.])?[0-9]+/PlayerDamageRateAttack=$PLAYER_DAMAGE_RATE_ATTACK/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_DAMAGE_RATE_DEFENSE}" ]; then
    echo "PLAYER_DAMAGE_RATE_DEFENSE=$PLAYER_DAMAGE_RATE_DEFENSE"
    sed -E -i "s/PlayerDamageRateDefense=[+-]?([0-9]*[.])?[0-9]+/PlayerDamageRateDefense=$PLAYER_DAMAGE_RATE_DEFENSE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_STOMACH_DECREASE_RATE}" ]; then
    echo "PLAYER_STOMACH_DECREASE_RATE=$PLAYER_STOMACH_DECREASE_RATE"
    sed -E -i "s/PlayerStomachDecreaceRate=[+-]?([0-9]*[.])?[0-9]+/PlayerStomachDecreaceRate=$PLAYER_STOMACH_DECREASE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_STAMINA_DECREASE_RATE}" ]; then
    echo "PLAYER_STAMINA_DECREASE_RATE=$PLAYER_STAMINA_DECREASE_RATE"
    sed -E -i "s/PlayerStaminaDecreaceRate=[+-]?([0-9]*[.])?[0-9]+/PlayerStaminaDecreaceRate=$PLAYER_STAMINA_DECREASE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_AUTO_HP_REGEN_RATE}" ]; then
    echo "PLAYER_AUTO_HP_REGEN_RATE=$PLAYER_AUTO_HP_REGEN_RATE"
    sed -E -i "s/PlayerAutoHPRegeneRate=[+-]?([0-9]*[.])?[0-9]+/PlayerAutoHPRegeneRate=$PLAYER_AUTO_HP_REGEN_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PLAYER_AUTO_HP_REGEN_RATE_IN_SLEEP}" ]; then
    echo "PLAYER_AUTO_HP_REGEN_RATE_IN_SLEEP=$PLAYER_AUTO_HP_REGEN_RATE_IN_SLEEP"
    sed -E -i "s/PlayerAutoHpRegeneRateInSleep=[+-]?([0-9]*[.])?[0-9]+/PlayerAutoHpRegeneRateInSleep=$PLAYER_AUTO_HP_REGEN_RATE_IN_SLEEP/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_STOMACH_DECREASE_RATE}" ]; then
    echo "PAL_STOMACH_DECREASE_RATE=$PAL_STOMACH_DECREASE_RATE"
    sed -E -i "s/PalStomachDecreaceRate=[+-]?([0-9]*[.])?[0-9]+/PalStomachDecreaceRate=$PAL_STOMACH_DECREASE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_STAMINA_DECREASE_RATE}" ]; then
    echo "PAL_STAMINA_DECREASE_RATE=$PAL_STAMINA_DECREASE_RATE"
    sed -E -i "s/PalStaminaDecreaceRate=[+-]?([0-9]*[.])?[0-9]+/PalStaminaDecreaceRate=$PAL_STAMINA_DECREASE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_AUTO_HP_REGEN_RATE}" ]; then
    echo "PAL_AUTO_HP_REGEN_RATE=$PAL_AUTO_HP_REGEN_RATE"
    sed -E -i "s/PalAutoHPRegeneRate=[+-]?([0-9]*[.])?[0-9]+/PalAutoHPRegeneRate=$PAL_AUTO_HP_REGEN_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_AUTO_HP_REGEN_RATE_IN_SLEEP}" ]; then
    echo "PAL_AUTO_HP_REGEN_RATE_IN_SLEEP=$PAL_AUTO_HP_REGEN_RATE_IN_SLEEP"
    sed -E -i "s/PalAutoHpRegeneRateInSleep=[+-]?([0-9]*[.])?[0-9]+/PalAutoHpRegeneRateInSleep=$PAL_AUTO_HP_REGEN_RATE_IN_SLEEP/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${BUILD_OBJECT_DAMAGE_RATE}" ]; then
    echo "BUILD_OBJECT_DAMAGE_RATE=$BUILD_OBJECT_DAMAGE_RATE"
    sed -E -i "s/BuildObjectDamageRate=[+-]?([0-9]*[.])?[0-9]+/BuildObjectDamageRate=$BUILD_OBJECT_DAMAGE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${BUILD_OBJECT_DETERIORATION_DAMAGE_RATE}" ]; then
    echo "BUILD_OBJECT_DETERIORATION_DAMAGE_RATE=$BUILD_OBJECT_DETERIORATION_DAMAGE_RATE"
    sed -E -i "s/BuildObjectDeteriorationDamageRate=[+-]?([0-9]*[.])?[0-9]+/BuildObjectDeteriorationDamageRate=$BUILD_OBJECT_DETERIORATION_DAMAGE_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${COLLECTION_DROP_RATE}" ]; then
    echo "COLLECTION_DROP_RATE=$COLLECTION_DROP_RATE"
    sed -E -i "s/CollectionDropRate=[+-]?([0-9]*[.])?[0-9]+/CollectionDropRate=$COLLECTION_DROP_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${COLLECTION_OBJECT_HP_RATE}" ]; then
    echo "COLLECTION_OBJECT_HP_RATE=$COLLECTION_OBJECT_HP_RATE"
    sed -E -i "s/CollectionObjectHpRate=[+-]?([0-9]*[.])?[0-9]+/CollectionObjectHpRate=$COLLECTION_OBJECT_HP_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${COLLECTION_OBJECT_RESPAWN_SPEED_RATE}" ]; then
    echo "COLLECTION_OBJECT_RESPAWN_SPEED_RATE=$COLLECTION_OBJECT_RESPAWN_SPEED_RATE"
    sed -E -i "s/CollectionObjectRespawnSpeedRate=[+-]?([0-9]*[.])?[0-9]+/CollectionObjectRespawnSpeedRate=$COLLECTION_OBJECT_RESPAWN_SPEED_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENEMY_DROP_ITEM_RATE}" ]; then
    echo "ENEMY_DROP_ITEM_RATE=$ENEMY_DROP_ITEM_RATE"
    sed -E -i "s/EnemyDropItemRate=[+-]?([0-9]*[.])?[0-9]+/EnemyDropItemRate=$ENEMY_DROP_ITEM_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DEATH_PENALTY}" ]; then
    echo "DEATH_PENALTY=$DEATH_PENALTY"
    sed -E -i "s/DeathPenalty=[a-zA-Z]*/DeathPenalty=$DEATH_PENALTY/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_PLAYER_TO_PLAYER_DAMAGE}" ]; then
    echo "ENABLE_PLAYER_TO_PLAYER_DAMAGE=$ENABLE_PLAYER_TO_PLAYER_DAMAGE"
    sed -E -i "s/bEnablePlayerToPlayerDamage=[a-zA-Z]*/bEnablePlayerToPlayerDamage=$ENABLE_PLAYER_TO_PLAYER_DAMAGE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_FRIENDLY_FIRE}" ]; then
    echo "ENABLE_FRIENDLY_FIRE=$ENABLE_FRIENDLY_FIRE"
    sed -E -i "s/bEnableFriendlyFire=[a-zA-Z]*/bEnableFriendlyFire=$ENABLE_FRIENDLY_FIRE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_INVADER_ENEMY}" ]; then
    echo "ENABLE_INVADER_ENEMY=$ENABLE_INVADER_ENEMY"
    sed -E -i "s/bEnableInvaderEnemy=[a-zA-Z]*/bEnableInvaderEnemy=$ENABLE_INVADER_ENEMY/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ACTIVE_UNKO}" ]; then
    echo "ACTIVE_UNKO=$ACTIVE_UNKO"
    sed -E -i "s/bActiveUNKO=[a-zA-Z]*/bActiveUNKO=$ACTIVE_UNKO/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_AIM_ASSIST_PAD}" ]; then
    echo "ENABLE_AIM_ASSIST_PAD=$ENABLE_AIM_ASSIST_PAD"
    sed -E -i "s/bEnableAimAssistPad=[a-zA-Z]*/bEnableAimAssistPad=$ENABLE_AIM_ASSIST_PAD/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_AIM_ASSIST_KEYBOARD}" ]; then
    echo "ENABLE_AIM_ASSIST_KEYBOARD=$ENABLE_AIM_ASSIST_KEYBOARD"
    sed -E -i "s/bEnableAimAssistKeyboard=[a-zA-Z]*/bEnableAimAssistKeyboard=$ENABLE_AIM_ASSIST_KEYBOARD/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DROP_ITEM_MAX_NUM}" ]; then
    echo "DROP_ITEM_MAX_NUM=$DROP_ITEM_MAX_NUM"
    sed -E -i "s/DropItemMaxNum=[0-9]*/DropItemMaxNum=$DROP_ITEM_MAX_NUM/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DROP_ITEM_MAX_NUM_UNKO}" ]; then
    echo "DROP_ITEM_MAX_NUM_UNKO=$DROP_ITEM_MAX_NUM_UNKO"
    sed -E -i "s/DropItemMaxNum_UNKO=[0-9]*/DropItemMaxNum_UNKO=$DROP_ITEM_MAX_NUM_UNKO/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${BASE_CAMP_MAX_NUM}" ]; then
    echo "BASE_CAMP_MAX_NUM=$BASE_CAMP_MAX_NUM"
    sed -E -i "s/BaseCampMaxNum=[0-9]*/BaseCampMaxNum=$BASE_CAMP_MAX_NUM/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${BASE_CAMP_WORKER_MAXNUM}" ]; then
    echo "BASE_CAMP_WORKER_MAXNUM=$BASE_CAMP_WORKER_MAXNUM"
    sed -E -i "s/BaseCampWorkerMaxNum=[0-9]*/BaseCampWorkerMaxNum=$BASE_CAMP_WORKER_MAXNUM/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${DROP_ITEM_ALIVE_MAX_HOURS}" ]; then
    echo "DROP_ITEM_ALIVE_MAX_HOURS=$DROP_ITEM_ALIVE_MAX_HOURS"
    sed -E -i "s/DropItemAliveMaxHours=[+-]?([0-9]*[.])?[0-9]+/DropItemAliveMaxHours=$DROP_ITEM_ALIVE_MAX_HOURS/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${AUTO_RESET_GUILD_NO_ONLINE_PLAYERS}" ]; then
    echo "AUTO_RESET_GUILD_NO_ONLINE_PLAYERS=$AUTO_RESET_GUILD_NO_ONLINE_PLAYERS"
    sed -E -i "s/bAutoResetGuildNoOnlinePlayers=[a-zA-Z]*/bAutoResetGuildNoOnlinePlayers=$AUTO_RESET_GUILD_NO_ONLINE_PLAYERS/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS}" ]; then
    echo "AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS=$AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS"
    sed -E -i "s/AutoResetGuildTimeNoOnlinePlayers=[+-]?([0-9]*[.])?[0-9]+/AutoResetGuildTimeNoOnlinePlayers=$AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${GUILD_PLAYER_MAX_NUM}" ]; then
    echo "GUILD_PLAYER_MAX_NUM=$GUILD_PLAYER_MAX_NUM"
    sed -E -i "s/GuildPlayerMaxNum=[0-9]*/GuildPlayerMaxNum=$GUILD_PLAYER_MAX_NUM/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${PAL_EGG_DEFAULT_HATCHING_TIME}" ]; then
    echo "PAL_EGG_DEFAULT_HATCHING_TIME=$PAL_EGG_DEFAULT_HATCHING_TIME"
    sed -E -i "s/PalEggDefaultHatchingTime=[+-]?([0-9]*[.])?[0-9]+/PalEggDefaultHatchingTime=$PAL_EGG_DEFAULT_HATCHING_TIME/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${WORK_SPEED_RATE}" ]; then
    echo "WORK_SPEED_RATE=$WORK_SPEED_RATE"
    sed -E -i "s/WorkSpeedRate=[+-]?([0-9]*[.])?[0-9]+/WorkSpeedRate=$WORK_SPEED_RATE/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${IS_MULTIPLAY}" ]; then
    echo "IS_MULTIPLAY=$IS_MULTIPLAY"
    sed -E -i "s/bIsMultiplay=[a-zA-Z]*/bIsMultiplay=$IS_MULTIPLAY/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${IS_PVP}" ]; then
    echo "IS_PVP=$IS_PVP"
    sed -E -i "s/bIsPvP=[a-zA-Z]*/bIsPvP=$IS_PVP/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP}" ]; then
    echo "CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP=$CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP"
    sed -E -i "s/bCanPickupOtherGuildDeathPenaltyDrop=[a-zA-Z]*/bCanPickupOtherGuildDeathPenaltyDrop=$CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_NON_LOGIN_PENALTY}" ]; then
    echo "ENABLE_NON_LOGIN_PENALTY=$ENABLE_NON_LOGIN_PENALTY"
    sed -E -i "s/bEnableNonLoginPenalty=[a-zA-Z]*/bEnableNonLoginPenalty=$ENABLE_NON_LOGIN_PENALTY/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_FAST_TRAVEL}" ]; then
    echo "ENABLE_FAST_TRAVEL=$ENABLE_FAST_TRAVEL"
    sed -E -i "s/bEnableFastTravel=[a-zA-Z]*/bEnableFastTravel=$ENABLE_FAST_TRAVEL/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${IS_START_LOCATION_SELECT_BY_MAP}" ]; then
    echo "IS_START_LOCATION_SELECT_BY_MAP=$IS_START_LOCATION_SELECT_BY_MAP"
    sed -E -i "s/bIsStartLocationSelectByMap=[a-zA-Z]*/bIsStartLocationSelectByMap=$IS_START_LOCATION_SELECT_BY_MAP/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${EXIST_PLAYER_AFTER_LOGOUT}" ]; then
    echo "EXIST_PLAYER_AFTER_LOGOUT=$EXIST_PLAYER_AFTER_LOGOUT"
    sed -E -i "s/bExistPlayerAfterLogout=[a-zA-Z]*/bExistPlayerAfterLogout=$EXIST_PLAYER_AFTER_LOGOUT/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${ENABLE_DEFENSE_OTHER_GUILD_PLAYER}" ]; then
    echo "ENABLE_DEFENSE_OTHER_GUILD_PLAYER=$ENABLE_DEFENSE_OTHER_GUILD_PLAYER"
    sed -E -i "s/bEnableDefenseOtherGuildPlayer=[a-zA-Z]*/bEnableDefenseOtherGuildPlayer=$ENABLE_DEFENSE_OTHER_GUILD_PLAYER/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${COOP_PLAYER_MAX_NUM}" ]; then
    echo "COOP_PLAYER_MAX_NUM=$COOP_PLAYER_MAX_NUM"
    sed -E -i "s/CoopPlayerMaxNum=[0-9]*/CoopPlayerMaxNum=$COOP_PLAYER_MAX_NUM/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${REGION}" ]; then
    REGION=$(sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/" <<< "$REGION")
    echo "REGION=$REGION"
    sed -E -i "s/Region=\"[^\"]*\"/Region=\"$REGION\"/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${USEAUTH}" ]; then
    echo "USEAUTH=$USEAUTH"
    sed -E -i "s/bUseAuth=[a-zA-Z]*/bUseAuth=$USEAUTH/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${BAN_LIST_URL}" ]; then
    BAN_LIST_URL=$(sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/" <<< "$BAN_LIST_URL")
    echo "BAN_LIST_URL=$BAN_LIST_URL"
    sed -E -i "s~BanListURL=\"[^\"]*\"~BanListURL=\"$BAN_LIST_URL\"~" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${RCON_ENABLED,,}" ]; then
    echo "RCON_ENABLED=${RCON_ENABLED,,}"
    sed -i "s/RCONEnabled=[a-zA-Z]*/RCONEnabled=$RCON_ENABLED/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi
if [ -n "${RCON_PORT}" ]; then
    echo "RCON_PORT=${RCON_PORT}"
    sed -i "s/RCONPort=[0-9]*/RCONPort=$RCON_PORT/" /palworld/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini
fi

rm -f  "/home/steam/server/crontab"
if [ "${BACKUP_ENABLED,,}" = true ]; then
    echo "BACKUP_ENABLED=${BACKUP_ENABLED,,}"

    echo "$BACKUP_CRON_EXPRESSION bash /usr/local/bin/backup" >> "/home/steam/server/crontab"
fi

if [ "${AUTO_UPDATE_ENABLED,,}" = true ] && [ "${UPDATE_ON_BOOT}" = true ]; then
    echo "AUTO_UPDATE_ENABLED=${AUTO_UPDATE_ENABLED,,}"
    echo "$AUTO_UPDATE_CRON_EXPRESSION bash /usr/local/bin/update" >> "/home/steam/server/crontab"
fi

if [ "${AUTO_REBOOT_ENABLED,,}" = true ] && [ "${RCON_ENABLED,,}" = true ]; then
    echo "AUTO_REBOOT_ENABLED=${AUTO_REBOOT_ENABLED,,}"
    echo "$AUTO_REBOOT_CRON_EXPRESSION bash /home/steam/server/auto_reboot.sh" >> "/home/steam/server/crontab"
fi

if { [ "${AUTO_UPDATE_ENABLED,,}" = true ] && [ "${UPDATE_ON_BOOT,,}" = true ]; } || [ "${BACKUP_ENABLED,,}" = true ] || \
    [ "${AUTO_REBOOT_ENABLED,,}" = true ]; then
    supercronic "/home/steam/server/crontab" &
fi

# Configure RCON settings
cat >/home/steam/server/rcon.yaml  <<EOL
default:
  address: 127.0.0.1:${RCON_PORT}
  password: "${ADMIN_PASSWORD}"
EOL

printf "\e[0;32m*****STARTING SERVER*****\e[0m\n"
echo "${STARTCOMMAND[*]}"
FEXBash -c "${STARTCOMMAND[*]}"
exit 0
```
61, 97, 398 라인: FEX-Emu를 통해 ARM에서 문제없이 돌아가도록 함

## docker-compose.yml
```yaml
version: "3.9"
services:
  palworld:
    container_name: palworld
    restart: unless-stopped
    stop_grace_period: 30s
    build:
      context: .
    ports:
      - 8211:8211/udp
      - 27015:27015/udp
    env_file:
      - .env
      - settings.env
    environment:
      - PUID=1001
      - PGID=1001
      - MULTITHREADING=true
      - UPDATE_ON_BOOT=false
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

## Build
한 15~20분 정도 걸리는 듯..
```shell
docker compose up -d --build
```

이후부터는 `--build` 제거 후 사용.  
다른 명령어는 [이전 글](/posts/palworld-server-docker/#그-외) 참고.
