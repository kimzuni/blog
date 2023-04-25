---
title: 아나콘다 설치 및 실행 (Linux)
date: 2023-04-25 15:24:00 +0900
last_modified_at: 2023-04-25 15:24:00 +0900
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

## Jupyter Notebook 기본 디렉토리 변경
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
```terminal
# ./anaconda3/bin/jupyter notebook
# ./anaconda3/bin/jupyter lab
```
{% imgbox %}
![Anaconda3 - Jupyter Notebook Start](linux-install-anaconda-jupyter-notebook.png)
![Anaconda3 - Jupyter Lab Start](linux-install-anaconda-jupyter-lab.png)
{% endimgbox %}

## 삭제
`anaconda3` 디렉토리에 모두 설치되기 때문에 해당 디렉토리만 삭제하면 된다.
```terminal
# rm -rf ./anaconda3
```
