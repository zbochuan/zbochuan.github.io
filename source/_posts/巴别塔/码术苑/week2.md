---
title: Inheritance & Abstract Classes &  Polymorphism
categories: [巴别塔(babel-tower),码术苑(software-design-architecture)]
date: 2025-06-13
---
## Super classes, Object, and Class Hierarchy


- Every class have a superclass
- If we don't define the superclass, by default, it will be the class Object
### **Object** class

- It is the only class that does not have a superclass

Often we need to **override** the following methods

- toString()
- equals()
- hasCode()

## Abstract classes
Using Abstract classes, we can declare classes that define ONLY part of implementation, leaving extended classes to provide specific implementation of some or all the methods

One good example will be
```java
public abstract class Shape {

	public abstract double area();

	public abstract double circumference();

	protected static int count_shapes = 0;

	public void printArea() {
		System.out.println(" (from Shape abstract class, method printArea)> area is: " + this.area());
	}

}

public class Rectangle extends Shape {
	protected double width, height;

	public Rectangle() {
		width = 1.0;
		height = 1.0;
		count_shapes++;
	}

	public Rectangle(double w, double h) {
		this.width = w;
		this.height = h;
		count_shapes++;
	}

	public double area() {
		return width * height;
	}

	public double circumference() {
		return 2 * (width + height);
	}

}
```
We can also invoke`shapes[].area()`. Java will automatically use the implementation.

## Interfaces in JAVA

All the methods defined within an interface are **implicitly abstract**, which means that the class/abstract class **MUST** have implementation for all of its method.


