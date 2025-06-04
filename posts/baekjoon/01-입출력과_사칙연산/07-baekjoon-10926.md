---
title: ??! (10926)
date: 2023-01-27 12:25:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10926](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10926.png)

입력받은 문자열에 문자열을 덧붙여 출력하면 된다.

## Bash

```bash
read name
echo $name??!
```

변수명에 특수기호는 포함되지 않기에 가능하다.
변수명에 사용되는 문자를 이어붙여야 한다면 `${var}abc` 형식으로 사용하면 된다.

## C

```c
#include <stdio.h>

int main(void) {
	char str[50];
	scanf("%s", str);
	printf("%s\?\?!", str);
	return 0;
}
```

## Node.js

```javascript
let name = require("fs").readFileSync(0).toString().trim();
console.log(name + "??!");
```

## PHP

```php
<?php
	fscanf(STDIN, "%s", $name);
	echo $name."??!";
?>
```

## Python3

```python
print("{}??!".format(input()))
```

## Ruby

```ruby
puts gets.chomp + "??!"
```
