---
title: 그대로 출력하기 (11718)
date: 2023-02-23 20:27:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.11718](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11718.png)

입력받은 값을 그대로 출력하라.

## Bash

```bash
while :; do
	read str
	if [ "$str" == "" ]; then
		break
	fi
	echo "$str"
done
```

따옴표로 묶지 않으면 출력 형식이 잘못되었다고 뜬다.

## Node.js

```javascript
const [...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
console.log(arr.join("\n"));
```

## Python3

```python
try:
    while 1: print(input())
except: pass
```

## Ruby

```ruby
begin
  while 1
    puts gets.chomp
  end
rescue
  nil
end
```
