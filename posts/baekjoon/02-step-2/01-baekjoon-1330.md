---
title: 두 수 비교하기 (1330)
date: 2023-01-27 18:24:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1330](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1330.png)

간단한 if문

## Bash

```bash
read a b
o="=="
if [ $a -lt $b ]; then
	o="<"
elif [ $a -gt $b ]; then
	o=">"
fi
echo $o
```

`[ 조건문 ]`은 `test 조건문` 명령어의 다른 표현 방식이며, 더 자주 사용된다.
`test` 명령어는 뒤에 오는 조건문이 참이면 0, 거짓이면 1을 리턴값으로 반환한다.
`Bash`에서는 리턴값을 따로 출력하지 않으며 `echo $?` 명령어로 확인할 수 있다.

`-lt`는 <, `-gt`는 > 대신 사용된다.
`<`, `>`를 사용하려면 `[ "0" < "$var" ]`처럼 조건문에 사용되는 값을 따옴표로 감싸줘야 한다.

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d %d", &a, &b);
	printf("%s\n", a<b ? "<" : a>b ? ">" : "==");
	return 0;
}
```

중첩 삼항 연산자.

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
let o = "==";
if (a < b) {
	o = "<";
} else if (a > b) {
	o = ">";
}
console.log(o);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	$o = "==";
	if ($a < $b) { $o = "<"; }
	else if ($a > $b) { $o = ">"; }
	echo $o;
?>
```

## Python3

```python
a, b = map(int, input().split())
o = "=="
if a<b:
    o = "<"
elif a>b:
    o = ">"
print(o)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
o = "=="
if a<b
  o = "<"
elsif a>b
  o = ">"
end
puts o
```
