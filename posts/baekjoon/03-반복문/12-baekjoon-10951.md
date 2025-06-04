---
title: A + B - 4 (10951)
date: 2023-01-29 20:11:00 +0900
last_modified_at: false
tags: ["Bash", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10951](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10951.png)

아무것도 입력하지 않으면 반복문을 빠져나온다.

## Bash

```bash
while :; do
	read a b
	if [ "$a$b" == "" ]; then
		break
	fi
	echo $((a + b))
done
```

## Node.js

```javascript
let list = require("fs").readFileSync(0).toString().trim().split("\n");
for (let l of list) {
	let [a, b] = l.split(" ").map(Number);
	console.log(a+b);
}
```

## PHP

```php
<?php
	while (1) {
		unset($a, $b);
		fscanf(STDIN, "%d %d", $a, $b);
		if ($a == "" || $b == "") { break; }
		echo $a + $b."\n";
	}
?>
```

## Python3

```python
try:
    while 1:
        a, b = map(int, input().split())
        print(a+b)
except:
    pass
```

## Ruby

```ruby
begin
  while 1
    a, b = gets.chomp.split().map {|i| i.to_i}
    puts a+b
  end
rescue
  nil
end
```

`begin` == 다른 언어의 `try`

`rescue`는 `cache`, `except`와 같은 기능을 하며, `else`, `ensure` 등의 기능이 더 있다.
`nil`은 `null`와 비슷한 역할을 하지만, `Python`의 `pass` 처럼 사용할 수도 있다.
