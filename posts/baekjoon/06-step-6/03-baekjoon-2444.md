---
title: 별 찍기 - 7 (2444)
date: 2023-02-24 10:02:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2444](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2444.png)

한 변의 길이가 n인 마름모.

## Bash

```bash
read n
for ((i=0; i<n*2-1; i++)); do
	l=$((n * 2 - 1))
	p=$((i * 2 + 1))
	if [ $l -lt $p ]; then
		((p += (l-p)*2))
	fi
	o=""
	for ((j=0; j<p; j++)); do
		o+="*"
	done
	s=$((n - p/2 - 1))
	printf "%${s}s${o}\n"
done
```

## Node.js

```javascript
const n = Number(require("fs").readFileSync(0).toString().trim());
for (let i=0; i<n*2-1; i++) {
	let l = n*2-1;
	let p = i*2+1;
	if (l < p) p += (l-p)*2
	let o = Array(p).fill("*").join("");
	let s = Array(n-p/2-0.5).fill(" ").join("");
	console.log(s + o);
}
```

## Python3

```python
n = int(input())
for i in range(n*2-1):
    l = n*2-1
    p = i*2+1
    if l<p: p += (l-p)*2
    f = "{" + "0:^{}".format(l) + "}"
    o = ["*" for j in range(p)]
    output = f.format("".join(o))
    print(output.rstrip())
```

포맷팅에서 변수를 사용하여 문자열 수를 지정하기 위해 포맷팅을 사용한다.

각 라인 별 오른쪽에 공백이 있으면 틀렸다고 뜨기 때문에 `rstrip()`으로 오른쪽 공백 제거.

## Ruby

```ruby
n = gets.chomp.to_i
for i in 0...n*2-1
  l = n*2-1
  p = i*2+1
  p += (l-p)*2 if l<p
  o = "*" * p
  s = " " * (n-p/2-1)
  puts s + o
end
```
