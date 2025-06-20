---
title: Leetcode 3443, Max Manhattan distance after change K dirctions
categories: [巴别塔(babel-tower),算(hermes)]
date: 2025-06-20
tags: 
    - math
---

## Problem
You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where `s[i]` indicates movements in an infinite grid:

'N' : Move north by 1 unit.
'S' : Move south by 1 unit.
'E' : Move east by 1 unit.
'W' : Move west by 1 unit.
Initially, you are at the origin `(0, 0)`. You can change at most `k` characters to any of the four directions.

Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.

The Manhattan Distance between two cells `(xi, yi)` and `(xj, yj)` is `|xi - xj| + |yi - yj|`.

## Examples
### Example 1
```console
Input: s = "NWSE", k = 1

Output: 3

Explanation:

Change `s[2]` from 'S' to 'N'. The string s becomes "NWNE".
```
### Example 2
```console
Input: s = "NSWWEW", k = 3

Output: 6

Explanation:
Change `s[1]` from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".
```

## Intuition
Intuitively, that is a easy question. what we should do is made modification on the direction which appear less. 

After that we can handle the vertical direction(of course you can do horizontal one first if you want to ). Flipping the direction which has more occurrences leads to an immediate increment of 2. If the number of occurrences is less than `k`, we can will keep the chance to made modification on horizontal direction.

## COOOOOOOOOOOOODING
```c++
class Solution {
public:
    int maxDistance(string s, int k) {
        int ans = 0;
        int north = 0, south = 0, east = 0,west = 0;        
        for(char direction: s){
            switch(direction){
                case "N"
                    north++;
                    break;

                case "S"
                    south++;
                break;

                case "E"
                    east++;
                break;

                case "E"
                    west++;
                break;
            }
        int vertical = min({north,south,k});
        int hori = min({east,west, k-times1});
        ans = max(ans, cal(north, south, vertical) + cal(east, west, hori));
        }
    return ans;
    }
    int cal(int dir1, int dirt2, int times){
        return abs(dir1 - dir2) + 2*times
    }
};
```

