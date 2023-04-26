---
title: 아나콘다 설치 및 실행 (Linux)
date: 2023-04-25 18:15:00 +0900
last_modified_at: 2023-04-25 18:15:00 +0900
categories: [Linux]
tags: [Install]
thumbnail: linux-install-anaconda-page.png
---

리눅스 배포판 종류와 상관없이 설치할 수 있다.

<br/>

## 설치
[다운로드 페이지](https://www.anaconda.com/download/)에 접속 후 리눅스 버전으로 다운로드  
![Anaconda3 - Download Page](linux-install-anaconda-page.png)

`bash`로 설치
```terminal
# bash Anaconda3.sh
```

그냥 엔터  
![Anaconda3 - Installing 1](linux-install-anaconda-1.png)

라이센스다. q를 누른 후 `yes` 입력
{% imgbox %}
![Anaconda3 - Installing 2](linux-install-anaconda-2.png)
![Anaconda3 - Installing 3](linux-install-anaconda-3.png)
{% endimgbox %}

설치할 경로 선택. 기본값은 홈 디렉토리에 설치된다.  
![Anaconda3 - Installing 4](linux-install-anaconda-4.png)

그리고 한참을 기다리다 보면 설치가 완료되고, 초기화를 하겠냐고 묻는데,
여기서 `yes`를 입력하면 `~/.bashrc` 파일을 수정하여 앞으로 터미널을 실행할 때마다 콘다를 실행하게 된다.  
나는 그냥 웹 서비스만 이용할 거라 no를 선택했다.  
![Anaconda3 - Installing 5](linux-install-anaconda-5.png)

## Notebook/Lab 기본 디렉토리 변경
설정하지 않으면 Jupyter Notebook이나 lab에서 기본 경로가 매번 사용자의 홈 디렉토리로 뜨기 때문에 상당히 불편하다.

아나콘다 설치된 경로 아래 `bin` 디렉토리에 있는 `jupyter` 파일을 사용한다.
```terminal
# ./anaconda3/bin/jupyter notebook --generate-config
# vi ~/.jupyter/jupyter_notebook_config.py
```
![Anaconda3 - Generate config](linux-install-anaconda-config-1.png)

`c.NotebookApp.notebook_dir` 문자열을 찾아 원하는 경로를 입력 후 해당 경로에 맞게 폴더 생성  
![Config - notebook_dir](linux-install-anaconda-config-2.png)

## 실행
### Natigator
```terminal
# ./anaconda3/bin/anaconda-navigator
```
![Anaconda3 - Navigator Start](linux-install-anaconda-navigator.png)

### Jupyter Notebook/Lab
Natigator에서 실행해도 되지만 터미널에서 바로 실행할 수도 있다.  
`jupyter notebook`, `jupyter lab`에서 공백 대신 `-`를 입력해도 된다.  
`jupyter lab` 형식으로 사용하면 `jupyter-lab` 등의 파일로 접근하는 듯.
```terminal
# ./anaconda3/bin/jupyter notebook
# ./anaconda3/bin/jupyter lab
```
{% imgbox %}
![Anaconda3 - Jupyter Notebook Start](linux-install-anaconda-jupyter-notebook.png)
![Anaconda3 - Jupyter Lab Start](linux-install-anaconda-jupyter-lab.png)
{% endimgbox %}

## 실행 파일 생성
아나콘다의 `bin` 디렉토리를 PATH에 등록하기는 싫고, 편하게 사용하고는 싶고..  
그래서 그냥 아래 스크립트 파일을 만들어놓고 명령어 사용하듯 쓰고 있으며, 모두 같은 위치에 있어야 한다.

리눅스는 `~/bin` 디렉토리를 기본적으로 PATH 환경 변수에 등록하기 때문에 해당 위치에 있는 파일에 실행 권한을 주게 되면 명령어처럼 어느 위치에서든 파일명만 입력하여 사용할 수 있게 된다.  
그래서 아래 파일을 모두 `~/bin`에 두고 `conda.conf` 파일을 제외한 모든 파일에 실행 권한을 주고 사용하는 중이다.

### conda.conf
파일을 여러 개 사용하기 때문에 모든 파일에서 같은 값의 변수를 사용하기 위해 필요한 파일.

이 파일에 아나콘다 설치 경로가 입력되어 있다.  
다른 경로에 설치했다면 `CONDA_HOME` 값만 변경해 주면 된다.
```bash
FILENAME="${0##*/}"

CONDA_HOME="$HOME"/anaconda3
CONDA_BIN="$CONDA_HOME"/bin

JUPYTER="$CONDA_BIN"/jupyter
NAVIGATOR="$CONDA_BIN"/anaconda-navigator
```
{: file="conda.conf"}

### anaconda-navigator
`./anaconda3/bin/anaconda-navigator` 파일은 터미널에서 실행 시 실시간 로그가 출력된다.  
백그라운드로 실행하면서 해당 터미널을 닫아도 계속 실행되도록 하기 위해 따로 만들었다.

사용법: `anaconda-navigator`
```bash
#!/usr/bin/env bash

source `dirname "$0"`/conda.conf

nohup $NAVIGATOR > /dev/null 2>&1 &
```
{: file="anaconda-navigator"}

### jupyter
jupyter notebook/lab을 실행, 중지하거나 실행 중인 서버의 목록을 볼 수 있는 스크립트.  
나는 notebook/lab 외 다른 파일은 사용한 적이 없어서 어떻게 돌아가는지 모르기 때문에 notebook/lab만 지원한다.

notebook, lab 둘 중 하나만 실행해도 둘 다 접속이 된다.  
notebook은 `http://localhost:8888/tree`, lab은 `http://localhost:8888/lab`.  
단, tree, lab 입력 없이 웹 사이트 루트에 접속을 했다면 notebook/lab 둘 중 실행한 서버로 리다이렉트된다.

기존의 `./anaconda3/bin/jupyter` 파일처럼 실행 시 웹 브라우저를 자동으로 띄우고 싶다면 `NO_BROWSER` 변수의 값을 변경하면 된다.  
가끔씩 서버 실행 후 페이지 접근 시 인증이 필요한 경우가 생기는데, `jupyter list`를 사용하면 인증할 수 있는 URL이 출력된다.

사용법
- 시작: `jupyter lab start [PORT_NUMBER]`
  - 지정한 포트 번호로 서버가 실행되며, 생략 시 기본 포트인 8888로 실행.
  - 이미 사용 중인 포트라면 사용하지 않는 포트를 찾을 때까지 +1
- 중지
  - `jupyter-lab stop`: 서버가 하나만 실행 중일 때 해당 서버 중지
  - `jupyter-lab stop [PORT_NUMBER]`: 중지할 서버 포트 지정 (해당 포트 번호의 서버가 없으면 목록 출력)
  - `jupyter-lab stop all`: 실행 중인 서버 모두 중지
- 목록: `jupyter lab list`
  - 서버의 포트 및 토큰 인증을 위한 URL 확인 가능

```bash
#!/usr/bin/env bash

source `dirname "$0"`/conda.conf

SERVICE=$1
DO=$2
PORT=$3
SERVER="$JUPYTER-$SERVICE"
NO_BROWSER=true

if [ ! -f "$JUPYTER" ]; then
	echo "$FILENAME: Error: $JUPYTER not Exist."
	exit 1
elif [ ! -f "$SERVER" ]; then
	echo "$FILENAME: Error: $SERVER not Exist."
	exit 1
elif [ "$SERVICE" != "notebook" -a "$SERVICE" != "lab" ]; then
	echo "$FILENAME: Error: $SERVER is not supported."
	exit 1
fi





GET_PORT() {
	local IDX="$1"
	test -z $IDX && IDX=2
	local GET=`echo "$LIST" | head -$IDX | tail -1`
	GET=${GET%\/?token=*}
	GET=${GET##*\:}
	echo $GET
}

if [ "$DO" == "start" ]; then
	test -z "$PORT" && PORT=8888
	OPT=""
	test $NO_BROWSER == true && OPT="--no-browser"
	nohup $SERVER --port=$PORT --allow-root $OPT > /dev/null 2>&1 &
elif [ "$DO" == "list" -o "$DO" == "stop" ]; then
	LIST=`$SERVER list`
	LIST_CNT=`echo "$LIST" | wc -l`
	if [ "$DO" == "list" ]; then
		echo "$LIST"
		exit
	fi

	if [ $LIST_CNT == 1 ]; then
		echo -n ""
		exit
	elif [ "$PORT" == "" -a $LIST_CNT == 2 ]; then
		$SERVER stop `GET_PORT 2`
		exit
	elif [ "$PORT" != "" -a "$PORT" != "all" -a "`expr $PORT \* 0 2> /dev/null`" != 0 ]; then
		echo "Usage: $FILENAME server stop [PORT_NUMBER]"
		exit 1
	fi

	for IDX in $(seq 2 $LIST_CNT); do
		X=`GET_PORT $IDX`
		if [ "$PORT" == "all" -o "$PORT" == $X ]; then
			$SERVER stop $X
			if [ "$PORT" != "all" ]; then
				exit
			fi
		fi
	done
	if [ "$PORT" == "all" ]; then
		exit
	fi

	echo -n "$LIST"
	exit 1
else
	echo "Usage: $FILENAME [ start | list | stop ]"
fi
```
{: file="jupyter"}

## 삭제
`anaconda3` 디렉토리에 모두 설치되기 때문에 해당 디렉토리만 삭제하면 된다.
```terminal
# rm -rf ./anaconda3
```
