---
title: Leetcode 3423. MAX diff between adjacent Elements in a Circular Arrar
categories: [巴别塔(babel-tower),算(hermes)]
tags: - array
---
**Question**:Given a circular array nums, find the maximum absolute difference between adjacent elements.

**Note**: In a circular array, the first and last elements are adjacent.

Easy question directly answer
```cpp
class Solution{
public:
        int maxAdjacentDistance(Vector<int>& nums){
                int n = num.size();
                int res = abs(nums[0] - nums[n-1]);
                for(int i = 0; i <n-1; i++){
                        res = max(res, abs(nums[i] - nums[i+1]));
                }
                return res;
        }
}
```