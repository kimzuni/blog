---
title: 합 (8393)
date: 2023-01-29 13:28:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.8393](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-8393.png)

팩토리얼의 덧셈 버전..?

## Bash

```bash
read n
s=0
for ((i=1; i<=n; i++)); do
	((s += i))
done
echo $s
```

## C

```c
#include <stdio.h>

int main(void) {
	int n, s = 0;
	scanf("%d", &n);
	for (int i=1; i<=n; i++) {
		s+=i;
	}
	printf("%d\n", s);
	return 0;
}
```

## Node.js

```javascript
let n = Number(require("fs").readFileSync(0).toString().trim());
let s = 0;
while (0 < n) {
	s += n;
	n--;
}
console.log(s);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	echo array_sum(range(1, $n));
?>
```

## Python3

```python
n = int(input())
print( sum(range(n+1)) )
```

## Ruby

```ruby
n = gets.chomp.to_i
puts (1..n).sum()
```
