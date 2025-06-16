---
title: Leetcode 440. K-th Smallest in Lexographical order
categories: [巴别塔(babel-tower),算(hermes)]

tags:
    - tries
---
# Problem
Give integers **n** and  **k**, list all numbers from 1 **n** in directory order, then return $k^{th}$ number in that list.

# Logic 
 Intuitively, we can generate all numbers $[1..n]$, convert to string, sort, resulting to an $O(O log n)$.
Brutely, we can have the following code. 
``` cpp
class Solution {
public:
    int findKthNumber(int n, int k) {
        vector<string> nums;
        
        for (int i = 1; i <= n; i++) {
            nums.push_back(to_string(i));
        }
        
        sort(nums.begin(), nums.end());

        return stoi(nums[k - 1]);
    }
};
```
No surprise, **Time Limit Exceeded**.

The directory sequence corresponds to a 10-ary prefix tree of numbers. Each node `x` has children `x0, x1,...,x9`(of course if it still <=n ).

We can count how many nodes are in each subtree and skip entire subtree when their size < k. 
we can have following solution.
```cpp
class Solution {
public:
    int findKthNumber(int n, int k) {
        int curr = 1;
        k--;// 0-indexed

        while(k > 0){
                int steps = countSteps(n, curr, curr + 1);
                if(steps <= k){
                //skip this subtree, go to next sibling
                        curr++;
                        k -= steps;
                }
                else{
                //answer is in this subtree let's go deeper
                        curr *= 10;
                        k--;
                }
        }
        return curr;
    }
};
```
countStep will calculate how many numbers exist with a prefix between 'curr' and 'next', and it should be <=n.

```cpp
static long countSteps(long long curr, long long next, long n){
      int steps = 0;
        while (curr <= n) {
            steps += min((long long)n + 1, next) - curr;
            curr *= 10;
            next *= 10;
        }
        return steps;
}
```