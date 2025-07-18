---
title: 셀프 넘버 (4673)
date: 2023-02-04 12:10:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.4673 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-4673-1.png)
![Baekjoon No.4673 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-4673-2.png)

굳이 함수를 만들 필요가 없는 문제지만.. 함수 문제니 만들어야지..

## Bash

```bash
f_sum() {
	local s=$1
	local i=0
	for ((i=0; i<${#1}; i++)); do
		s=$((s + ${1:$i:1}))
	done
	echo $s
}

arr=({1..10000})
for i in {1..10000}; do
	s=`f_sum $i`

	idx=-1
	for ((j=0; j<${#arr[@]}; j++)); do
		if [ ${arr[$j]} == $s ]; then
			idx=$j
			break
		fi
	done
	if [ $idx != -1 ]; then
		arr=(${arr[@]::$idx} ${arr[@]:$idx+1})
	fi
done

for x in ${arr[@]}; do
	echo $x
done
```

Bash에서 함수는 사용법, 파라미터 받는 법 등 모든 게 명령어와 똑같이 사용된다.
즉, Bash는 함수에서도 `return`을 종료코드로 사용하기 때문에 이를 사용하여 문자열을 리턴할 수 없다.

물론 숫자를 리턴해서 `$?`로 값을 받으면 되긴 하지만 0은 정상적인 종료, 그 외는 비정상적인 종료를 의미하기 때문에 사용하지 않는 것이 좋다.
대신 함수 내에서 리턴하고 싶은 문자열을 출력하고 그 값을 받으면 된다.

다른 언어들과 달리 Bash는 함수 내에서 변수를 선언하면 기본적으로 전역변수로 선언된다.
지역변수로 선언하려면 `local` 명령어를 사용하면 된다. (e.g. `local var=val`)

하지만... 이 문제는 시간이 굉장히 오래 걸려서 시간 초과가 뜬다.

## C

```c
#include <stdio.h>

int f_sum(int n) {
	int s = n;
	while (0 < n) {
		s += n%10;
		n /= 10;
	}
	return s;
}

int main(void) {
	int arr[10000] = {0,};

	for (int i=1; i<=10000; i++) {
		int s = f_sum(i);
		if (s <= 10000) {
			arr[s-1] = 1;
		}
	}

	for (int i=0; i<10000; i++) {
		if (arr[i] != 1) {
			printf("%d\n", i+1);
		}
	}

	return 0;
}
```

## Node.js

```javascript
const f_sum = function(n) {
	let s = n;
	for (let m of n+"") {
		s += m*1;
	}
	return s;
}

let arr = [];
for (let i=1; i<=10000; i++) {
	arr.push(i);
}

for (let i=1; i<=10000; i++) {
	let s = f_sum(i);

	let idx = arr.indexOf(s);
	if (idx != -1) {
		arr.splice(idx, 1);
	}
}

console.log(arr.join("\n"));
```

## PHP

```php
<?php
	function f_sum($n) {
		$s = $n;
		while (0 < $n) {
			$s += $n%10;
			$n = floor($n/10);
		}
		return $s;
	}

	$arr = range(1, 10000);
	foreach (range(1, 10000) as $x) {
		$s = f_sum($x);
		$idx = array_search($s, $arr);
		if ($idx != "") {
			unset($arr[$idx]);
		}
	}
	echo join("\n", $arr);
?>
```

## Python3

```python
def f_sum(n):
    s = n
    for m in str(n):
        s += int(m)
    return s

arr = [i for i in range(1, 10001)]
for i in range(1, 10001):
    s = f_sum(i)
    if s in arr: arr.remove(s)
print("\n".join(map(str, arr)))
```

## Ruby

```ruby
def f_sum(n)
  s = n
  for m in n.to_s.split("")
    s += m.to_i
  end
  return s
end

arr = Array(1..10000)
for i in 1..10000
  s = f_sum(i)
  arr.delete_at(arr.index(s)) if arr.index(s)
end
puts arr
```
