---
title: 코딩은 체육과목 입니다 (25314)
date: 2023-02-22 20:28:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.25314](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-25314.png)

손 코딩..?

## Bash

```bash
read n
o=""
for ((i=0; i<n; i+=4)); do
	o+="long "
done
echo $o"int"
```

i를 4씩 증가하는 방법

## Node.js

```javascript
let n = Number(require("fs").readFileSync(0).toString().trim());
let o = "";
for (let i=0; i<n/4 i++) {
	o += "long ";
}
console.log(o + "int");
```

i를 n/4까지 1씩 증가하는 방법

## PHP

```php
<?php
	fscanf(STDIN, "%d", $n);
	for ($i=0; $i<$n; $i+=4) {
		echo "long ";
	}
	echo "int";
?>
```

반복문을 돌면서 줄바꿈을 하지 않고 바로 출력하는 방법

## Python3

```python
n = int(input())
o = ["long" for i in range(0, n, 4)]
print(" ".join(o) + " int")
```

`range(0, n, 4)`: 0부터 4씩 증가하여 n 미만까지의 값을 리스트로 만듦

## Ruby

```ruby
n = gets.chomp.to_i
o = ""
for i in (0...n).step(4)
  o += "long "
end
puts o + "int"
```

`(0...n).step(4)`와 `Python`의 `range(0, n, 4)`는 다르다.
`Python`의 `range`는 배열을 생성하지만, `Ruby`의 `step`은 앞에 주어진 범위에서 4씩 건너뛰는 방식이다.
즉, `arr = ('a'..'z'); arr.step(2)`도 가능하다.
