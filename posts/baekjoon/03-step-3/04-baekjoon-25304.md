---
title: 영수증 (25304)
date: 2023-01-29 13:49:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.25304 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-25304-1.png)
![Baekjoon No.25304 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-25304-2.png)

입력받은 금액에서 물건 가격을 모두 뺀 후에 남은 액수가 0이면 일치.

## Bash

```bash
read t
read n
for ((i=0; i<n; i++)); do
	read p m
	((t -= p*m))
done
[ $t == 0 ] && echo "Yes" || echo "No"
```

## C

```c
#include <stdio.h>

int main(void) {
	int t, n, p, m;
	scanf("%d", &t);
	scanf("%d", &n);
	while (0 < n) {
		scanf("%d %d", &p, &m);
		t-=p*m;
		n--;
	}
	printf("%s\n", t == 0 ? "Yes" : "No");
	return 0;
}
```

## Node.js

```javascript
let [t, n, ...list] = require("fs").readFileSync(0).toString().trim().split("\n");
t*=1;
for (let l of list) {
	let [p, m] = l.split(" ").map(Number);
	t-=p*m;
}
console.log(t == 0 ? "Yes" : "No");
```

`t*=1` == `t = Number(t)`

## PHP

```php
<?php
	fscanf(STDIN, "%d", $t);
	fscanf(STDIN, "%d", $n);
	for ($i=0; $i<$n; $i++) {
		fscanf(STDIN, "%d %d", $p, $m);
		$t -= $p * $m;
	}
	echo $t == 0 ? "Yes" : "No";
?>
```

## Python3

```python
t = int(input())
n = int(input())
for i in range(n):
    p, m = map(int, input().split())
    t-=p*m
print("Yes" if t==0 else "No")
```

## Ruby

```ruby
t = gets.chomp.to_i
n = gets.chomp.to_i
for i in 0...n
  p, m = gets.chomp.split().map {|i| i.to_i}
  t-=p*m
end
puts t == 0 ? "Yes" : "No"
```
