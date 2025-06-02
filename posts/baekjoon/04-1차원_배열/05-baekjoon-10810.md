---
title: 공 넣기 (10810)
date: 2023-02-23 16:53:00 +0900
tags: ["Bash", "Node.js", "Python3", "Ruby"]
---

![Baekjoon No.10810](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10810.png)

i번 바구니부터 j번 바구니까지 k번 공을 넣어라.

## Bash

```bash
read n m
arr=()
for ((i=0; i<n; i++)); do arr+=(0); done
for ((idx=0; idx<m; idx++)); do
	read i j k
	for ((jdx=i-1; jdx<j; jdx++)); do
		arr[$jdx]=$k
	done
done
echo "${arr[@]}"
```

## Node.js

```javascript
const [[n, m], ...input] = require("fs").readFileSync(0).toString().trim().split("\n").map(x => x.split(" ").map(Number));
let arr = Array(n).fill(0);
for (let [i, j, k] of input) {
	for (let idx=i-1; idx<j; idx++) {
		arr[idx] = k;
	}
}
console.log( arr.join(" ") );
```

## Python3

```python
n, m = map(int, input().split())
arr = ["0" for i in range(n)]
for idx in range(m):
    i, j, k = map(int, input().split())
    for jdx in range(i-1, j):
        arr[jdx] = str(k)
print( ' '.join(arr) )
```

## Ruby

```ruby
n, m = gets.chomp.split().map {|i| i.to_i}
arr = Array.new(n, 0)
for idx in 0...m
  i, j, k = gets.chomp.split().map {|i| i.to_i}
  for jdx in i-1...j
    arr[jdx] = k
  end
end
puts arr.join(" ")
```
