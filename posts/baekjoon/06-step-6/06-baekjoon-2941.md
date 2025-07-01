---
title: 크로아티아 알파벳 (2941)
date: 2023-02-19 16:19:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.2941 문제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2941-1.png)
![Baekjoon No.2941 예제](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-2941-1.png)

크로아티아 알파벳으로 변환 후 출력하는 게 아닌, 알파벳의 개수를 묻는 문제이므로 변경된 문자열을 아무 문자로 바꾸고 문자열의 길이를 출력하면 된다.

## Bash

```bash
arr=(c= c- dz= d- lj nj s= z=)
read str
for x in ${arr[@]}; do
	str="${str//$x/ }"
done
echo "${#str}"
```

## Node.js

```javascript
const arr = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="];
let str = require("fs").readFileSync(0).toString().trim();
for (let x of arr) {
	str = str.replace(new RegExp(x, 'g'), ' ');
}
console.log(str.length);
```

`replace(/x/g, ' ')`를 사용하면 x를 변수가 아닌 문자 x로 인식한다.
`RegExp` 함수를 사용하면 변수를 사용할 수 있다.

## Python3

```python
arr = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="]
a = input()
for x in arr:
    a = a.replace(x, ' ')
print(len(a))
```

## Ruby

```ruby
arr = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="]
str = gets.chomp
for x in arr
  str = str.gsub(x, ' ')
end
puts str.size
```
