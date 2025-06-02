---
title: 정수 N개의 합 (15596)
date: 2023-02-03 21:50:00 +0900
tags: ["C", "Python3"]
---

![Baekjoon No.15596](https://cdn.jsdelivr.net/gh/kimzuni/cdn/blog/baekjoon-15596.png)

이번 문제는 특이하게 제출 시 선택한 언어에 맞게 제출 형식을 지정해준다.
언어에 따라 해당 코드를 수정 및 추가해서 제출하면 된다.

언어가 제한되어 있어 Bash, Node.js, PHP, Ruby는 제출 불가.

## C

```c
long long sum(int *a, int n) {
	long long ans = 0;
	for (int i=0; i<n; i++) {
		ans += a[i];
	}
	return ans;
}
```

## Python3

```python
def solve(a):
    return sum(a)
```
