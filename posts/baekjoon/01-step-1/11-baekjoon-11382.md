---
title: 꼬마 정민 (11382)
date: 2023-02-22 18:21:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.11382](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11382.png)

[A+B](/posts/baekjoon-1000/) 문제에서 변수 하나만 더 사용하면 된다.

## Bash

```bash
read a b c
echo $((a + b + c))
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b, c;
	scanf("%d %d", &a, &b, &c);
	printf("%d", a+b+c);
	return 0;
}
```

## Node.js

```javascript
let [a, b, c] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log(a + b + c);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b, $c);
	echo $a + $b + $c;
?>
```

## Python3

```python
a, b, c = map(int, input().split())
print(a+b+c)
```

## Ruby

```ruby
a, b, c = gets.chomp.split().map {|i| i.to_i}
puts a+b+c
```
