---
title: 구구단 (2739)
date: 2023-01-29 11:27:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2739](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2739.png)

간단한 구구단

## Bash

```bash
read n
for i in {1..9}; do
	echo $n \* $i = $((n * i))
done
```

## C

```c
#include <stdio.h>

int main(void) {
	int n;
	scanf("%d", &n);
	for (int i=1; i<=9; i++) {
		printf("%d * %d = %d\n", n, i, n*i);
	}

	return 0;
}
```

## Node.js

```javascript
let n = Number(require("fs").readFileSync(0).toString().trim());
for (let i=1; i<=9; i++) {
	console.log(`${n} * ${i} = ${n*i}`);
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=1; $i<=9; $i++) {
		echo "$n * $i = ".$n*$i."\n";
	}
?>
```

## Python3

```python
n = int(input())
for i in range(1, 10):
    print("{} * {} = {}".format(n, i, n*i))
```

## Ruby

```ruby
n = gets.chomp.to_i
for i in 1..9
  puts "#{n} * #{i} = #{n*i}"
end
```
