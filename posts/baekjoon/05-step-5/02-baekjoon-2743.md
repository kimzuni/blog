---
title: 단어 길이 재기 (2743)
date: 2023-02-23 20:05:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2743](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2743.png)

문자열의 길이는?

## Bash

```bash
read str
echo ${#str}
```

## Node.js

```javascript
const str = require("fs").readFileSync(0).toString().trim();
console.log( str.length );
```

## Python3

```python
print( len(input()) )
```

## Ruby

```ruby
puts gets.chomp.size
```
