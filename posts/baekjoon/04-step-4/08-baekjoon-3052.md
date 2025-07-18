---
title: 나머지 (3052)
date: 2023-02-01 21:30:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.3052 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-3052-1.png)
![Baekjoon No.3052 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-3052-2.png)

42로 나눴을 때 나올 수 있는 나머지의 수

## Bash

```bash
arr=()
for i in {1..10}; do
	read n
	n=$((n % 42))
	if ! [[ " ${arr[@]} " =~ " $n " ]]; then
		arr+=($n)
	fi
done
echo ${#arr[@]}
```

`arr+=($n)` == 배열 마지막에 원소 추가

## C

```c
#include <stdio.h>

int main(void) {
	int arr[42] = {0,};

	int n;
	for (int i=0; i<10; i++) {
		scanf("%d", &n);
		arr[n%42]++;
	}

	n = 0;
	for (int i=0; i<42; i++) {
		if (arr[i] != 0) {
			n++;
		}
	}
	printf("%d\n", n);

	return 0;
}
```

## Node.js

```javascript
let arr = require("fs").readFileSync(0).toString().trim().split("\n").map(x => Number(x) % 42);
arr = [...new Set(arr)];
console.log( arr.length );
```

중복 값 제거

## PHP

```php
<?php
	$arr = [];
	for ($i=0; $i<10; $i++) {
		fscanf(STDIN, "%d", $n);
		$v = $n % 42;
		if (array_search($v, $arr) == "") {
			array_push($arr, $v);
		}
	}
	echo count($arr);
?>
```

## Python3

```python
arr = []
for i in range(10):
    n = int(input()) % 42
    if n not in arr:
        arr.append(n)
print(len(arr))
```

## Ruby

```ruby
arr = []
for i in 1..10
  n = gets.chomp.to_i % 42
  if not arr.include?(n)
    arr.push(n)
  end
end
puts arr.size
```
