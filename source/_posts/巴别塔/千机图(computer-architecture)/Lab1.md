---
title: accumulator of bfloat16
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
---
In this lab we are required to build a hardware model for accumulation of a sequence of [Bfloat16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) values and implement it on the lab board.Here we assume all values are positive and no overflow will occur. Each input
Value is set by the switches and the accumulative result for each new input is displayed on the LED array.

Since we have a bottom to make operation **compute**, we may need a FSM. Intuitively, we will only need 2 state "idle & compute".

## Accumulator
In order to make accumulation for 2 Bfloat16 number we have the following number.
We have the following steps.
1. Extract Component
        Extract the current number to 2 field: Exponent & Fraction.(Since no need for sign bits since all positive) 
        ```VHDL
        exp_a <= a(14 downto 7);
        frac_a <= a(6 downto 0);
        ```
        If Exponent part is 0, then this number is 0;

        ```VHDL
        a_is_Zero <= '1' when unsigned(exp_a) = 0 else '0';
        ```
2. 
        Align Frac Field

4. third


