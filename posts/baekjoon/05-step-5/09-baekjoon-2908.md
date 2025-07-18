---
title: 상수 (2908)
date: 2023-02-19 15:10:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2908](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2908.png)

숫자를 뒤집은 후 큰 수를 찾아라.

## Bash

```bash
rev() {
	echo ${1: -1}${1:1:1}${1::1}
}

read n m
n=`rev $n`
m=`rev $m`
echo $((n < m ? m : n))
```

`rev` 명령어를 사용할 수 없으므로 직접 문자열을 뒤집어야 한다.

## Node.js

```javascript
const arr = require("fs").readFileSync(0).toString().trim().split(" ").map(x => x.split("").reverse().join("")*1);
console.log( Math.max(...arr) );
```

`JavaScript`는 배열만 뒤집을 수 있어서 문자열을 하나씩 잘라 배열로 만든 후 뒤집고 다시 합친 것이다.

## Python3

```python
arr = map(int, input()[::-1].split(" "))
print( max(arr) )
```

`Python3`에도 `reverse`, `reversed` 함수가 있지만 이는 배열에만 적용되고, 문자열은 `var[::-1]`로 뒤집을 수 있다.

## Ruby

```ruby
arr = gets.chomp.split().map {|i| i.reverse().to_i}
puts arr.max()
```
