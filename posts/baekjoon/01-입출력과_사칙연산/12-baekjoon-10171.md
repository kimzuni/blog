---
title: 고양이 (10171)
date: 2023-01-27 16:25:00 +0900
last_modified_at: false
tags: ["Bash", "C", "Node.js", "PHP", "Python3", "Ruby"]
---

![Baekjoon No.10171](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-10171.png)

귀여운 고냥이.
역슬래시와 같이 특별한 기능으로 사용되는 문자를 출력할 때 주의해야 한다.

## Bash

```bash
echo "\    /\\
 )  ( ')
(  /  )
 \(__)|"
```

## C

```c
#include <stdio.h>

int main(void) {
	printf("\\    /\\\n");
	printf(" )  ( ')\n");
	printf("(  /  )\n");
	printf(" \\(__)|\n");
	return 0;
}
```

## Node.js

```javascript
console.log(`
\\    /\\
 )  ( ')
(  /  )
 \\(__)|
`.trim());
```

## PHP

```php
\    /\
 )  ( ')
(  /  )
 \(__)|
```

## Python3

```python
print("""
\    /\\
 )  ( ')
(  /  )
 \(__)|
""".strip())
```

## Ruby

```ruby
puts "
\\    /\\
 )  ( ')
(  /  )
 \\(__)|
".strip
```
