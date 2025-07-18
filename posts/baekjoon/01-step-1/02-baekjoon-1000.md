---
title: A+B (1000)
date: 2023-01-27 10:50:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1000](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1000.png)

간단한 덧셈. 입력받고 출력하는 방법만 알면 풀 수 있다.

## Bash

```bash
read a b
# expr $a + $b
# echo $[a + b]
echo $((a + b))
```

`expr`, `awk`, `bc` 명령어가 먹히지 않는다.
3, 4번 라인 둘 다 정답이다.

## C

```c
#include <stdio.h>

int main(void) {
	int a, b;
	scanf("%d %d", &a, &b);
	printf("%d", a+b);
	return 0;
}
```

## Node.js

```javascript
let [a, b] = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
console.log(a + b);
```

입력을 받기 위해 `readFileSync(0)`를 사용하는데, 대신 `readFileSync("/dev/stdin")`를 사용해도 된다.
단, `/dev/stdin` 경로에 해당 파일이 없다면 에러가 난다.

## PHP

```php
<?php
	fscanf(STDIN, "%d %d", $a, $b);
	echo $a + $b;
?>
```

`$input = fgets(STDIN)`을 사용하면 라인 전체를 입력받을 수 있다.

## Python3

```python
a, b = map(int, input().split())
print(a+b)
```

## Ruby

```ruby
a, b = gets.chomp.split().map {|i| i.to_i}
puts a+b
```
