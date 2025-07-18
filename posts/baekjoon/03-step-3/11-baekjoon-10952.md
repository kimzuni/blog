---
title: A + B - 5 (10952)
date: 2023-01-29 19:49:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10952](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10952.png)

입력한 값이 `0 0`이면 반복문을 빠져나온다.

## Bash

```bash
while :; do
	read a b
	if [ "$a$b" == "00" ]; then
		break
	fi
	echo $((a + b))
done
```

`while :` == `while true` == 무한루프

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	while (1) {
		scanf("%d %d", &a, &b);
		if (a == 0 && b == 0) { break; }
		printf("%d\n", a+b);
	}
	return 0;
}
```

## Node.js

```javascript
let list = require("fs").readFileSync(0).toString().trim().split("\n");
for (let l of list.slice(0,-1)) {
	let [a, b] = l.split(" ").map(Number);
	console.log(a+b);
}
```

## PHP

```php
<?php
	while (1) {
		fscanf(STDIN, "%d %d", $a, $b);
		if ($a == 0 && $b == 0) { break; }
		echo $a + $b."\n";
	}
?>
```

## Python3

```python
while 1:
    a, b = map(int, input().split())
    if a==0 and b==0: break
    print(a+b)
```

## Ruby

```ruby
while 1
  a, b = gets.chomp.split().map {|i| i.to_i}
  break if a==0 and b==0
  puts a+b
end
```
