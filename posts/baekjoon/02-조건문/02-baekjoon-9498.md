---
title: 시험 성적 (9498)
date: 2023-01-27 19:37:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.9498](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-9498.png)

[이전 문제](/posts/baekjoon-1330/)에서 조건만 많아진 if문

## Bash

```bash
read a
o="F"
if [ 90 -le $a ]; then o="A"
elif [ 80 -le $a ]; then o="B"
elif [ 70 -le $a ]; then o="C"
elif [ 60 -le $a ]; then o="D"
fi
echo $o
```

## C

```c
#include <stdio.h>

int main(void) {
	int a;
	scanf("%d", &a);

	if (90 <= a) { printf("A\n"); }
	else if (80 <= a) { printf("B\n"); }
	else if (70 <= a) { printf("C\n"); }
	else if (60 <= a) { printf("D\n"); }
	else { printf("F\n"); }

	return 0;
}
```

## Node.js

```javascript
let a = Number(require("fs").readFileSync(0).toString().trim());
let o = "F";
if (90 <= a) { o = "A"; }
else if (80 <= a) { o = "B"; }
else if (70 <= a) { o = "C"; }
else if (60 <= a) { o = "D"; }
console.log(o);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $a);
	$o = "F";
	if (90 <= $a) { $o = "A"; }
	else if (80 <= $a) { $o = "B"; }
	else if (70 <= $a) { $o = "C"; }
	else if (60 <= $a) { $o = "D"; }
	echo $o;
?>
```

## Python3

```python
a = int(input())
o = "F"
if 90<=a: o = "A"
elif 80<=a: o = "B"
elif 70<=a: o = "C"
elif 60<=a: o = "D"
print(o)
```

## Ruby

```ruby
a = gets.chomp.to_i
o = "F"
if 90<=a; o = "A"
elsif 80<=a; o = "B"
elsif 70<=a; o = "C"
elsif 60<=a; o = "D"
end
puts o
```
