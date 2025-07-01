---
title: 사칙연산 (10869)
date: 2023-01-27 12:16:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10869](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10869.png)

이 문제의 나누기는 몫을 출력하는 것이기 때문에 모두 정수 타입으로 계산하면 된다.

## Bash

```bash
read a b
echo $((a + b))
echo $((a - b))
echo $((a * b))
echo $((a / b))
echo $((a % b))
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d %d", &a, &b);
	printf("%d\n", a + b);
	printf("%d\n", a - b);
	printf("%d\n", a * b);
	printf("%d\n", a / b);
	printf("%d\n", a % b);
	return 0;
}
```

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(Math.floor(a/b));
console.log(a%b);
```

`Math.floor` 대신 `parseInt`를 사용해도 된다.

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	echo $a + $b."\n";
	echo $a - $b."\n";
	echo $a * $b."\n";
	echo floor($a / $b)."\n";
	echo $a % $b."\n";
?>
```

`PHP`의 `echo`는 자동 줄바꿈이 되지 않는다.
`PHP`는 분자열을 이어붙일 때 `+`가 아닌 `.`을 사용한다.

## Python3

```python
a, b = map(int, input().split())
print(a+b)
print(a-b)
print(a*b)
print(a//b)
print(a%b)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
puts a+b
puts a-b
puts a*b
puts a/b
puts a%b
```
