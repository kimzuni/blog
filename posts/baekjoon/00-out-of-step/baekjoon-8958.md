---
title: OX퀴즈 (8958)
date: 2023-02-02 21:30:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

> [!NOTE]
> [1차원 배열](/series/baekjoon/1차원-배열/)의 8번 문제였으나 제외되었다.

![Baekjoon No.8958](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-8958.png)

한 게임당 얻을 수 있는 최대 점수는?

## Bash

```bash
read n
for ((i=0; i<n; i++)); do
	read oxs
	g=0
	sum=0
	for ((j=0; j<${#oxs}; j++)); do
		[ "${oxs:$j:1}" == "O" ] && g=$((g + 1)) || g=0
		sum=$((sum + g))
	done
	echo $sum
done
```

## C

```c
#include <stdio.h>
#include <string.h>

int main(void) {
	int n, g, sum;
	scanf("%d", &n);

	for (int i=0; i<n; i++) {
		sum = 0;
		char input[n+1];
		scanf("%s", input);

		for (int j=0; j<strlen(input); j++) {
			g = input[j] == 'O' ? g + 1 : 0;
			sum += g;
		}

		printf("%d\n", sum);
	}

	return 0;
}
```

## Node.js

```javascript
let [n, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let oxs of input) {
	let g = 0;
	let sum = 0;
	for (let ox of oxs.split("")) {
		let g = ox == "O" ? g + 1 : 0
		sum += g;
	}
	console.log(sum);
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=0; $i<$n; $i++) {
		$g = 0;
		$sum = 0;

		$oxs = trim(fgets(STDIN));
		for ($j=0; $j<strlen($oxs); $j++) {
			$g = $oxs[$j] == "O" ? $g+1 : 0;
			$sum += $g;
		}
		echo $sum."\n";
	}
?>
```

## Python3

```python
n = int(input())
for i in range(n):
    oxs = input()
    arr = [0]
    for ox in oxs:
        g = arr[-1] + 1 if ox == "O" else 0
        arr.append(g)
    print(sum(arr))
```

## Ruby

```ruby
n = gets.chomp.to_i
for i in 0...n
  oxs = gets.chomp.split("")
  arr = [0]
  for ox in oxs
    g = ox == "O" ? arr[-1] + 1 : 0
    arr.push(g)
  end
  puts arr.sum()
end
```
