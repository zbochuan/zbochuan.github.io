---
title: An taste to MIPS ISA
categories: [巴别塔(babel-tower),千机图(computer-architecture)]
---
## Mips interpretion
Here is a traditional loop in C
```C
while(save[i] == K)
  i+= 1;
```
Assume that i and k correspond to registers `$s3` and `$s5` and the base of the  array save is in `$s6`. What is the MIPS assembly code corresponding to this  C segment?
```mips
Loop: sll  $t1 $s3 2 
      add  $t1 $t1 $s6
      lw   $t0,0($t1)
      bne  $t0,$s5, Exit
      addi $s3,$s3, 1
      j    loop
Exit:
```

## Signed Versus Unsigned Comparison
Suppose register `$s0` has the binary number
$$ 1111\ 1111\ 1111\ 1111\ 1111\ 1111\  1111\  1111_{two}$$
and that register `$s1` has the binary number
$$ 0000\ 0000\ 0000\ 0000\ 0000\ 0000\  0000\  0001_{two}$$
where are the values pf registers `$t0` and `$t1` after these two instructions?
```mips
slt      $t0, $s0, $s1
sltu     $t1, $s0, $s1
```
The key spot of the question is `$s0` represents $-1_{ten}$ if it is a signed integer and $2^{32} - 1_{ten}$ if it is an unsigned integer. And the value in `$s1` represents $1_{ten}$ in either case.

## Jump opreation in MIPS
  | Instruction | Syntax | Address Source | Saves Return Address | Operation | Common Use |
|-------------|--------|----------------|---------------------|-----------|------------|
| **J** | `j target` | 26-bit immediate | No | PC = (PC+4)[31:28] \|\| target \|\| 00 | Unconditional jumps, loops |
| **JAL** | `jal target` | 26-bit immediate | Yes (in $ra) | $ra = PC + 4<br>PC = (PC+4)[31:28] \|\| target \|\| 00 | Function calls |
| **JR** | `jr $rs` | Register content | No | PC = $rs | Function returns, indirect jumps |

The jump register instruction jumps to the address stored in register `$ra` which is just what we want. Thus, the calling program, or *caller*, puts the parameter  values in `$a0–$a3` and uses `jal X` to jump to procedure X (sometimes named  the `callee`). The callee then performs the calculations, places the results in `$v0` and  `$v1`, and returns control to the caller using `jr $ra`.

## Using more registers
We may have such question, What if we have a procedure which require more than 4 arguments and 2 return value registers. This situation is an example in which we need to spill registers to memory.

Here we need to use a data structure called stack. A stack needs a pointer to the most recently allocated address in the stack  to show where the next procedure should place the registers to be spilled or where  old register values are found.By historical precedent, stacks “grow” from higher addresses to lower addresses.

Compiling a C Procedure That Doesn’t Call Another Procedure:
```C
int leaf_example(int g, int h, int i, int j) 
{  
  int f;  
  f = (g + h) – (i + j); 
  return f; 
}
```

```mips
addi $sp, $sp, –12 
sw $t1,8($sp) 
sw $t0,4($sp)  
sw $s0,0($sp) 

add $t0,$a0,$a1 
add $t1,$a2,$a3
sub $s0,$t0,$t1 

add $v0,$s0,$zero

lw $s0, 0($sp)
lw $t0, 4($sp) 
lw $t1, 8($sp)
addi $sp,$sp,12
jr $ra
```
### Decoding machine code 
What is the assembly language statement corresponding to this machine  instruction?  
`00af8020hex`

The first step in converting hexadecimal to binary is to find the op fields:
```
0    0    a    f    8    0    2    0  
0000 0000 1010 1111 0100 0000 0010 0000
```
op field is `000000` in op(31:26) rs is `00101` rt is `01111` rd is `10000` shamt is `00000` funct is `100000`

By look up table we can know it is 
`add $s0, $a1, $t7`


I. What is the range of addresses for conditional branches in MIPS (K = 1024)? 

1. Addresses between 0 and 64K # 1 
2. Addresses between 0 and 256K # 1 
3. Addresses up to about 32K before the branch to about 32K after 
4. Addresses up to about 128K before the branch to about 128K after

Conditional branches use I-type format
 16-bit immediate field for the branch offset
 The offset is signed 
 The offset represents the number of words to branch not bytes
 Hence it will be $2^{16}$ words, $2^{15}$ words, $2^{17}$ bytes ahead and  backward.
 which is 128KB ahead and backward.