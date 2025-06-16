---
title: Leetcode2016 Maximum Difference Between Increasing Elements
tags:
  - array
date: 2025-06-15
categories: [巴别塔(babel-tower),算(hermes)]
---

## Problem 
Given a 0-indexed integer array `nums` of size `n`, find the maximum difference between `nums[i]` and `nums[j]` (i.e., `nums[j] - nums[i]`), such that `0 <= i < j < n` and `nums[i] < nums[j]`.

Return the maximum difference. If no such i and j exists, return -1.

## Intuition
The brute solution is easy. We can have 2 pointers do iteration which would result in a time complexity of $O(n^2)$.

That's so dumb... Can we have a better solution?

Consider how max difference come from? Now we have are in `num[i]`. The max diff show be updated  to `num[i]- min(num[0], num[i-1])` if `prefix_res < res`. Nice! we may keep the track of min value in previous data.

In each iteration, if `num[i] < min(num[0], num[i-1])` then we update the minValue else we can update `res = max(res, num[i] - minValue)`. Sweeeeeet! We optimize it to $O(n)$.
## Cooooooooding

```c++
class Solution {
public:
    int maximumDifference(vector<int>& nums) {
        int res = -1;
        int min = nums[0];
        for(int i = 1; i < num.size(); i++){
            if(nums[i] <= min){
                min = nums[i]
            }
            else{
                res = max(nums[i] - min, res);
            }
        }
        return res;      
    }
};

```

