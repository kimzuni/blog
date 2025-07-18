---
title: 빠른 A+B (15552)
date: 2023-01-29 15:47:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.15552 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-15552.png)

입출력 시간을 줄여야 한다는데..

## Bash

```bash
read n
for ((i=0; i<n; i++)); do
	read a b
	echo $((a + b))
done
```

...는 시간 초과.
무슨 방법을 써도 다 시간 초과다.

## C

```c
#include <stdio.h>

int main(void) {
	int n, a, b;
	scanf("%d", &n);
	while (0 < n) {
		scanf("%d %d", &a, &b);
		printf("%d\n", a+b);
		n--;
	}
	return 0;
}
```

C언어는 원래 빠르다..

## Node.js

```javascript
let [n, ...list] = require("fs").readFileSync(0).toString().trim().split("\n");
let o = [];
for (let l of list) {
	let [a, b] = l.split(" ").map(Number);
	o.push(a+b);
}
console.log(o.join("\n"));
```

반복문 안에서 하나씩 로그를 찍으면 시간 초과가 뜨기 때문에 마지막에 한 번에 출력하면 된다.

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	$arr = [];
	for ($i=0; $i<$n; $i++) {
		fscanf(STDIN, "%d %d", $a, $b);
		array_push($arr, $a + $b);
	}
	echo join("\n", $arr);
?>
```

`Node.js`와 마찬가지.

## Python3

```python
import sys

n = int(sys.stdin.readline().strip())
for i in range(n):
    ab = map(int, sys.stdin.readline().strip().split())
    print(sum(ab))
```

문제에 적힌 방법대로 `input()` 대신 `sys.stdin.readline()`을 사용하면 된다.

## Ruby

```ruby
n = gets.chomp.to_i
for m in 0...n
  a, b = gets.chomp.split().map {|i| i.to_i}
  puts a+b
end
```

의외로 `Ruby`가 그냥 된다..?
