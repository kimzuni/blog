---
title: 평균은 넘겠지 (4344)
date: 2023-02-02 22:28:00 +0900
last_modified_at: false
tags: ["C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.4344](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-4344.png)

이건 출제자가 너무했다..

## Bash

```bash
read c
for ((i=0; i<c; i++)); do
	read arr
	n=${arr::1}
	arr=(${arr#* })

	sum=0
	for g in ${arr[@]}; do
		sum=$((sum + g))
	done
	avg=$((sum*10 / n))

	cnt=0
	for g in ${arr[@]}; do
		if [ $avg -lt $((g * 10)) ]; then
			cnt=$((cnt + 1))
		fi
	done
	p=$((cnt*1000000 / n))
	e=${p:${#p}-1}
	p=${p%$e*}
	p=$((5 <= e ? p+1 : p))

	n=${p:: -3}
	echo $n1.${p#$n}%
done
```

정답과 똑같이 나오는데 백준에서는 런타임 에러가 든다.

## C

```c
#include <stdio.h>

int main(void) {
	int c, n, cnt;
	float sum, avg;

	scanf("%d", &c);

	for (int i=0; i<c; i++) {
		scanf("%d", &n);

		int arr[n];
		for (int j=0; j<n; j++) {
			scanf("%d", &arr[j]);
		}

		sum = 0;
		for (int j=0; j<n; j++) {
			sum += arr[j];
		}
		avg = sum / n;

		cnt = 0;
		for (int j=0; j<n; j++) {
			cnt += avg < arr[j] ? 1 : 0;
		}

		printf("%.3f%%\n", (double)cnt/n*100);
	}

	return 0;
}
```

## Node.js

```javascript
let [c, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let arr of input) {
	[n, ...arr] = arr.split(" ").map(Number);
	let avg = arr.reduce((r, x, i) => { return r + x }) / n;

	cnt = 0;
	for (let g of arr) {
		if (avg < g) cnt++
	}
	p = Math.round(cnt/n*100*1000) / 1000;

	console.log(`${p.toFixed(3)}%`);
}
```

`JavaScript`의 `round()`는 소수점 지정이 안되기 때문에 1000을 곱하고 다시 나눈다.

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=0; $i<$n; $i++) {
		$arr = explode(" ", trim(fgets(STDIN)));
		$m = $arr[0];
		$arr = array_slice($arr, 1);
		$avg = array_sum($arr)/$m;

		$cnt = 0;
		foreach ($arr as $x) {
			if ($avg < $x) { $cnt++; }
		}
		echo sprintf("%.3f", ($cnt/$m*100))."%\n";
	}
?>
```

## Python3

```python
c = int(input())
for i in range(c):
    arr = list(map(int, input().split()))
    n, arr = arr[0], arr[1:]
    avg = sum(arr)/n

    cnt = 0
    for g in arr:
        if avg < g: cnt += 1
    p = "{:.3f}%".format(cnt/n*100)
    print(p)
```

## Ruby

```ruby
c = gets.chomp.to_i
for i in 0...c
  arr = gets.chomp.split().map {|i| i.to_i}
  n, arr = arr[0].to_f, arr.slice(1, arr.size-1)
  avg = arr.sum()/n

  cnt = 0
  for g in arr
    cnt += 1 if avg < g
  end
  p = "%.3f" % (cnt/n*100) + "%"
  puts p
end
```
