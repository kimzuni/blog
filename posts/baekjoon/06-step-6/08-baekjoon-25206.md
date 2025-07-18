---
title: 너의 평점은 (25206)
date: 2023-02-28 16:14:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.25206 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-25206-1.png)
![Baekjoon No.25206 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-25206-2.png)

이런 게 진짜 있나..?

## Bash

```bash
declare -A table=(
	[A+]=4.5 [A0]=4.0
	[B+]=3.5 [B0]=3.0
	[C+]=2.5 [C0]=2.0
	[D+]=1.5 [D0]=1.0
	[F]=0.0
)
s=0
t=0
for ((i=0; i<20; i++)); do
	read a b c
	if [ "$c" == "P" ]; then continue; fi
	b=${b%.*}
	((s += b))
	((t += b * ${table[$c]/./}))
done
o=00000$((t * 10**4 / s))
o=${o: -6:1}.${o: -5}
echo $o
```

## Node.js

```javascript
const table = {
	"A+": 4.5, A0: 4.0,
	"B+": 3.5, B0: 3.0,
	"C+": 2.5, C0: 2.0,
	"D+": 1.5, D0: 1.0,
	F: 0.0
}

const input = require("fs").readFileSync(0).toString().trim().split("\n").map(x => x.split(" "));
s = 0;
t = 0;
for (let [a, b, c] of input) {
	if (c == "P") continue;
	s += b*1;
	t += b * table[c];
}
console.log(t/s);
```

`+`를 연산자가 아닌 문자로 인식하기 위해 따옴표로 감싼 것이다.

## Python3

```python
table = {
        "A+": 4.5, "A0": 4.0,
        "B+": 3.5, "B0": 3.0,
        "C+": 2.5, "C0": 2.0,
        "D+": 1.5, "D0": 1.0,
        "F": 0.0,
}
s = 0
t = 0
for i in range(20):
    a, b, c = input().split()
    if c=="P": continue
    s += float(b)
    t += float(b)*table[c]
print(t/s)
```

## Ruby

```ruby
table = {
  "A+" => 4.5, "A0" => 4.0,
  "B+" => 3.5, "B0" => 3.0,
  "C+" => 2.5, "C0" => 2.0,
  "D+" => 1.5, "D0" => 1.0,
  "F" => 0.0
}
s = 0
t = 0
for i in 0...20
  a, b, c = gets.chomp.split()
  next if c == "P"
  s += b.to_f
  t += b.to_f * table[c]
end
puts t/s
```
