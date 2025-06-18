---
title: Pipeline processor
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
date: 2025-06-17
---

## What is pipeline?
Pipelining attempts to keep every part of the processor busy with some instruction by dividing incoming instructions into a series of sequential steps (the eponymous "pipeline") performed by different processor units with different parts of instructions processed in parallel.

## MIPS is Designed for Pipeline
- ALl instruction is 32-bit
    It means that easier to fetch instruction
- Only 3 types of instruction format 
    Decode and read registers in one step
- Load/store(or reg-reg) architecture
    Can calculate address in an early stage, access memory in a late stage?
- Alignment of memory operands

## 5 stages

1. IF: Instruction Fetch
2. ID: Instruction decode & registers read
3. EX: Execute operation ro calculate address 
4. MEM: access memory
5. WB: write back to registers 

![5 stages](/images/stages_show.png)

## General Idea
Partition the single cycle datapath into sections.  Each section forms a pipeline stage

Try to make data flow in the same direction(main on write back and pc update operation)

## registers
The registers inserted between the pipeline stages are called pipeline stage register, or simply pipeline register

Each pipeline register is named after the two stages separated by that register

All instructions advance from one stage to the next stage in one clock cycle.

## Datapath Design 
![Pipeline Processor datapath](/images/pipeline_processor_datapath.png)
Why **Write register** signal is changed? Yes, if we stick on previous design, the signal represent the register which should be written in next a few(3 exactly) instructions.(Remember, now the all the component is working in parallel)

## Control Unit

Pipeline is used in dataPath design. Then in each stage, control unit should output it corresponding signal. A smart design is that control units output all the required signal in  ID stage and save all of them to stage register. In each stage, data path get required signal Hierarchically.
![pipelined control unit](/images/piplined_control.png)