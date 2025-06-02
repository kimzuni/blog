---
title: 문자열 (9086)
date: 2023-02-23 20:23:00 +0900
tags: ["Bash", "Node.js", "Python3", "Ruby"]
---

![Baekjoon No.9086](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-9086.png)

첫 글자와 마지막 글자를 출력하라.

## Bash

```bash
read t
for ((i=0; i<t; i++)); do
	read str
	echo ${str::1}${str: -1}
done
```

## Node.js

```javascript
const [t, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let str of arr) {
	console.log( str[0] + str[str.length-1] );
}
```

## Python3

```python
t = int(input())
for i in range(t):
    a = input()
    print(a[0] + a[-1])
```

## Ruby

```ruby
t = gets.chomp.to_i
for i in 0...t
  str = gets.chomp
  puts str[0] + str[-1]
end
```
