---
title: 과제 안 내신 분..? (5597)
date: 2023-01-31 22:36:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.5597 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-5597-1.png)

<Imgbox>

![Baekjoon No.5597 예제-1](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-5597-2.png)
![Baekjoon No.5597 예제-2](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-5597-3.png)

</Imgbox>

1부터 30중에 빠진 숫자를 찾아라!

1. 1부터 30까지의 문자열을 미리 준비해놓고 입력한 수를 제거한다.
2. 1부터 30까지 반복문을 돌리며 미리 입력받은 값에 해당 수가 있는지 체크한다.

## Bash

```bash
arr=" `echo {1..30}` "
for i in {1..28}; do
	read n
	arr=${arr/ $n / }
done
arr=${arr# }
echo "${arr/ /$'\n'}"
```

## C

```c
#include <stdio.h>

int main(void) {
	int arr[28];
	for (int i=0; i<28; i++) {
		scanf("%d", &arr[i]);
	}

	int idx;
	for (int n=1; n<=30; n++) {
		idx = -1;
		for (int i=0; i<28; i++) {
			if (arr[i] == n) {
				idx = i;
				break;
			}
		}
		if (idx == -1) {
			printf("%d\n", n);
		}
	}

	return 0;
}
```

## Node.js

```javascript
let arr = [...Array(30).keys()].map(x => x + 1);
let input = require("fs").readFileSync(0).toString().trim().split("\n").map(Number).sort();
for (let n of input) {
	arr.splice(arr.indexOf(n), 1);
}
console.log(arr.join("\n"));
```

## PHP

```php
<?php
	$arr = range(1, 30);
	for ($i=0; $i<28; $i++) {
		fscanf(STDIN, "%d", $n);
		$idx = array_search($n, $arr);
		unset($arr[$idx]);
	}
	echo join("\n", $arr);
?>
```

## Python3

```python
arr = [i for i in range(1, 31)]
for i in range(28):
    n = int(input())
    arr.remove(n)
print( "\n".join(map(str, arr)) )
```

## Ruby

```ruby
arr = Array(1..30)
for i in 0...28
  n = gets.chomp.to_i
  arr.delete_at(arr.index(n))
end
puts arr
```
