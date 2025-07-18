---
title: 최소, 최대 (10818)
date: 2023-01-30 22:33:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10818](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10818.png)

최솟값과 최댓값

## Bash

```bash
read n
read arr
# # arr=(`echo $arr | tr " " "\n" | sort -n`)
# arr=(`echo "${arr// /$'\n'}" | sort -n`)
# echo "$arr ${arr[${#arr[@]}-1]}"

arr2=(${arr%% *} 0)
for i in $arr; do
	if [ $i -lt ${arr2[0]} ]; then
		arr2[0]=$i;
	fi
	if [ $i -gt ${arr2[1]} ]; then
		arr2[1]=$i;
	fi
done
echo ${arr2[@]}
```

`tr`, `sort`도 안된다.. 그냥 문제 푸는데 필요한 명령어 외에는 다 안되는 듯하다.
그래서 반복문을 돌려야 하는데 죄다 시간 초과가 걸린다..

결론은 위 두 방법 다 답은 나오지만 백준에서는 되지 않는다.

## C

```c
#include <stdio.h>

int main(void) {
	int n, m;
	scanf("%d", &n);

	int arr[2] = {0, 0};
	for (int i=0; i<n; i++) {
		scanf("%d", &m);
		if (i == 0) {
			arr[0] = m;
			arr[1] = m;
		} else if (m < arr[0]) {
			arr[0] = m;
		} else if (arr[1] < m) {
			arr[1] = m;
		}
	}
	printf("%d %d\n", arr[0], arr[1]);

	return 0;
}
```

## Node.js

```javascript
let [n, ...arr] = require("fs").readFileSync(0).toString().trim().split(/ |\n/).map(Number);
console.log( Math.min(...arr), Math.max(...arr) )
```

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	$arr = explode(" ", trim(fgets(STDIN)));
	echo min($arr)." ".max($arr);
?>
```

## Python3

```python
n = int(input())
arr = sorted(map(int, input().split()))
print(arr[0], arr[-1])
```

오름차순 정렬 후 첫 번째와 마지막 원소를 출력.

## Ruby

```ruby
n = gets.chomp.to_i
arr = gets.chomp.split().map {|i| i.to_i}
puts "#{arr.min()} #{arr.max()}"
```
