---
title: Leetcode2566. Maximum Difference by Remapping a Digit
tags:
  - string
categories: [巴别塔(babel-tower),算(hermes)]
---

## Problem
You are given an integer `num`. Bob will sneakily remap one of the `10` possible digits(`0` to `9`) to another digit.

Return the difference between the maximum and minimum value Bob can make by remap **exactly one** digit in `num`.

Bob can remap a digit to it self.(not change)

Resulting number after remapping can contain leading zeros.

## Intuition
Consider the number `11891`, Bob can remap `1` to `9` to obtain the max `99899`, and remap `1` to `0` to obtain the min `00890`.

Consider the number `99919`, Bob can remap `1` to `9` to obtain the max `99999`, and remap `9` to `0` to obtain the min `00010`.

Hence we can observe that remap the first non-9 digit to `9` to yield the max value. And replace the first digit to `0` to yield the min value.

## COOOOOOOOOOOOODING

```c++
class Solution{
    public:
        int minMaxDifference(int num){
            string s = to_string(num);
            int i = 0;
            while(s[i] == '9' && i < s.length()-1) i+=1;

            string max = s;
            for(char& ch:max) if(ch==s[i]) ch='9';
            
            string min = s;
            for(char& ch:min) if(ch==s[0]) ch='0';
            return stoi(max)-stoi(mn);
        }
}
```