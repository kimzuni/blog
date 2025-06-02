---
title: 사분면 고르기 (14681)
date: 2023-01-27 20:00:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.14681](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-14681.png)

if문과 삼항 연산자.

## Bash

```bash
read x
read y
if [ 0 -lt $x ]; then
	o=$((0 < y ? 1 : 4))
else
	o=$((0 < y ? 2 : 3))
fi
echo $o
```

## C

```c
int main(void) {
	int x, y;
	scanf("%d %d", &x, &y);

	if (0 < x) {
		printf("%d\n", 0<y ? 1 : 4);
	} else {
		printf("%d\n", 0<y ? 2 : 3);
	}

	return 0;
}
```

## Node.js

```javascript
const [x, y] = require("fs").readFileSync(0).toString().trim().split("\n").map(Number);
let o;
if (0 < x) {
	o = 0 < y ? 1 : 4;
} else {
	o = 0 < y ? 2 : 3;
}
console.log(o);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $x);
	fscanf(STDIN, "%d", $y);
	if (0 < $x) {
		$o = 0 < $y ? 1 : 4;
	} else {
		$o = 0 < $y ? 2 : 3;
	}
	echo $o;
?>
```

## Python3

```python
x = int(input())
y = int(input())
if 0<x:
    o = 1 if 0<y else 4
else:
    o = 2 if 0<y else 3
print(o)
```

## Ruby

```ruby
x = gets.chomp.to_i
y = gets.chomp.to_i
if 0<x
  o = 0<y ? 1 : 4
else
  o = 0<y ? 2 : 3
end
puts o
```
