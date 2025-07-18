---
title: 최댓값 (2562)
date: 2023-01-31 22:13:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2562](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2562.png)

최댓값은 어디에 있을까?

## Bash

```bash
arr=(0 0)
for i in {1..9}; do
	read n
	if [ ${arr[0]} -lt $n ]; then
		arr[0]=$n
		arr[1]=$i
	fi
done
echo $arr
echo ${arr[1]}
```

`Bash`는 배열에서 인덱스를 지정하지 않으면 첫 번째 원소가 사용된다.

## C

```c
#include <stdio.h>

int main(void) {
	int n;
	int arr[2] = {0, 0};
	for (int i=0; i<9; i++) {
		scanf("%d", &n);
		if (arr[0] < n) {
			arr[0] = n;
			arr[1] = i+1;
		}
	}
	printf("%d %d\n", arr[0], arr[1]);

	return 0;
}
```

## Node.js

```javascript
let [...arr] = require("fs").readFileSync(0).toString().trim().split("\n").map(Number);
let max = Math.max(...arr);
console.log( max, arr.indexOf(max)+1 );
```

## PHP

```php
<?php
	$arr = [];
	for ($i=0; $i<9; $i++) {
		fscanf(STDIN, "%d", $n);
		array_push($arr, $n);
	}
	$max = max($arr);
	echo $max."\n";
	echo array_search($max, $arr)+1;
?>
```

## Python3

```python
arr = []
for i in range(9): arr.append(int(input()))
m = max(arr)
print(m, arr.index(m)+1)
```

## Ruby

```ruby
arr = []
for i in 0...9
  arr[i] = gets.chomp.to_i
end
max = arr.max()
puts "#{max} #{(arr.index max) + 1}"
```
