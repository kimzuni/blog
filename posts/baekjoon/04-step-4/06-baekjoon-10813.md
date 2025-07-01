---
title: 공 바꾸기 (10813)
date: 2023-02-23 17:46:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10813](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10813.png)

i번 바구니와 j번 바구니의 공을 서로 바꿔라.

## Bash

```bash
read n m
arr=()
for ((i=0; i<=n; i++)); do arr+=($i); done
for ((idx=0; idx<m; idx++)); do
	read i j
	bak=${arr[$i]}
	arr[$i]=${arr[$j]}
	arr[$j]=$bak
done
echo "${arr[@]:1}"
```

## Node.js

```javascript
const [[n, m], ...input] = require("fs").readFileSync(0).toString().trim().split("\n").map(x => x.split(" ").map(Number));
let arr = [...Array(n+1).keys()];
for (let [i, j] of input) {
	let bak = arr[i];
	arr[i] = arr[j];
	arr[j] = bak;
}
console.log( arr.slice(1).join(" ") );
```

## Python3

```python
n, m = map(int, input().split())
arr = [i for i in range(n+1)]
for idx in range(m):
    i, j = map(int, input().split())
    arr[i], arr[j] = arr[j], arr[i]
print( ' '.join(map(str, arr[1:])) )
```

## Ruby

```ruby
n, m = gets.chomp.split().map {|i| i.to_i}
arr = (0..n).to_a
for idx in 0...m
  i, j = gets.chomp.split().map {|i| i.to_i}
  arr[i], arr[j] = arr[j], arr[i]
end
puts arr[1, n].join(" ")
```
