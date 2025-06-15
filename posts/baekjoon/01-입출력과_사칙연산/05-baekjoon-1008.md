---
title: A/B (1008)
date: 2023-01-27 12:02:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1008](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1008.png)

몫이 아닌 전체 값을 출력해야 하기 때문에 데이터 타입에 주의해야 한다.

## Bash

```bash
read a b
let a*=10**10
let r=a/b
n=0
if [ ${#r} -gt 10 ]; then
	n=${r::1}
	r=${r:1}
fi
echo $n.$r
```

`Bash`는 연산 시 소수부를 모두 버리기 때문에 오차 범위만큼 곱한 후 계산하고 점은 직접 넣어야 한다.

`let r=a/b` 대신 `((r = a/b))`를 사용할 수 있다.
2, 3번 라인을 `((a *= 10**10, r = a/b))` 이 한 줄로 줄일 수 있다.
백준에서는 먹히지 않는 `awk`, `bc` 명령어를 사용하면 소수부까지 출력할 수 있다.

## C

```c
#include <stdio.h>

int main(void) {
	double a, b;
	scanf("%lf %lf", &a, &b);
	printf("%.9lf", a / b);
	return 0;
}
```

`int`, `float` 타입이 아닌 `double`을 사용해야 한다.

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log(a / b);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	echo $a / $b;
?>
```

## Python3

```python
a, b = map(int, input().split())
print(a/b)
```

`Python2`와 달리 `Python3`은 정수끼리 나눠도 소수부까지 연산이 가능하다.

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_f}
puts a/b
```

정수형인 `to_i`가 아니라 실수형인 `to_f`다.
