---
title: A+B - 3 (10950)
date: 2023-01-29 12:05:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10950](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10950.png)

한 번에 출력하지 않아도 된다.

## Bash

```bash
read t
#for i in $(seq $t); do
for ((i=0; i<t; i++)); do
	read a b
	echo $((a + b))
done
```

`seq` 명령어도 먹히지 않는다...

## C

```c
#include <stdio.h>

int main(void) {
	int t, a, b;
	scanf("%d", &t);
	for (int i=0; i<t; i++) {
		scanf("%d %d", &a, &b);
		printf("%d\n", a+b);
	}
	return 0;
}
```

## Node.js

```javascript
let [t, ...list] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let i of list) {
	let [a, b] = i.split(" ").map(Number);
	console.log(a + b);
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=0; $i<$n; $i++) {
		fscanf(STDIN, "%d %d", $a, $b);
		echo $a + $b."\n";
	}
?>
```

## Python3

```python
t = int(input())
for i in range(t):
    a, b = map(int, input().split())
    print(a+b)
```

## Ruby

```ruby
t = gets.chomp.to_i
for i in 0...t
  a, b = gets.chomp.split(" ").map {|i| i.to_i}
  puts a+b
end
```
