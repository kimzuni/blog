---
title: 리눅스에서 한/영 키, 한자 키 사용하기
date: 2023-02-12 17:31:00 +0900
last_modified_at: 2023-02-12 17:31:00 +0900
categories: ["Linux"]
tags: ["Intro"]
---

요즘 나오는 키보드는 [Alt] 키와 [한/영] 키, [Ctrl] 키와 [한자] 키가 통합되어 나오는 경우가 많다.  
하지만 리눅스에서는 해당 키를 [Alt], [Ctrl] 키로만 인식하기 때문에 [한/영], [한자] 키로 사용하려면 별도의 설정이 필요하다.

참고로 설정을 하면 오른쪽의 [Alt], [Ctrl] 키는 제 기능을 못 하게 된다.  
하지만 이 키를 사용할 일이 없어서 불편한 적은 단 한 번도 없었다.

## 한/영 키
`/usr/share/X11/xkb/symbols/altwin` 파일에서 `Alt_R, Meta_R`을 `Hangul`로 수정하면 오른쪽의 [Alt] 키가 [한/영] 키로 인식하게 된다.
![xkb altwin](linux-xkb-altwin.png)

## 한자 키
`/usr/share/X11/xkb/symbols/pc` 파일에서 `Control_R`을 `Hangul_Hanja`로 수정하면 오른쪽의 [Ctrl] 키가 [한자] 키로 인식하게 된다.  
사진에서는 잘 안보이지만 `Hangul`와 `Hanja` 사이에 언더바(_)가 있다.
![xkb pc](linux-xkb-pc.png)
