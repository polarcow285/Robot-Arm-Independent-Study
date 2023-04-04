link1CurrPos = 0
link2CurrPos = 180
link3CurrPos = 0
#in centimeters
link1 = 19
link2 = 10.5
link3 = 13

hummingbird.start_hummingbird()
hummingbird.set_position_servo(FourPort.ONE, 0)
hummingbird.set_position_servo(FourPort.TWO, 180)
hummingbird.set_position_servo(FourPort.THREE, 0)

def on_forever():
    
    moveTo(0, 0, 0)
    basic.pause(1000)
    moveTo(90, 0, 90)
    basic.pause(1000)
#basic.forever(on_forever)
#thetas = inv_solve(23.5, 0, 19)
#thetas = inv_solve(21.5, 0, 19)
moveToPos(15, 0 , 12)
serial.write_line("done")
#thetas = inv_solve(15, 0, 12)
#moveTo(thetas[0][0], thetas[0][1], thetas[0][2])

def moveTo(target1, target2, target3):
    target2 = 180-target2
    global link1CurrPos
    global link2CurrPos
    global link3CurrPos
    while(link1CurrPos != target1 or link2CurrPos != target2 or link3CurrPos != target3):
        if(link1CurrPos > target1):
            link1CurrPos -= 1
        elif(link1CurrPos < target1):
            link1CurrPos += 1
        if(link2CurrPos > target2):
            link2CurrPos -= 1
        elif(link2CurrPos < target2):
            link2CurrPos += 1
        if(link3CurrPos > target3):
            link3CurrPos -= 1
        elif(link3CurrPos < target3):
            link3CurrPos += 1
        hummingbird.set_position_servo(FourPort.ONE, link1CurrPos)
        hummingbird.set_position_servo(FourPort.TWO, link2CurrPos)
        hummingbird.set_position_servo(FourPort.THREE, link3CurrPos)
        basic.pause(10)
def moveToPos(x, y, z):
    thetas = inv_solve(x,y,z)
    tolerance = 12
    #serial.write_value(len)
    if(len(thetas)==0):
        serial.write_line("inside while loop")
        for a in range(tolerance+1):
            for b in range(tolerance+1):
                for c in range(tolerance+1):
                    serial.write_line("doing inv_solve")
                    thetas = inv_solve(x+a,y+b,z+c)
                    thetas = inv_solve(x-a,y-b,z-c)
    return thetas[0]        

def inv_solve(x, y, z):
    AP = Math.sqrt(x**2 + y**2)
    s = z - link1
    
    theta3_1 = Math.acos((y**2 + x**2 + s**2 - link2**2 - link3**2)/(2 * link2 * link3))
    theta3_2 = -theta3_1

    
    theta2_1 = Math.atan2(s,AP) - Math.atan((link3 * Math.sin(theta3_1))/(link2 + link3 * Math.cos(theta3_1)))
    theta2_2 = Math.atan2(s,AP) - Math.atan((link3 * Math.sin(theta3_2))/(link2 + link3 * Math.cos(theta3_2)))
    theta2_3 = Math.atan2(s,-AP) - Math.atan((link3 * Math.sin(theta3_1))/(link2 + link3 * Math.cos(theta3_1)))
    theta2_4 = Math.atan2(s,-AP) - Math.atan((link3 * Math.sin(theta3_2))/(link2 + link3 * Math.cos(theta3_2)))
    
    theta1_1 = Math.atan2(y,x)
    theta1_2 = theta1_1 + Math.PI

    #convert to degrees
    """
    theta1_1 = theta1_1 * (180/Math.PI)
    theta1_2 = theta1_2 * (180/Math.PI)

    theta3_1 = theta3_1 * (180/Math.PI)
    theta3_2 = theta3_2 * (180/Math.PI)
    
    theta2_1 = theta2_1 * (180/Math.PI)
    theta2_2 = theta2_2 * (180/Math.PI)
    theta2_3 = theta2_3 * (180/Math.PI)
    theta2_4 = theta2_4 * (180/Math.PI)
    """
    theta1_1 = convertToDegrees(theta1_1)
    theta1_2 = convertToDegrees(theta1_2)
    
    theta2_1 = convertToDegrees(theta2_1)
    theta2_2 = convertToDegrees(theta2_2)
    theta2_3 = convertToDegrees(theta2_3)
    theta2_4 = convertToDegrees(theta2_4)
    
    theta3_1 = convertToDegrees(theta3_1)
    theta3_2 = convertToDegrees(theta3_2)
    
    set1 = (theta1_1, theta2_1, theta3_1)
    set2 = (theta1_1, theta2_2, theta3_2)
    set3 = (theta1_2, theta2_3, theta3_1)
    set4 = (theta1_2, theta2_4, theta3_2)
    
    p = [set1, set2, set3, set4]
    res = []
    
    """
    for _set in p:
        serial.write_value("theta1", _set[0])
        serial.write_value("theta2", _set[1])
        serial.write_value("theta3", _set[2])
    """
    
    for _set in p:       
        isValid = True;
        for theta in _set:          
            if(theta > 180 or theta < 0):           
                isValid = False;
                break
        if(isValid == True):
            res.append(_set)
    if(len(res) == 0):
        serial.write_line("no values work :(")
    else:
        for _s in res:
            serial.write_value("theta1", _s[0])
            serial.write_value("theta2", _s[1])
            serial.write_value("theta3", _s[2])
    
    return res;
def convertToDegrees(theta):
    #checking for nan, nan is not equal to itself
    if(theta != theta):
        return Math.round(theta * (180/Math.PI))
    else:
        #print("Error: cannot perform operation with NaN value.")
        #returns -1 because later we get rid of sets that have negative thetas
        return -1    