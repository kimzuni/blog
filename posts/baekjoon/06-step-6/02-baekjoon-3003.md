---
title: 킹, 퀸, 룩, 비숍, 나이트, 폰 (3003)
date: 2023-01-27 13:27:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.3003](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-3003.png)

각 피스의 수에 입력받은 수를 빼면 된다.
배열 문제는 아니지만 배열을 사용하는 게 편해서.. 배열을 사용했다.

## Bash

```bash
arr1=(1 1 2 2 2 8)
read arr2
arr2=($arr2)

for i in {0..5}; do
	echo -n $((arr1[i] - arr2[i]))" "
done
```

입력받은 문자열을 `arr2=($arr)`를 사용하여 배열로 바꾼 것이다.
Bash는 배열을 만들 때 쉼표가 아닌 공백을 기준으로 나누기 때문에 가능하다.
입력받을 때 `a` 옵션을 사용하여 바로 배열로 받을 수도 있다. (e.g. `read -a arr2`)

`{0..5}` == `0 1 2 3 4 5`

Bash의 for문은 `in` 뒤에 오는 모든 문자열을 순서대로 반복한다.

## C

```c
#include <stdio.h>

int main(void) {
	int i[6] = {1, 1, 2, 2, 2, 8};
	int a, b, c, d, e, f;
	scanf("%d %d %d %d %d %d", &a, &b, &c, &d, &e, &f);
	printf("%d %d %d %d %d %d\n", i[0]-a, i[1]-b, i[2]-c, i[3]-d, i[4]-e, i[5]-f);
	return 0;
}
```

## Node.js

```javascript
const arr1 = [1, 1, 2, 2, 2, 8];
let arr2 = require("fs").readFileSync(0).toString().trim().split(" ").map(Number);
let output = [];
for (let i=0; i<6; i++) {
	output.push(arr1[i] - arr2[i]);
}
console.log(output.join(" "));
```

## PHP

```php
<?php
	$arr1 = [1, 1, 2, 2, 2, 8];
	$arr2 = explode(" ", fgets(STDIN));
	for ($i=0; $i<6; $i++) {
		echo $arr1[$i] - $arr2[$i]." ";
	}
?>
```

## Python3

```python
arr1 = 1, 1, 2, 2, 2, 8
arr2 = list(map(int, input().split()))
output = []
for i in range(6):
    output.append(arr1[i] - arr2[i])
print(output.join(" "))
```

## Ruby

```ruby
arr1 = 1, 1, 2, 2, 2, 8
arr2 = gets.chomp.split().map {|i| i.to_i}
for i in 0...6 do
  print "#{arr1[i] - arr2[i]} "
end
```
