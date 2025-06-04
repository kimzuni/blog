---
title: 평균 (1546)
date: 2023-02-01 22:10:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.1546 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1546-1.png)

<Imgbox>

![Baekjoon No.1546 예제-1](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1546-2.png)
![Baekjoon No.1546 예제-2](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1546-3.png)

</Imgbox>

점수 조작은 나빠요..!

## Bash

```bash
read n
read -a arr

max=$arr
for ((i=1; i<n; i++)); do
	max=$((max < arr[i] ? arr[i] : max))
done

total=0
for ((i=0; i<n; i++)); do
	total=$((total + arr[$i]*100 * 100 / $max))
	arr[$i]=$((arr[$i]*100 * 100 / $max))
done

avg=$((total / n))
n=${avg:: -2}
echo $n.${avg#$n}
```

100을 한 번 더 곱한 이유는 `Bash`는 소수점 계산이 안되기 때문에.
같은 이유로 최댓값으로 나누기 전에 100을 먼저 곱해야 한다.

## C

```c
#include <stdio.h>

int main(void) {
	int n, m, max = 0;
	scanf("%d", &n);

	float arr[n], total = 0;
	for (int i=0; i<n; i++) {
		scanf("%d", &m);
		arr[i] = m;
		max = max < m ? m : max;
	}

	for (int i=0; i<n; i++) {
		total += arr[i] / max * 100;
	}

	printf("%f\n", total/n);

	return 0;
}
```

## Node.js

```javascript
let [n, ...arr] = require("fs").readFileSync(0).toString().trim().split(/ |\n/).map(Number);
let max = Math.max(...arr);
let total = arr.reduce((r, x, i) => { return r + x / max * 100; });
console.log(total / n);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	$arr = explode(" ", trim(fgets(STDIN)));
	$max = max($arr);

	for ($i=0; $i<$n; $i++) {
		$arr[$i] = $arr[$i] / $max * 100;
	}
	echo array_sum($arr)/$n;
?>
```

## Python3

```python
n = int(input())
arr = list(map(int, input().split()))
m = max(arr)

for i in range(n):
    arr[i] = arr[i] / m * 100

print( sum(arr)/n )
```

## Ruby

```ruby
n = gets.chomp.to_i
arr = gets.chomp.split().map {|i| i.to_f}
max = arr.max()
puts arr.map {|i| i / max * 100}.sum() / n
```

제일 짧은데 제일 오래 걸린다..
