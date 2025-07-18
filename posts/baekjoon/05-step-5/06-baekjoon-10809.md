---
title: 알파벳 찾기 (10809)
date: 2023-02-17 18:14:00 +0900
last_modified_at: false
tags: ["Baekjoon"]
---

![Baekjoon No.10809](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10809.png)

각 알파벳이 처음 위치한 곳은?

## Bash

```bash
read str
for x in {a..z}; do
	idx=-1
	bak="$str"
	for ((i=0; 0<${#bak}; i++)); do
		if [ "${bak::1}" == "$x" ]; then
			idx=$i
			break
		fi
		bak="${bak:1}"
	done
	echo -n "$idx "
done
```

`{0..5}`를 사용해서 0부터 5까지의 숫자를 사용하는 것처럼 알파벳도 가능하다.

## Node.js

```javascript
const str = require("fs").readFileSync(0).toString().trim();
let arr = [];
for (let i='a'.charCodeAt(0); i<'z'.charCodeAt(0)+1; i++) {
	let x = String.fromCharCode(i);
	arr.push( str.indexOf(x) );
}
console.log( arr.join(" ") );
```

아스키 코드를 이용하여 a부터 z까지의 알파벳을 가져오는 방식.
a의 아스키 코드는 97, z의 아스키 코드는 122이므로 `for (let i=97; i<123; i++) {...}`으로 사용해도 된다.

## Python3

```python
s = input()
for x in range(ord('a'), ord('z')+1):
    print(s.find(chr(x)), end=' ')
```

`JavaScript`와 같은 이유로 `range(97, 123)`으로 사용해도 된다.

## Ruby

```ruby
str = gets.chomp
for x in 'a'..'z'
  n = str.index(x)
  print "#{n ? n : -1} "
end
```

`Bash`와 마찬가지로 알파벳도 가능하다.
