---
title: 1998년생인 내가 태국에서는 2541년생?! (18108)
date: 2023-01-27 13:15:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.18108](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-18108.png)

두 수의 차인 543을 빼면 된다.

## Bash

```bash
read year
echo $((year - 543))
```

## C

```c
#include <stdio.h>

int main(void) {
	int year;
	scanf("%d", &year);
	printf("%d\n", year-543);

	return 0;
}
```

## Node.js

```javascript
let year = Number(require("fs").readFileSync(0).toString().trim());
console.log(year - 543);
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $year);
	echo $year - 543;
?>
```

## Python3

```python
print(int(input()) - 543)
```

## Ruby

```ruby
puts gets.chomp.to_i - 543
```
