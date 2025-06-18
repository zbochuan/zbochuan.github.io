---
title: Expections
categories: [巴别塔(babel-tower),码术苑(software-design-architecture)]
date: 2025-06-17
tags: 
    - OOP
---

An exception is an event, which occurs during the execution of a program, that disrupts the
normal flow of the program's instructions. When error occurs, an exception object is created and given to the runtime system, this is called **throw** an exception. The runtime system searches the call stack for a method that contains a block of code that can
handle the exception.
The exception handler chosen is said to **catch** the exception

## Types of Expections
- Checked Expection
    (IOException, SQLException, etc.)
- runtime Expection
    (ArraylndexOutOfBoundsExceptions, ArithmeticException, etc.)
- Error 
    (VirtualMachineError, OutOfMemoryError, etc.)
## Uncheck exceptions VS Checked exceptions
All classes that are subclasses of RuntimeException (typically caused by defects in your program's code) or Error (typically 'system' issues) are **unchecked exceptions**.

All classes that inherit from class Exception but not directly or indirectly from class.
**RuntimeException** are considered to be checked exceptions.

## User-defined Exception
A checked exception need to extend the Exception class, but not directly or indirectly from class RuntimeException. 

An unchecked exception (like a runtime exception) need to extend the RuntimeException class.
Normally we define a checked exception, by extending the Exception class. Like in the following code 
```java
class MyExpection extends Exception {
    public MyExpection(String message){
        super(message).
    }
}
```

[Java Expections](http://docs.oracle.com/javase/8/docs/api/java/lang/Exception.html)
