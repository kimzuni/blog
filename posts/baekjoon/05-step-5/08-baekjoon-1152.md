---
title: 단어의 개수 (1152)
date: 2023-02-19 14:56:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1152](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1152.png)

문자열을 공백을 기준으로 자른 후 나온 단어의 개수는?

## Bash

```bash
read -a arr
echo ${#arr[@]}
```

## Node.js

```javascript
const arr = require("fs").readFileSync(0).toString().trim().split(" ");
console.log(arr.length);
```

왜 틀린 건지 모르겠다..

## Python3

```python
print( len(input().split()) )
```

## Ruby

```ruby
puts gets.chomp.split().size
```
