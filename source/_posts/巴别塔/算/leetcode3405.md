---
title: Leetcode 3405. Count the number of Arrays with K matching adjacent Elements
categories: [巴别塔(babel-tower),算(hermes)]
date: 2025-06-17
tags: 
    - array
---

## Problem
You are given three integers `n`, `m`, `k`. A good array `arr` of size `n` is defined as follows:

Each element in `arr` is in the inclusive range `[1, m]`.
Exactly `k` indices `i (where 1 <= i < n)` satisfy the condition `arr[i - 1] == arr[i]`.
Return the number of good arrays that can be formed.

Since the answer may be very large, return it `modulo 109 + 7`.

## Examples
### Example 1
```json
    Input :n = 3, m = 2, k = 1
    Output: 4
```
Explain: In the array, it should choose element from [1,2]. And there should be 1(k) pair of adjacent elements has the same value. The length of the array is 3. They are 
`[1,1,2],[1,2,2],[2,2,1],[2,1,1]`

### Example 2
```json
Input: n = 4, m = 2, k = 2
Output: 6
```
Explanation:

The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1].
Hence, the answer is 6.

## Intuition
Emmmmmm, personally, it is impossible to enumerate all the possible arrays and check that they are 'good' or not. That makes time complexity blow up.(Btw, what is its complexity?) The best way to solve it is gorgeous ***math***. Nani? We are going to solve this question with some black magic!
In array of length `n`, there are `n-1` paris with adjacent element. Among `n-1` pairs, `k` pairs must consist equal adjacent element and remaining `n-1-k` pairs must consist different adjacent elements. We can treat these n−1−k differing adjacent as partitions or bars(the stick.. not drinking one), which divide the array into n−k contiguous segments(stars), where each segment contains identical values. Yes! That's is a altered combinatorial number question which most of Chinese senior high school student can tackle. If you are at sea pls click[Bars and Stars](http://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)).
1. Among the `n-1` positions between array elements, we choose `n−1−k` to place the partitions. This can be done in $\binom{n-1}{n-1-k} =\binom{n-1}{k}$ ways.  
2. The first segment can take any of the m values.
3. Every subsegment (there are `n−k−1` such subsegment) must differ from the previous's value, meaning each of them has `m−1` possible choices. Hence we have $(m-1)^{n-k-1}$.
Sweeeeet, now we got the number $(n-1) * m *((m-1)^{n-k-1})$ 

U R *highly* recommended to read [Binary Exponentiation](https://cp-algorithms.com/algebra/binary-exp.html) and [module-inverse](https://cp-algorithms.com/algebra/module-inverse.html) OR (there is a better Chinese version)[乘法逆元](https://cp-algorithms.com/algebra/module-inverse.html) before coding. Looking back, I’m thankful I wrestled with discrete math.
## COOOOOOOOOOOOOOOOOOOOOOOOOOding

```c++
const int MOD = 1e9 + 7;
const int MX = 1e5;

long long fact[MX];
long long inv_fact[MX];

class Solution {
    long long qpow(long long x, int n) {
        long long res = 1;
        while (n) {
            if (n & 1) {
                res = res * x % MOD;
            }
            x = x * x % MOD;
            n >>= 1;
        }
        return res;
    }
    long long comb(int n, int m) {
        return fact[n] * inv_fact[m] % MOD * inv_fact[n - m] % MOD;
    }
    void init() {
        if (fact[0]) {
            return;
        }
        fact[0] = 1;
        for (int i = 1; i < MX; i++) {
            fact[i] = fact[i - 1] * i % MOD;
        }

        inv_fact[MX - 1] = qpow(fact[MX - 1], MOD - 2);
        for (int i = MX - 1; i; i--) {
            inv_fact[i - 1] = inv_fact[i] * i % MOD;
        }
    }

public:
    int countGoodArrays(int n, int m, int k) {
        init();
        return comb(n - 1, k) * m % MOD * qpow(m - 1, n - k - 1) % MOD;
    }
};
```
If you are a python guy.... you can also...
```python
result = math.comb(n-1, k) * m * pow(m-1, n-k-1, MOD) % MOD
```
Now which is the best language in the world?