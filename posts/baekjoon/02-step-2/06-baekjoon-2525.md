---
title: 오븐 시계 (2525)
date: 2023-01-27 21:35:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2525](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2525.png)

조건문 문제를 조건문 없이 풀 수 있다..?

## Bash

```bash
read a b
read c
((b += c))
((a += b/60))
((a %= 24))
((b %= 60))
echo $a $b
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b, c;
	scanf("%d %d", &a, &b);
	scanf("%d", &c);

	b += c;
	a += b/60;
	a = a%24;
	b = b%60;
	printf("%d %d", a, b);

	return 0;
}
```

## Node.js

```javascript
let [a, b, c] = require("fs").readFileSync(0).toString().trim().split(/ |\n/).map(Number);
b += c;
a += Math.floor(b/60);
a = a%24;
b = b%60;
console.log(a, b);
```

`Number`, `Math.floor` 대신 `parseInt`를 사용해도 된다.

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	fscanf(STDIN, "%d", $c);
	$b += $c;
	$a += floor($b/60);
	$a = $a%24;
	$b = $b%60;
	echo "$a $b";
?>
```

## Python3

```python
a, b = map(int, input().split())
c = int(input())
b += c
a += b//60
a = a%24
b = b%60
print(a, b)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
c = gets.chomp.to_i
b += c
a += b/60
a = a%24
b = b%60
puts "#{a} #{b}"
```
