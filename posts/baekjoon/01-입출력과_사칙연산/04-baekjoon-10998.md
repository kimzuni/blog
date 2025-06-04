---
title: AxB (10998)
date: 2023-01-27 11:57:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10998](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10998.png)

간단한 곱셈.
[이전 문제](/posts/baekjoon-1001/)에서 부호만 바꾸면 된다.

## Bash

```bash
read a b
echo $((a * b))
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d %d", &a, &b);
	printf("%d", a*b);
	return 0;
}
```

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log(a * b);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	echo $a * $b;
?>
```

## Python3

```python
a, b = map(int, input().split())
print(a*b)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
puts a*b
```
