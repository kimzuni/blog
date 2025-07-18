---
title: 다이얼 (5622)
date: 2023-02-19 15:41:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.5622 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-5622-1.png)
![Baekjoon No.5622 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-5622-1.png)

이 문제는 일반 배열을 사용해도 되지만 key-value 배열을 사용해도 된다.

## Bash

```bash
declare -A arr=(
	[1]=
	[2]=ABC
	[3]=DEF
	[4]=GHI
	[5]=JKL
	[6]=MNO
	[7]=PQRS
	[8]=TUV
	[9]=WXYZ
	[0]=
)
t=0
read str
while [ "$str" != "" ]; do
	x=${str::1}
	for i in {0..9}; do
		if [[ "${arr[$i]}" =~ "$x" ]]; then
			((t += i+1))
			break
		fi
	done
	str=${str:1}
done
echo $t
```

`Bash`에서는 key-value 배열을 생성하려면 변수 타입을 지정해주는 `declare` 명령어를 사용해야 한다.
`declare` 명령어의 옵션 A가 key-value 배열을 생성해주는 옵션이며, `[key]=value`로 키와 값을 매핑한다.

## Node.js

```javascript
arr = {
	A: 2, B: 2, C: 2,
	D: 3, E: 3, F: 3,
	G: 4, H: 4, I: 4,
	J: 5, K: 5, L: 5,
	M: 6, N: 6, O: 6,
	P: 7, Q: 7, R: 7, S: 7,
	T: 8, U: 8, V: 8,
	W: 9, X: 9, Y: 9, Z: 9
}

let t = 0
let str = require("fs").readFileSync(0).toString().trim().split("");
for (let x of str) {
	t += arr[x]+1;
}
console.log(t);
```

key와 value의 위치를 바꾸면 배열의 길이는 길어지지만 시간을 구하는 코드는 짧아진다.

## Python3

```python
arr = {
	1: "",
	2: "ABC",
	3: "DEF",
	4: "GHI",
	5: "JKL",
	6: "MNO",
	7: "PQRS",
	8: "TUV",
	9: "WXYZ",
	0: ""
}

t = 0
a = input()
for x in a:
    for k in arr:
        if x not in arr[k]: continue
        t += k+1
        break
print(t)
```

`Python`은 key-value 배열으로 for문을 사용하면 key값이 반복된다.

## Ruby

```ruby
arr = {
  "A" => 2, "B" => 2, "C" => 2,
  "D" => 3, "E" => 3, "F" => 3,
  "G" => 4, "H" => 4, "I" => 4,
  "J" => 5, "K" => 5, "L" => 5,
  "M" => 6, "N" => 6, "O" => 6,
  "P" => 7, "Q" => 7, "R" => 7, "S" => 7,
  "T" => 8, "U" => 8, "V" => 8,
  "W" => 9, "X" => 9, "Y" => 9, "Z" => 9
}

t = 0
str = gets.chomp.split("")
for x in str
  t += arr[x]+1
end
puts t
```

`Ruby`의 Key와 value를 매핑할 때 화살표를 사용한다.
