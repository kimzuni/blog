---
title: 별 찍기 - 2 (2439)
date: 2023-01-29 18:25:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.2439](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2439.png)

빈 공간은 출력하지 않는 게 아니라 공백 한 칸을 출력해야 한다.

## Bash

```bash
read n
for ((i=1; i<=n; i++)); do
	o=""
	for ((j=0; j<i; j++)); do
		o+=\*
	done
	printf "%${n}s\n" "$o"
done
```

`printf` 명령어를 사용하여 n 자리로 출력하며 문자는 오른쪽으로 정렬.
왼쪽 정렬은 `%-5s` 형식, 중앙 정렬은 없다.
다른 언어와 달리 자릿수를 지정할 때 변수를 사용할 수 있기 때문에 가능한 방법.

## C

```c
#include <stdio.h>

int main(void) {
	int n;
	scanf("%d", &n);
	for (int i=1; i<=n; i++) {
		for (int j=0; j<n-i; j++) {
			printf(" ");
		}
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
for (let i=1; i<=n; i++) {
	let o = [];
	for (let j=0; j<n; j++) {
		o.push(j < n-i ? " " : "*");
	}
	console.log(o.join(""));
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=1; $i<=$n; $i++) {
		$o = [];
		for ($j=0; $j<$n; $j++) {
			array_push($o, $j < $n-$i ? " " : "*");
		}
		echo join("", $o)."\n";
	}
?>
```

## Python3

```python
n = int(input())
for i in range(1, n+1):
    o = []
    for j in range(n):
        o.append(" " if j < n-i else "*")
    print("".join(o))
```

## Ruby

```ruby
n = gets.chomp.to_i
for i in 1..n
  o = []
  for j in 0...n
    o.push(j < n-i ? " " : "*")
  end
  puts o.join("")
end
```
