---
title: 윤년 (2753)
date: 2023-01-27 19:49:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2753](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2753.png)

`if`와 `else`만 필요한 조건문은 대신 삼항 연산자를 사용하는 게 최고..

## Bash

```bash
read a
test $((a%4)) == 0 -a $((a%100)) != 0 -o $((a%400)) == 0 && o=1 || o=0
echo $o
```

`$((...))`와 같은 연산식 밖에서는 삼항 연산자가 별도로 존재하지 않지만 비슷하게 구현할 수 있다.

## C

```c
#include <stdio.h>

int main(void) {
	int a;
	scanf("%d", &a);
	printf("%d\n", a%4 == 0 && a%100 != 0 || a%400 == 0 ? 1 : 0);
	return 0;
}
```

## Node.js

```javascript
let a = Number(require("fs").readFileSync(0).toString().trim());
let o = a%4 == 0 && a%100 != 0 || a%400 == 0 ? 1 : 0;
console.log(o);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $a);
	$o = $a%4 == 0 && $a%100 != 0 || $a%400 == 0 ? 1 : 0;
	echo $o;
?>
```

## Python3

```python
a = int(input())
o = 1 if a%4 == 0 and a%100 != 0 or a%400 == 0 else 0
print(o)
```

## Ruby

```ruby
a = gets.chomp.to_i
o = (a%4 == 0 and a%100 != 0 or a%400 == 0) ? 1 : 0
puts o
```

괄호가 없으면 첫 조건문(`a%4 == 0`)의 결과안 `true/false`를 리턴한다.
