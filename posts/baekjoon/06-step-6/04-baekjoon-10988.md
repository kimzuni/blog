---
title: 팰린드롬인지 확인하기 (10988)
date: 2023-02-27 20:49:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10988](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10988.png)

기러기 토마토 스위스 인도인 별똥별 우영우 ..역삼역

## Bash

```bash
read str
rev=""
cnt=${#str}
while [ 0 -lt $cnt ]; do
	((cnt--))
	rev+=${str:$cnt:1}
done
test "$str" == "$rev" && echo 1 || echo 0
```

## Node.js

```javascript
const str = require("fs").readFileSync(0).toString().trim();
const rev = str.split("").reverse().join("");
const o = str == rev ? 1 : 0;
console.log(o);
```

## Python3

```python
a = input()
o = 1 if a == a[::-1] else 0
print(o)
```

## Ruby

```ruby
str = gets.chomp
o = str == str.reverse ? 1 : 0
puts o
```
