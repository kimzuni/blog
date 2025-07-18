---
title: 그룹 단어 체커 (1316)
date: 2023-02-19 16:43:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1316 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1316-1.png)
![Baekjoon No.1316 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1316-2.png)

그룹 단어의 개수를 구하라.

## Bash

```bash
read n
cnt=0
for ((i=0; i<n; i++)); do
	read str
	bak=""
	group=1
	while [ "$str" != "" ]; do
		x=${str::1}
		if [[ "$bak" != *"$x"* ]]; then
			bak=$x$bak
		elif [ "$x" != "${bak::1}" ]; then
			group=0
			break
		fi
		str="${str:1}"
	done
	((cnt += group ? 1 : 0))
done
echo $cnt
```

## Node.js

```javascript
const [n, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
cnt = 0;
for (let str of arr) {
	let arr = [];
	group = true;
	for (let x of str) {
		if (arr.indexOf(x) == -1) {
			arr.push(x);
		} else if (arr[arr.length-1] != x) {
			group = false;
			break
		}
	}
	if (group) cnt++;
}
console.log(cnt);
```

## Python3

```python
n = int(input())
cnt = 0
for i in range(n):
    a = input()
    arr = []
    group = True
    for x in a:
        if x not in arr:
            arr.append(x)
        elif and arr[-1] != x:
            group = False
            break
    if group: cnt += 1
print(cnt)
```

## Ruby

```ruby
n = gets.chomp.to_i
cnt = 0
for i in 0...n
  str = gets.chomp.split("")
  arr = []
  group = true
  for x in str
    if !arr.index(x)
      arr.append(x)
    elsif arr[-1] != x
      group = false
      break
    end
  end
  cnt += 1 if group
end
puts cnt
```
