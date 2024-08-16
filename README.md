# Robot Arm Indepedent Study
Source code for my independent study project at Flintridge Preparatory School where I built and programmed a three degree-of-freedom scaled robotic arm that models the movements of a fencer’s arm.

## **Introduction**
*Shing!* My fencing sword slid along the dummy’s blade. It was great to practice against a stationary fencing dummy. However, I thought to myself, “it would be so much more helpful if it could move!” Thus, my “fencing robot” idea was born. This fencing robot would be an interactive dummy to help fencers train by themselves.
Fencers move their arms in different directions to parry (defend) and attack. For this independent study, I was interested in modeling a fencer’s arm using robotics. I hope to gain a deeper understanding of robotics in order to build and program the movements of a fencer’s arm. 

## **Overall Design Process & Main Features**
I used components from the HummingBird Technologies Kit with laser-cut parts to construct the robot arm. I coded the movements in Python on MakeCode, an online coding platform by Microsoft that was compatible with my mechanical components. This project culiminated in a presentation to ~25 students, faculty, and parents about the design process and a live demonstration of the robotic arm.

To build the arm, I laser-cut three links and used mechanical tools including the laser cutter, drill, and caliper to attach them to servos. Through this process, I learned the importance of careful planning since I frequently had to reattach many components.

In the coding process, I had to create separate "move" functions that performed interpolation so the arm could move in a smoother fashion.

To mimic a fencer's arm, I implemented inverse kinematics to generate trajectories for robot arm in Python. Inverse kinematics is the process of calculating the joint angles given the end effector's position, and I used a geometric method to calcualte this. I was able to test my code by measuring the robot's coordinates in real life using measuring sticks. Then, I coded and optimized an algorithm that determines the
closest coordinate the robot arm should reach when given an unreachable one, which improved the arm’s precision and reducing errors.

Using inverse kinematics along with parametric equations, my robot arm can perform a circle motion, resembling the move 'circle parry 6' in fencing, along with an extension.

At the end of the semester, I presented the design process and held a live demonstration to a group of faculty, students, and parents, which you can watch here.

## **Authors and Acknowledgment**

Robot Arm Independent Study was created by **[Natalie Leung](https://github.com/polarcow)**.

I would like to thank my adviser Mrs. Goodwin for 
