---
title: 단어 공부 (1157)
date: 2023-02-18 18:05:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.1157](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-1157.png)

주어진 단어에서 제일 많은 알파벳은?

## Bash

```bash
read str
str="${str^^}"
arr=(0 "")
for x in {A..Z}; do
        cnt=${str//[^$x]/}
        cnt=${#cnt}
        if [ $cnt == 0 ]; then
                continue
        elif [ "${arr[0]}" -le $cnt ]; then
                if [ $arr -lt $cnt ]; then
                        arr[0]=$cnt
                        arr[1]=""
                fi
                arr[1]+=$x
        fi
done
test ${#arr[1]} == 1 && echo ${arr[1]} || echo ?
```

`${var^^}`: 모두 대문자로 변환, `${var,,}`: 모두 소문자로 변환

하지만 시간 초과..

## Node.js

```javascript
const str = require("fs").readFileSync(0).toString().trim().toUpperCase().split("");
const set = str.filter((r, i) => { return str.indexOf(r) == i; });
let arr = [0, ""];
for (let x of set) {
	let n = str.filter(s => s == x).length;
	if (arr[0] <= n) {
		if (arr[0] < n) {
			arr[0] = n;
			arr[1] = "";
		}
		arr[1] += x;
	}
}
console.log(arr[1].length == 1 ? arr[1] : "?");
```

## Python3

```python
a = input().upper()
ls = set(a)
arr = [0, ""]
for x in ls:
    n = a.count(x)
    if arr[0] <= n:
        if arr[0] < n:
            arr[0] = n
            arr[1] = ""
        arr[1] += x
print(arr[1] if len(arr[1])==1 else "?")
```

## Ruby

```ruby
str = gets.chomp.upcase()
set = ("A".."Z").to_a & str.split("")
arr = [0, ""]
for x in set
  n = str.count(x)
  if arr[0] <= n
    if arr[0] < n
      arr[0] = n
      arr[1] = ""
    end
    arr[1] += x
  end
end
puts arr[1].size == 1 ? arr[1] : "?"
```

and 연산을 이용하여 A to Z 중 입력받은 문자열에 존재하는 알파벳만 남기는 방식.
