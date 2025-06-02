---
title: 알람 시계 (2884)
date: 2023-01-27 20:58:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.2884](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2884.png)

입력받은 시/분 중 분에 45분을 빼고 그 결과가 0보다 작으면 시간에 1을 빼고 분에 60을 더한다.
이때 if문을 사용하여 시간이 마이너스일 때 24를 더해줘야 하지만 if문을 사용하지 않고 해결할 수 있다.

## Bash

```bash
read a b
((b -= 45))
if [ $b -lt 0 ]; then
	a=$(((a-1+24)%24))
	((b+=60))
fi
echo $a $b
```

`Bash`에도 다른 언어들처럼 `+=` 연산자가 존재하긴 하지만, 덧셈이 아닌 문자열을 추가하기 위해 사용된다.
그러니까 `b=1`일 때 `b+=1`의 값은 `2`가 아닌 `11`이 된다.
그래서 `-=`, `*=`, `/=` 등과 같은 연산자는 존재하지 않는다.

단, `$((...))`, `let` 등 연산 명령어에서는 모두 사용할 수 있다.

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d %d", &a, &b);

	b -= 45;
	if ( b < 0 ) {
		a = (a-1+24)%24;
		b += 60;
	}
	printf("%d %d", a, b);

	return 0;
}
```

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
b -= 45;
if (b < 0) {
	a = (a-1+24)%24;
	b += 60;
}
console.log(`${a} ${b}`);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	$b -= 45;
	if ($b < 0) {
		$a = ($a-1+24)%24;
		$b += 60;
	}
	echo "$a $b";
?>
```

## Python3

```python
a, b = map(int, input().split())
b -= 45
if b < 0:
    a = (a-1+24)%24
    b += 60
print(a, b)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
b -= 45
if b < 0
  a = (a-1+24)%24
  b += 60
end
puts "#{a} #{b}"
```
