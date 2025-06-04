---
title: Single Cycle Processor
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
---

## typical steps of processor design
  ### For datapath
  1. Analyse instruction set to determine the datapath requirements

  2. Select a set of hardware components for the datapath and establish clocking methodology

  3. Assemble datapath to meet the requirements
  ### For control
  4. Analyse implementation of each instruction to determine control points/signals on the datapath

  5. Assemble the control logic
### step 1 
  For each instruction, its requirement can be identified as a set of transfer operation.

  Register lever language(*RTL*) is used to  describe the instruction execution.eg. 

  ```mips
    $3 <-- $2 + $1 is for ADDU $3 $2 $1
  ```

Datapath mush support each transfer operation.

 All instruction start by fetching instruction. 

 THen followed by different operation 
All instruction should be followed with a 
```mips
PC <- PC + 4
```
eg
```mips
BEQ 
If (R[rs] == R[rt]) then PC <- PC +4 + sign_ext(Imm16) || 00 else  PC <- PC + 4
```

### step 2
  For combinational logical elements, we need adder, MUX, ALU obviously and 

  For storage  we need some registers (which is 32-bit input and output, and Write enable input) and memory(which is have 32 bit data in and 32 bit date out)
  
  For simple and robust, we use Edge triggered clocking, all storage elements are usually clocked by the same clock edge.

  We have 3 time issues need to be considered. Clock skew, setup time, hold time.
  
  2 requirement 
  $\text{cycle time} >= \text{clk to Q} + \text{longest delay path} + \text{setup} + |\text{clk skew}|$
  $\text{clk to Q} + \text{shortest delay path} - \text{clock skew} > |\text{hold time}|$

### step 3
  Put the selected components together
### step 4
  instruction encoding defines how instruction and their argument are represented as binary values - machine instructions. 
  