---
title: Performance
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
---

## Common Performance Metrics
- Latency: response time, execution time, elapsed time

- Throughout: Amount work per unit time
Ideally, for good Performance we want is  Latency minimized ad Throughout maximized

## CPU time
CPU time is CPU spends on executing a program.
cpu time is comprised of three components
$$
\text{CPU time} = \frac{\text{number of instructions}}{\text{program}} \times \frac{\text{cycles}}{\text{instructions}} \times \frac{\text{seconds}}{\text{cycle}}
$$
- instruction count = instructions/ program
- CPI = average Cycles/ instruction
- clock period(clock frequent = 1/ clock period)

## Amdahl's law

Suppose that enhancement (E) accelerates a  fraction (F) of a task by a factor (S) and the  remainder of the task is unaffected

$$
\text{over all speedup} = \frac{1}{1-F + \frac{F}{S}}
$$