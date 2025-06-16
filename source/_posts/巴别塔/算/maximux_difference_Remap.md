---
title: Leetcode1431. Max Difference You Can Get From Changing an Integer
tags:
  - string
date: 2025-06-15
categories: [巴别塔(babel-tower),算(hermes)]
---
## Problem
You are given an integer `num`. Bob will sneakily remap one of the `10` possible digits(`0` to `9`) to another digit.

Return the difference between the maximum and minimum value Bob can make by remap **exactly one** digit in `num`.

Bob can remap a digit to it self.(not change)

Resulting number after remapping can **not** contain leading zeros.
## Intuition
This problem is like to Leetcode2567, Yes...exactly the daily question in Leetcode yesterday. The only difference is that we canNOT have leading zeros today.
We need to consider how to get the minimum value. Is that replacing all first digit to 1? Apparently not, `11111` the min value should be `10000`.

Can we do the same thing in the way of finding the max value? Replace the first non-1 digit to 0? No.... which breaks the rule no leading zero..

Then maybe if the first digit is not `1`, we replace it to `1`. And for non-first digit, we change it to 0. 

## COOOOOOOOOOOOODING
```c++
class Solution{
    public:
        int maxDIff(int num){
            string s = to_string(num);
            int index_max = -1;
            int index_max = -1;

            for(int i = 0; i <s.length(); i++){
                if(s[i] != '9' && index_max == -1){
                    index_max = i;
                }
                if(index_min == -1){
                    if(i == 0 && s[i] != '1') {
                        index_min = i;
                    }
                    else if(i > 0 && s[i] != '0' && s[i] != s[0]) {
                        index_min = i;
                    }
                }
            }
        string s_max = s;
        if(index_max != -1) {
            for(char& ch : s_max) {
                if(ch == s[index_max]) ch = '9';
            }
        }
        
        string s_min = s;
        if(index_min != -1) {
            char replacement = (index_min == 0) ? '1' : '0';
            for(char& ch : s_min) {
                if(ch == s[index_min]) ch = replacement;
            }
        }
        
        int max_val = stoi(s_max);
        int min_val = stoi(s_min);
        return max_val - min_val;
    }
}
```


