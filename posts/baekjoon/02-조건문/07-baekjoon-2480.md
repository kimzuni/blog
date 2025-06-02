---
title: 주세위 세개 (2480)
date: 2023-01-27 21:48:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.2480](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2480.png)

불법 도박 신고는 [1855-0112](tel:18550112)..

## Bash

```bash
read a b c
if [ $a == $b -a $b == $c ]; then
	coin=$((10000 + a*1000))
elif [ $a == $b -o $b == $c -o $a == $c ]; then
	d=$((b == c ? b : a))
	coin=$((1000 + d*100))
else
	d=$((a < b ? b : a))
	d=$((d < c ? c : d))
	coin=$((d * 100))
fi
echo $coin
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);

	if ( a == b && b == c ) {
		printf("%d", 10000+a*1000);
	} else if ( a == b || b == c || a == c ) {
		printf("%d", 1000 + (b == c ? b : a)*100);
	} else {
		a = a < b ? b : a;
		a = a < c ? c : a;
		printf("%d", a*100);
	}

	return 0;
}
```

## Node.js

```javascript
let [a, b, c] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
let coin;
if (a == b && b == c) {
	coin = 10000 + a*1000;
} else if (a == b || b == c || a == c) {
	coin = 1000 + (b == c ? b : a)*100;
} else {
	coin = Math.max(a, b, c)*100;
}
console.log(coin);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d %d", $a, $b, $c);
	if ($a == $b && $b == $c) {
		$coin = 10000 + $a*1000;
	} else if ($a == $b || $b == $c || $a == $c ) {
		$coin = 1000 + ($b == $c ? $b : $a)*100;
	} else {
		$coin = max($a, $b, $c)*100;
	}
	echo $coin;
?>
```

## Python3

```python
a, b, c = map(int, input().split())
if a==b and b==c:
    coin = 10000 + a*1000
elif a==b or b==c or a==c:
    coin = 1000 + (b if b==c else a)*100
else:
    coin = max(a, b, c)*100
print(coin)
```

## Ruby

```ruby
a, b, c = gets.chomp.split().map { |i| i.to_i }
if a==b and b==c
  coin = 10000 + a*1000
elsif a==b or b==c or a==c
  coin = 1000 + (b==c ? b : a)*100
else
  coin = [a, b, c].max()*100
end
puts coin
```
