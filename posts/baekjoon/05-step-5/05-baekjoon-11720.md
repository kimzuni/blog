---
title: 숫자의 합 (11720)
date: 2023-02-17 17:46:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.11720](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11720.png)

주어진 수의 각 자릿수를 모두 더한 값은?

## Bash

```bash
read n
read m
#while [ $m != 0 ]; do
#	((t += m%10, m /= 10))
#done
for ((i=0; i<$n; i++)); do
	add=${m:$i:1}
	((t += add))
done
echo $t
```

주석 처리된 코드는 백준에서 틀린 답이라고 나온다.

## Node.js

```javascript
const [n, num] = require("fs").readFileSync(0).toString().trim().split("\n");
const arr = num.split("").map(Number);
console.log( arr.reduce((r, x, i) => { return r+x; }) );
```

## Python3

```python
n = int(input())
arr = map(int, list(input()))
print( sum(arr) )
```

## Ruby

```ruby
n = gets.chomp.to_i
arr = gets.chomp.split("").map {|i| i.to_i}
puts arr.sum()
```
