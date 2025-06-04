---
title: 한수 (1065)
date: 2023-02-04 19:45:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.1065 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1065-1.png)
![Baekjoon No.1065 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1065-2.png)

100 미만인 자연수는 무조건 한수다.

## Bash

```bash
f_cus() {
	if [ $1 -lt 100 ]; then return 0; fi
	o=$(($1%10 - $1/10%10))
	n=$(($1 / 10));
	while [ 10 -le $n ]; do
		if [ $((n/10%10 + o)) != $((n % 10)) ]; then return 1; fi
		n=$((n / 10))
	done
	return 0
}

read n
cnt=0
for ((i=n; 0<i; i--)); do
	if f_cus $i; then
		((cnt++))
	fi
done
echo $cnt
```

## C

```c
#include <stdio.h>
#include <stdbool.h>
#include <math.h>

bool f_cus(int n) {
	if (n < 100) return true;
	int o = n%10 - n/10%10;
	n /= 10;
	while (10 <= n) {
		if (floor(n/10%10) + o != n%10) return false;
		n /= 10;
	}
	return true;
}

int main(void) {
	int n, cnt = 0;
	scanf("%d", &n);

	for (int i=1; i<=n; i++) {
		if (f_cus(i)) cnt += 1;
	}
	printf("%d\n", cnt);

	return 0;
}
```

## Node.js

```javascript
const f_cus = function(n) {
	if (n < 100) return true;
	sn = n+"";
	o = sn[1]*1 - sn[0]*1;
	for (let i=1; i<sn.length-1; i++) {
		if (sn[i]*1 + o != sn[i+1]*1) return false;
	}
	return true;
}

let n = Number(require("fs").readFileSync(0).toString().trim());
let cnt = 0;
for (let i=1; i<=n; i++) {
	if (f_cus(i)) cnt += 1;
}
console.log(cnt);
```

## PHP

```php
<?php
	function f_cus($n) {
		if ($n < 100) return true;
		$bak = $n;
		$o = $n%10 - $n/10%10;
		$n = floor($n/10);
		while (10 <= $n) {
			if (floor($n/10%10) + $o != $n%10) return false;
			$n = floor($n/10);
		}
		return true;
	}

	fscanf(STDIN, "%d", $n);
	$cnt = 0;
	for ($i=1; $i<=$n; $i++) {
		if (f_cus($i)) $cnt += 1;
	}
	echo $cnt;
?>
```

## Python3

```python
def f_cus(n):
    if n < 100: return True
    sn = str(n)
    o = int(sn[1]) - int(sn[0])
    for i in range(1, len(sn)-1):
        if int(sn[i]) + o != int(sn[i+1]):
            return False
    return True

n = int(input())
cnt = 0
for i in range(1, n+1):
    if f_cus(i): cnt+=1
print(cnt)
```

## Ruby

```ruby
def f_cus(n)
  return true if n < 100
  sn = n.to_s
  o = sn[1].to_i - sn[0].to_i
  for i in 1...sn.size-1
    return false if sn[i].to_i + o != sn[i+1].to_i
  end
  return true
end

n = gets.chomp.to_i
cnt = 0
for i in 1..n
  cnt+=1 if f_cus(i)
end
puts cnt
```
