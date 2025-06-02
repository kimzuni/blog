---
title: 문자열 반복 (2675)
date: 2023-02-18 17:52:00 +0900
tags: ["Bash", "Node.js", "Python3", "Ruby"]
---

![Baekjoon No.2675](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2675.png)

문자열의 모든 문자를 r번 반복하라.

## Bash

```bash
read t
for ((i=0; i<t; i++)); do
	read r s
	while [ "$s" != "" ]; do
		for ((j=0; j<r; j++)); do
			echo -n "${s::1}"
		done
		s="${s:1}"
	done
	echo
done
```

## Node.js

```javascript
const [t, ...str] = require("fs").readFileSync(0).toString().trim().split("\n");
for (let [r, s] of str.map(x => x.split(" "))) {
	let arr = [];
	for (let x of s) {
		for (let i=0; i<r; i++) {
			arr.push(x);
		}
	}
	console.log(arr.join(""));
}
```

## Python3

```python
t = int(input())
for i in range(t):
    r, s = input().split()
    for x in s:
        for j in range(int(r)):
            print(x, end='')
    print()
```

## Ruby

```ruby
t = gets.chomp.to_i
for i in 0...t
  r, s = gets.chomp.split()
  for x in s.split("")
    for j in 0...r.to_i
      print x
    end
  end
  puts
end
```
