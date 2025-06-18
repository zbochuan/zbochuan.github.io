---
title: Leetcode 2966 Divied array to Arrays  with max difference
categories: [巴别塔(babel-tower),算(hermes)]
date: 2025-06-18
tags: 
    - greedy
    - array
---

## Problem 
You are given an integer array `nums` of size `n` where `n` is a multiple of `3` and a positive integer `k`.

Divide the array `nums` into `n / 3` arrays of size `3` satisfying the following condition:

The difference between any two elements in one array is less than or equal to `k`.
Return a 2D array containing the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return any of them.

## Intuition
That's this a easy version of [Leetcode2616](https://bochuan.site/2025/06/13/%E5%B7%B4%E5%88%AB%E5%A1%94/%E7%AE%97/maxmize_minimu_pairs/). We can sort the array first and keep the track of  an 'Window' which contains 3 adjacent elements. If `nums[i+2] - nums[i]` is greater than `k`, we can just return an empty array. Since we always get the minimum difference, if current array do **not** satisfy the threshold, it's impossible to exist a another *optimal* solution.

## COOOOOOOOOOOOODING
```c++
class Solution {
public:
    vector<vector<int>> divideArray(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        for (int i = 0; i < nums.size(); i += 3) {
            if (nums[i + 2] - nums[i] > k) {
                return {};
            }
            ans.push_back({nums[i], nums[i + 1], nums[i + 2]});
        }
        return ans;
    }
};
```