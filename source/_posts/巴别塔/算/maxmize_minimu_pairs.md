---
title: Leetcode 2616. Minimize the maximum difference of pairs
categories: [巴别塔(babel-tower),算(hermes)]
---

## Approach: binary + greedy
Intuitively, we do a sort for this array.

Since we are looking to minimize the maximum difference, one brute force approach is to start from a threshold (a maximum difference) of '0' and incrementally try all possible thresholds
1. Try to find 'p' pairs with difference of '0' 
2. if not possible then we try to find 'p' pairs with difference of '1'
3. and so on,  until we find a threshold that succeeds.

As you may notice, this will cost a linear time for each threshold. Do we have a better solution?
We observe that
- If we can find p pairs with threshold of x, then we can definitely find p pairs of  with a threshold of x+1
- If we can **NOT** find p pairs with threshold of x, we definitely can not find p pairs with threshold of x-1

This splits the number line into two sections: one section where the task is possible, and one where the task is impossible. Therefore, we can use binary search to quickly narrow down the search space until we find the dividing point, which is the minimum threshold.

Now we go to next question, how do we determine if there exist  at least p valid pairs.

How about greedy? We do iteration to nums[]. check each `abs(nums[i] - nums[i+1]) <= 'threshold`, if is true then simply check num[i+2] and num[i+3].


But I will question myself. Does greedy solution will fail and another solution will succeeds? 

1. **Suppose** greedy fails but some better strategy succeeds
2. **Then** at first difference, greedy pairs `(nums[i], num[i+1])` but optimal way dosen't
3. **In the potimal solution**, `num[i]` either:
 - pairs with `num[j]` where `j > i+1` then difference must greater or equal to nums[i+1] -nums[i] (worse!)
 - unpaired (worse, cuz we lost a pair)
`
4. We can always "exchange" the optimal pairing to use `(nums[i], nums[i+1])` instead
5. **Same or better solution**, contradicting that optimal was better

OK now The greedy approach will always yield the maximum number of valid pairs.

## Let's do COOOOOOOOOOOOODING
1.  Define `countValidPairs(threshold)` to find the number of pairs having a threshold of threshold in nums. Let `n` be the size of `nums`.
- set count = 0
- Iterate over `nums` from `index = 0`to `index = n - 2`. If `nums[index + 1] - nums[index] <= threshold`, increment `count` by `1`, and skip both indices. Otherwise, skip the current index.
- Return `count`
2. sort `nums`
3. Initialize the searching space as left = 0 and right = nums[n -1]  - nums[0], the max difference in the array.
4. while `left < right` , we do
5. Get the middle value as mid = left + (right - left)/2
6. invoke `countValidPairs(mid)`
7. if `countValidPairs(mid)`, continue with the left half by setting(right = mid). Otherwise, continue with the right half by setting `left = mid -1`Repeat step 4  
8. Return left
```cpp
class Solution {
public:
    // Find the number of valid pairs by greedy approach
    int countValidPairs(vector<int>& nums, int threshold) {
        int index = 0, count = 0;
        while (index < nums.size() - 1) {
            // If a valid pair is found, skip both numbers.
            if (nums[index + 1] - nums[index] <= threshold) {
                count++;
                index++;
            }
            index++;
        }
        return count;
    }

    int minimizeMax(vector<int>& nums, int p) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int left = 0, right = nums[n - 1] - nums[0];

        while (left < right) {
            int mid = left + (right - left) / 2;

            // If there are enough pairs, look for a smaller threshold.
            // Otherwise, look for a larger threshold.
            if (countValidPairs(nums, mid) >= p) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
};
```