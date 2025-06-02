---
title: 바구니 순서 바꾸기 (10812)
date: 2023-02-27 20:04:00 +0900
tags: ["Bash", "Node.js", "Python3", "Ruby"]
---

![Baekjoon No.10812](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10812.png)

i번 바구니부터 j번 바구니까지 공의 순서를 바꿔라.

## Bash

```bash
read n m
arr=()
for ((i=0; i<n+1; i++)); do arr+=($i); done
for ((idx=0; idx<m; idx++)); do
	read i j k
	bak=()
	for ((jdx=0; jdx<j-i+1; jdx++)); do
		x=$((i + (k-i+jdx)%(j-i+1)))
		bak+=(${arr[$x]})
	done
	for ((jdx=0; jdx<${#bak[@]}; jdx++)); do
		arr[$jdx+$i]=${bak[$jdx]}
	done
done
echo ${arr[@]:1}
```

## Node.js

```javascript
const [[n, m], ...input] = require("fs").readFileSync(0).toString().trim().split("\n").map(x => x.split(" ").map(Number));
let arr = [...Array(n+1).keys()];
for (let [i, j, k] of input) {
	let bak = [];
	for (let jdx=0; jdx<j-i+1; jdx++) {
		x = i+(k-i+jdx)%(j-i+1);
		bak.push(arr[x]);
	}
	for (let jdx=0; jdx<bak.length; jdx++) {
		arr[jdx+i] = bak[jdx];
	}
}
console.log( arr.slice(1, arr.length).join(" ") );
```

## Python3

```python
n, m = map(int, input().split())
arr = [str(i) for i in range(n+1)]
for idx in range(m):
    i, j, k = map(int, input().split())
    bak = []
    for jdx in range(j-i+1):
        jdx = i+(k-i+jdx)%(j-i+1)
        bak.append( arr[jdx] )
    for jdx in range(len(bak)):
        arr[jdx+i] = bak[jdx]
print(' '.join(arr[1:]))
```

## Ruby

```ruby
n, m = gets.chomp.split().map {|i| i.to_i}
arr = (0..n).to_a
for idx in 0...m
  i, j, k = gets.chomp.split().map {|i| i.to_i}
  bak = []
  for jdx in 0...j-i+1
    jdx = i+(k-i+jdx)%(j-i+1)
    bak.push(arr[jdx])
  end
  for jdx in 0...bak.size
    arr[jdx+i] = bak[jdx]
  end
end
puts arr[1, arr.size].join(" ")
```
