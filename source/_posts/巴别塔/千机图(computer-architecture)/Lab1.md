---
title: Accumulator of Bfloat16
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
---
In this lab we are required to build a hardware model for accumulation of a sequence of [Bfloat16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) values and implement it on the lab board.Here we assume all values are positive and no overflow will occur. Each input
Value is set by the switches and the accumulative result for each new input is displayed on the LED array.

Since we have a bottom to make operation **compute**, we may need a FSM. Intuitively, we will only need 2 state "idle & compute".