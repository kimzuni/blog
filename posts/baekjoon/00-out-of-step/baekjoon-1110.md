---
title: 더하기 사이클 (1110)
date: 2023-01-29 20:52:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

> [!NOTE]
> [반복문](/series/baekjoon/반복문/)의 12번 문제였으나 제외되었다.

![Baekjoon No.1110 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1110-1.png)
![Baekjoon No.1110 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1110-2.png)

반복문을 몇 번 돌았는지 묻는 문제.

## Bash

```bash
read n
m=$n
i=1
while :; do
	a=$((m%10))
	b=$((m/10 + a))
	m=$((a*10 + b%10))
	if [ $m == $n ]; then
		break
	fi
	((i++))
done
echo $i
```

## C

```c
#include <stdio.h>

int main(void) {
	int n;
	scanf("%d", &n);

	int m = n, i = 0;
	do {
		int a = m%10;
		int b = m/10 + a;
		m = a*10 + b%10;
		i++;
	} while (n != m);
	printf("%d\n", i);

	return 0;
}
```

## Node.js

```javascript
let n = Number(require("fs").readFileSync(0).toString().trim());
let m = n;
let i = 0;
do {
	let a = m%10;
	let b = Math.floor(m/10) + a;
	m = a*10 + b%10;
	i++;
} while (m != n);
console.log(i);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	$m = $n;
	$i = 0;
	do {
		$a = $m%10;
		$b = floor($m/10) + $a;
		$m = $a*10 + $b%10;
		$i++;
	} while ($n != $m);
	echo $i;
?>
```

## Python3

```python
n = int(input())
m, i = n, 1
while 1:
    a = m%10
    b = m//10 + a
    m = a*10 + b%10
    if n==m: break
    i += 1
print(i)
```

## Ruby

```ruby
n = gets.chomp.to_i
m, i = n, 0
loop do
  a = m%10
  b = m/10 + a
  m = a*10 + b%10
  i+=1
  break if n == m
end
puts i
```
