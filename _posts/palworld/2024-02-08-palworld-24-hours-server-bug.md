---
title: Palworld 서버를 24시간 열어둘 경우 생기는 문제
date: 2024-02-08 18:04:01 +0900
categories: [Game, Palworld]
tags: [GitHub, Bug, Issue]
thumbnail: palworld-24-hours-server-bug.jpg
---

어제 도커로 서버 올려놓고 닫지 않고 잤더니  
![24 Hours Server Bug](palworld-24-hours-server-bug.jpg)  
애들이 다 죽기 직전이네..



## 원인
플레이어가 팰 근처인지 거점 근처인지 거기서부터 멀어질수록 얘들이 하는 행동이 느려진다고 한다.
그래서 서버에 아무도 없으면 전혀 움직이지 않아서 생기는 문제라고..

## 임시 대처 방법
[도커 이미지 GitHub](https://github.com/thijsvanloef/palworld-server-docker)의 [Issues](https://github.com/thijsvanloef/palworld-server-docker/issues/32)에 해당 문제가 올라와 있다.  
해당 페이지의 하단에 어느 한국인이 [파이썬 스크립트](https://github.com/thijsvanloef/palworld-server-docker/issues/32#issuecomment-1926103919)를 짜놓은 게 있는데, `rcon`을 통해 접속 중인 플레이어가 있는지 체크하고, 없다면 컨테이너 자체를 중지한 후 `tcpdump` 명령어로 서버 연결 포트를 탐지하여 연결 요청이 들어오면 다시 컨테이너가 돌아가게 만드는 코드다.  
코드는 컨테이너가 아닌 호스트에서 실행해야 한다.

아래 코드는 조금 수정한 코드.
```python
import subprocess
import time

TARGET_PORT = 8211
CONTAINER_NAME = "palworld-server"
sudo_password = "your_sudo_password_here" # sudo 명령어 사용 시 패스워드 입력이 필요없다면 삭제


def check_players():
    players_output = run_command(
        f"docker exec {CONTAINER_NAME} rcon-cli ShowPlayers"
    )
    print(f"player: {players_output}")
    return "," in players_output.replace("name,playeruid,steamid", "") # itzg/rcon-cli을 사용할 때 문제 발생 해결

def run_command(command):
    """Helper function to run a shell command and return its output"""
    result = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True
    )
    return result.stdout.strip()


def main():
    if not check_players():
        print("No players found. Restart the server.")
        run_command(f"docker restart {CONTAINER_NAME}")

        for sec in range(30, 0, -1):
            print(f"Waiting for restart to complete... {sec} seconds left")
            time.sleep(1)

        # if not players, pause server
        if not check_players():
            print("Restart complete. Pause the server.")
            run_command(f"docker pause {CONTAINER_NAME}")
            player = False
            print("Waiting for players to connect")
        else:
            player = True

        while not player:
            # Use tcpdump to capture incoming traffic on the target port
            #capture_command = f"echo {sudo_password} | sudo -S tcpdump -n -c 1 -i any port {TARGET_PORT} 2>/dev/null"
            capture_command = f"sudo -S tcpdump -n -c 1 -i any port {TARGET_PORT} 2>/dev/null" # 패스워드 입력 필요없는 경우
            capture_result = run_command(capture_command)

            # Check if any packets were captured
            if capture_result:
                player = True
                print(f"Connection attempt detected on port {TARGET_PORT}")
                print("Starting server")
                run_command(f"docker unpause {CONTAINER_NAME}")

                for sec in range(30, 0, -1):
                    print(f"Waiting for players to connect... {sec} seconds left")
                    time.sleep(1)
            else:
                time.sleep(1)
    else:
        print("Players found. Server will continue running.")
        time.sleep(60)


if __name__ == "__main__":
    while True:
        main()
```

코드를 수정한 이유는
1. [이전 글](/posts/palworld-server-docker-arm64/#dockerfile)에서 말한 [itzg/rcon-cli](https://github.com/itzg/rcon-cli/)을 사용할 때 뜨는 문구 때문에 check_players 함수는 항상 True를 리턴함.
2. `tcpdump` 명령어가 요청을 대기하지 않고 그냥 넘어가버림.

이 글을 쓰는 지금은 1번의 경우 `rcon`을 변경해서 상관없지만, 2번은 `sudo` 명령어 사용 시 패스워드 입력이 필요 없어서 발생한 문제다. 패스워드 입력을 위해 `echo {sudo_password} | ` 명령어를 사용하는데, 패스워드를 묻지 않기 때문에 표준 입력으로 넘긴 저 패스워드가 `tcpdump` 명령어가 받아서 그런 듯.

수정한 부분은 해당 issue에 [댓글](https://github.com/thijsvanloef/palworld-server-docker/issues/32#issuecomment-1933634837)로 남겨놨다

### 사용법
위 코드를 파일에 저장하고 `python3 file.py` 명령어로 스크립트 실행.  
또는 터미널을 닫아도 백그라운드로 돌아가게 하려면 `nohub python3 file.py 2>&1 &` 명령어 실행.

잘만 하면 컨테이너 내부에서 실행하도록 만들어서 이미지 빌드 할 때 기능으로 추가해도 될 듯한데..
