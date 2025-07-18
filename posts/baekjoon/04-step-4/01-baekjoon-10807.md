---
title: 개수 세기 (10807)
date: 2023-01-30 21:16:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10807](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10807.png)

배열 안에 n은 몇 개?

## Bash

```bash
read n
read arr
read v

cnt=0
for x in $arr; do
	((cnt += x == v ? 1 : 0))
done
echo $cnt
```

배열을 사용하지 않았..다.

## C

```c
#include <stdio.h>

int main(void) {
	int n, v;
	int arr[n];
	scanf("%d", &n);
	for (int i=0; i<n; i++) {
		scanf("%d", &arr[i]);
	}
	scanf("%d", &v);

	int cnt = 0;
	for (int i=0; i<n; i++) {
		if (arr[i] == v) {
			cnt++;
		}
	}
	printf("%d\n", cnt);

	return 0;
}
```

## Node.js

```javascript
let [n, ...arr] = require("fs").readFileSync(0).toString().trim().split(/ |\n/).map(Number);
let v = arr.pop();
console.log( arr.filter(x => x == v).length );
```

`filter`를 사용하여 배열 `arr`에 `v`와 같은 값만 남기는 방식이다.

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	$arr = explode(" ", trim(fgets(STDIN)));
	fscanf(STDIN, "%d", $v);

	$cnt = 0;
	foreach ($arr as $x) {
		if ($x == $v) { $cnt++; }
	}
	echo $cnt;
?>
```

## Python3

```python
n = int(input())
arr = list(map(int, input().split()))
v = int(input())
print( arr.count(v) )
```

## Ruby

```ruby
n = gets.chomp.to_i
arr = gets.chomp.split().map {|i| i.to_i}
v = gets.chomp.to_i
puts arr.count(v)
```
