---
title: 곱셈 (2588)
date: 2023-01-27 15:42:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.2558](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2588.png)

두 번째 수를 각 자리별로 잘라서 사용했다.

## Bash

```bash
read a
read b
b3=${b::1}
b2=${b:1:1}
b1=${b:2}
echo $((a * b1))
echo $((a * b2))
echo $((a * b3))
echo $((a * b))
```

`Bash`의 변수는 기본적으로 모두 문자열로 취급하며, 연산 시 알아서 숫자로 변환하는 특징을 가지고 있다.
필요시 `declare` 명령어로 자료형을 지정할 수도 있다.

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d", &a);
	scanf("%d", &b);

	int b1, b2, b3;
	b3 = b/100;
	b2 = (b-b3*100)/10;
	b1 = (b-b3*100)%10;

	printf("%d\n", a*b1);
	printf("%d\n", a*b2);
	printf("%d\n", a*b3);
	printf("%d\n", a*b);

	return 0;
}
```

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split("\n").map(Number);
let bs = (b+"").split("").map(Number);
console.log(a*bs[2]);
console.log(a*bs[1]);
console.log(a*bs[0]);
console.log(a*b);
```

`b+""` == `String(b)`

## PHP

```php
<?php
	fscanf(STDIN, "%d", $a);
	fscanf(STDIN, "%d", $b);

	$str = $b."";
	list ($b3, $b2, $b1) = [$str[0], $str[1], $str[2]];
	echo $a * $b1."\n";
	echo $a * $b2."\n";
	echo $a * $b3."\n";
	echo $a * $b."\n";
?>
```

`$b.""` == `strval($b)`

## Python3

```python
a = int(input())
b = int(input())
b3, b2, b1 = map(int, str(b))

print(a*b1)
print(a*b2)
print(a*b3)
print(a*b)
```

숫자 385를 문자열로 바꾼 후 `int`로 매핑하면 리스트 `[3, 8, 5]`로 바뀐다.

## Ruby

```ruby
a = gets.chomp.to_i
b = gets.chomp.to_i
b3, b2, b1 = b.to_s.split("").map {|i| i.to_i}

puts a*b1, a*b2, a*b3, a*b
```
