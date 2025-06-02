---
title: X보다 작은 수 (10871)
date: 2023-01-30 21:56:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10871](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10871.png)

"보다 작은"은 주어진 수를 포함하지 않는다.

## Bash

```bash
read n x
read arr

for i in $arr; do
	if [ $i -lt $x ]; then
		echo -n $i" "
	fi
done
```

## C

```c
#include <stdio.h>

int main(void) {
	int n, x;
	scanf("%d %d", &n, &x);
	int arr[n];
	for (int i=0; i<n; i++) {
		scanf("%d", &arr[i]);
	}

	for (int i=0; i<n; i++) {
		if (arr[i] < x) {
			printf("%d ", arr[i]);
		}
	}

	return 0;
}
```

## Node.js

```javascript
let [n, x, ...arr] = require("fs").readFileSync(0).toString().trim().split(/ |\n/).map(Number);
console.log( arr.filter(i => i < x).join(" ") );
```

## PHP

```php
<?php
	list ($n, $x) = explode(" ", trim(fgets(STDIN)));
	$arr = explode(" ", trim(fgets(STDIN)));

	$cnt = 0;
	foreach ($arr as $a) {
		if ($a < $x) { echo "$a "; }
	}
?>
```

## Python3

```python
n, x = map(int, input().split())
arr = map(int, input().split())
arr = list(filter(lambda i: i < x, arr))
print( " ".join(map(str, arr)) )
```

Python은 `lambda`를 지원한다.

## Ruby

```ruby
n, x = gets.chomp.split().map {|i| i.to_i}
arr = gets.chomp.split().map {|i| i.to_i}
puts arr.select {|i| i < x}.join(" ")
```
