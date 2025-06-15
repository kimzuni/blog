---
title: 별 찍기 - 1 (2438)
date: 2023-01-29 18:09:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2438](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2438.png)

이중 for문을 사용해야 한다.

## Bash

```bash
read n
for ((i=1; i<=n; i++)); do
	for ((j=0; j<i; j++)); do
		printf \*
	done
	echo
done
```

`Bash`에도 `printf` 명령어가 있다.
`echo` 명령어에 `-n` 옵션을 사용하면 출력 후 줄바꿈을 하지 않기 때문에 `printf` 대신 `echo -n`을 사용해도 된다.

## C

```c
#include <stdio.h>

int main(void) {
	int n;
	scanf("%d", &n);
	for (int i=1; i<=n; i++) {
		for (int j=0; j<i; j++) {
			printf("*");
		}
		printf("\n");
	}
	return 0;
}
```

## Node.js

```javascript
let n = Number(require("fs").readFileSync(0).toString().trim());
let o = "";
for (let i=1; i<=n; i++) {
	o = "";
	for (let j=0; j<i; j++) {
		o+="*";
	}
	console.log(o);
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=1; $i<=$n; $i++) {
		for ($j=0; $j<$i; $j++) {
			echo "*";
		}
		echo "\n";
	}
?>
```

## Python3

```python
n = int(input())
for i in range(n):
    print("*"*(i+1))
```

## Ruby

```ruby
n = gets.chomp.to_i
for i in 1..n
  puts "*"*i
end
```
