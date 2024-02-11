---
title: "Dovecot: SSL_accept() failed"
date: 2023-06-01 23:03:16 +0900
categories: [Raspberry Pi]
tags: [Error, Dovecot, Gmail, SSL/TLS]
thumbnail: dovecot-imap-ssl-error.png
---

crontab 설정 시 설정된 명령어가 실행되면 root가 root에게 메일을 보낸다.  
나는 메일 서버를 직접 구축해서 사용하고 있기 때문에 로컬 메일도 다 확인이 가능해서 이 메일을 자주 본다.  
그런데 오늘 crontab에 설정한 명령어가 동작할 시간이 지났는데도 메일이 오지 않았다.

## 원인
일단 서버는 잘 살아있고, 설정한 명령어도 오류 없이 잘 동작한 것을 확인했다.  
메일 서버도 정상적으로 돌아가고, 웹 메일 클라이언트도 접속이 됐다.  
그리고 중요한 것은 웹에서는 메일이 정상적으로 들어와있었다는 것이다.  
스마트폰에서 메일을 확인하기 위해 연결해둔 Dovecot 서버와 Gmail 앱이 동기화되지 않았던 것이다.  
그래서 메일 로그를 확인했고, Dovecot의 SSL/TLS 에러라는 것을 알게 됐다.

정확한 에러 내용은 아래 사진 참고.  
![dovecot: imap-login: Disconnected (no auth attempts in 0 secs): user=<\>, rip=x.x.x.x, lip=x.x.x.x, TLS handshaking: SSL_accept() failed: error: 14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown: SSL alert number 46, session=<xxxxxxxxxx\>](dovecot-imap-ssl-error.png)  

설정된 SSL 경로, 인증서 파일, 기간 등 모든 것들을 확인해 봤지만, 모든 게 정상이었다.  
그리고 웹 메일 클라이언트로 메일을 보내서 테스트를 해봤는데.. 역시 SSL이 정상적으로 적용이 되어있다.  
![SSL 적용 확인](dovecot-imap-ssl-error-check.png)

## 해결
결국 구글링을 했고, [어떤 글](https://www.linode.com/community/questions/22198/dovecot-tls-handshaking-ssl_accept-failed-error14094416ssl-routinesssl3_read_byt)에서 `ssl_min_protocol` 설정을 하라고 한다.  
`/etc/dovecot/conf.d/10-ssl.conf` 파일을 확인해 보니 해당 부분이 주석 처리되어 있다.  
![ssl_min_protocol = TLSv1.2](dovecot-imap-ssl-error-config.png)  
주석을 풀고 Dovecot 재시작을 하니 정상적으로 Gmail 앱과 Dovecot이 동기화 됐다.

<br/>

최근에 Dovecot 설정을 바꾼 적도 없는데 갑자기 왜 이런 에러가 뜬 거지..?  
Dovecot이 업데이트되면서 생긴 문제인가.. Gmail에서 요구하는 무언가 바뀐 건가..  
몰라 아무튼 해결.
