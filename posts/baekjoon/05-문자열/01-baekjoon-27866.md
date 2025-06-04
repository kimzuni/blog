---
title: 문자와 문자열 (27866)
date: 2023-06-20 21:57:38 +0900
last_modified_at: false
tags: ["Bash", "Node.js", "Python3", "Ruby"]
---

![Baekjoon No.27866 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-27866.png)

주어진 문자열에서 n번째 알파벳을 출력하라.

## Bash

```bash
read str
read n
echo "${str:$n-1:1}"
```

## Node.js

```javascript
const [str, n] = require("fs").readFileSync(0).toString().trim().split("\n");
console.log( str[n*1-1] );
```

## Python3

```python
text = input()
n = int(input())
print( text[n-1] )
```

## Ruby

```ruby
str = gets.chomp
n = gets.chomp.to_i
puts str[n-1]
```
