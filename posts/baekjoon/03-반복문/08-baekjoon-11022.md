---
title: A+B - 8 (11022)
date: 2023-01-29 18:00:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.11022](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11022.png)

[이전 문제](/posts/baekjoon-11021/)에서 출력 형식만 바꾸면 된다.

## Bash

```bash
read n
for ((i=0; i<n; i++)); do
	read a b
	echo Case \#$i: $a + $b = $((a + b))
done
```

## C

```c
#include <stdio.h>

int main(void) {
	int n, a, b;
	scanf("%d", &n);
	for (int i=0; i<n; i++) {
		scanf("%d %d", &a, &b);
		printf("Case #%d: %d + %d = %d\n", i+1, a, b, a+b);
	}
	return 0;
}
```

## Node.js

```javascript
let [n, ...list] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let i in list) {
	let [a, b] = list[i].split(" ").map(Number);
	console.log(`Case #${i*1+1}: ${a} + ${b} = ${a+b}`);
}
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=1; $i<=$n; $i++) {
		fscanf(STDIN, "%d %d", $a, $b);
		echo "Case #$i: $a + $b = ".$a + $b."\n";
	}
?>
```

## Python3

```python
n = int(input())
for i in range(n):
    a, b = map(int, input().split())
    print("Case #{}: {} + {} = {}".format(i+1, a, b, a+b))
```

## Ruby

```ruby
n = gets.chomp.to_i
for i in 1..n
  a, b = gets.chomp.split(" ").map {|i| i.to_i}
  puts "Case ##{i}: #{a} + #{b} = #{a+b}"
end
```
