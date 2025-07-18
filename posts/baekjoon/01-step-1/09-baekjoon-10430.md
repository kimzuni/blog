---
title: 나머지 (10430)
date: 2023-01-27 14:08:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10430](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10430.png)

그냥 입력값 받고 주어진 대로 연산만 하면 되는 문제.

## Bash

```bash
read a b c
echo $(((a + b) % c))
echo $((((a % c) + (b % c)) % c))
echo $(((a * b) % c))
echo $((((a % c) * (b % c)) % c))
```

## C

```c
#include <stdio.h>

int main(void) {
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);
	printf("%d\n", (a+b)%c);
	printf("%d\n", ((a%c)+(b%c))%c);
	printf("%d\n", (a*b)%c);
	printf("%d\n", ((a%c)*(b%c))%c);
	return 0;
}
```

## Node.js

```javascript
let [a, b, c] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log((a+b)%c);
console.log(((a%c)+(b%c))%c);
console.log((a*b)%c);
console.log(((a%c)*(b%c))%c);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d %d %d", $a, $b, $c);
	echo ($a+$b)%$c."\n";
	echo (($a%$c) + ($b%$c))%$c."\n";
	echo ($a*$b)%$c."\n";
	echo (($a%$c) * ($b%$c))%$c."\n";
?>
```

## Python3

```python
a, b, c = map(int, input().split())
print( (a+b)%c )
print( ((a%c)+(b%c))%c )
print( (a*b)%c )
print( ((a%c)*(b%c))%c )
```

## Ruby

```ruby
a, b, c = gets.chomp.split().map {|i| i.to_i}
puts (a+b)%c
puts ((a%c) + (b%c))
puts (a*b)%c
puts ((a%c) * (b%c))
```
