---
title: 아스키 코드 (11654)
date: 2023-02-16 16:37:00 +0900
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.11654 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11654-1.png)
![Baekjoon No.11654 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-11654-2.png)

문자를 숫자형으로 출력하면 아스키 코드가 나오기도 한다.

## Bash

```bash
read str
printf '%d\n' "'$str"
```

`$str` 앞의 따옴표는 뒤에 오는 문자를 아스키 코드로 출력하기 위해 넣어줘야 한다.

## C

```c
#include <stdio.h>

int main(void) {
	char str;
	scanf("%c", &str);
	printf("%d\n", str);

	return 0;
}
```

## Node.js

```javascript
let str = require("fs").readFileSync(0).toString().trim();
console.log( str.charCodeAt(0) );
```

## PHP

```php
<?php
	fscanf(STDIN, "%c", $x);
	echo ord($x);
?>
```

## Python3

```python
print(ord(input()))
```

## Ruby

```ruby
puts gets.chomp.ord
```
