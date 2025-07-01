---
title: 바구니 뒤집기 (10811)
date: 2023-02-23 18:09:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10811](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10811.png)

i번 바구니부터 j번 바구니까지 공의 순서를 역순으로 뒤집어라.

## Bash

```bash
read n m
arr=()
for ((i=0; i<=n; i++)); do arr+=($i); done
for ((idx=0; idx<m; idx++)); do
	read i j
	for ((jdx=i; jdx<=(i+j)/2; jdx++)); do
		bak=${arr[$jdx]}
		arr[$jdx]=${arr[$((j-jdx+i))]}
		arr[$((j-jdx+i))]=$bak
	done
done
echo "${arr[@]:1}"
```

## Node.js

```javascript
const [[n, m], ...input] = require("fs").readFileSync(0).toString().trim().split("\n").map(x => x.split(" ").map(Number));
let arr = [...Array(n+1).keys()];
for (let [i, j] of input) {
	for (let idx=i; idx<=(i+j)/2; idx++) {
		let bak = arr[idx];
		arr[idx] = arr[j-idx+i];
		arr[j-idx+i] = bak;
	}
}
console.log( arr.slice(1).join(" ") );
```

## Python3

```python
n, m = map(int, input().split())
arr = [i for i in range(n+1)]
for idx in range(m):
    i, j = map(int, input().split())
    for jdx in range(i, int((i+j)/2)+1):
        arr[jdx], arr[j-jdx+i] = arr[j-jdx+i], arr[jdx]
print( ' '.join(map(str, arr[1:])) )
```

## Ruby

```ruby
n, m = gets.chomp.split().map {|i| i.to_i}
arr = (0..n).to_a
for idx in 0...m
  i, j = gets.chomp.split().map {|i| i.to_i}
  for jdx in i..(i+j)/2
    arr[jdx], arr[j-jdx+i] = arr[j-jdx+i], arr[jdx]
  end
end
puts arr[1, n].join(" ")
```
