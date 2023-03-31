link1CurrPos = 0
link2CurrPos = 180
link3CurrPos = 0
#in centimeters
link1 = 19.05
link2 = 10.5
link3 = 13.3

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
inv_solve(23.8, 0, 19.05)

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
    theta1_1 = theta1_1 * (180/Math.PI)
    theta1_2 = theta1_2 * (180/Math.PI)

    theta3_1 = theta3_1 * (180/Math.PI)
    theta3_2 = theta3_2 * (180/Math.PI)

    theta2_1 = theta2_1 * (180/Math.PI)
    theta2_2 = theta2_2 * (180/Math.PI)
    theta2_3 = theta2_3 * (180/Math.PI)
    theta2_4 = theta2_4 * (180/Math.PI)

    theta1_1 = Math.round(theta1_1)
    theta1_2 = Math.round(theta1_2)

    theta2_1 = Math.round(theta2_1)
    theta2_2 = Math.round(theta2_2)
    theta2_3 = Math.round(theta2_3)
    theta2_4 = Math.round(theta2_4)

    theta3_1 = Math.round(theta3_1)
    theta3_2 = Math.round(theta3_2)
    set1 = (theta1_1, theta2_1, theta3_1)
    set2 = (theta1_1, theta2_2, theta3_2)
    set3 = (theta1_2, theta2_3, theta3_1)
    set4 = (theta1_2, theta2_4, theta3_2)
    
    p = [set1, set2, set3, set4]
    res = []
    isValid = True;
    for _set in p:
        serial.write_value("theta1", _set[0])
        serial.write_value("theta2", _set[1])
        serial.write_value("theta3", _set[2])
    """
    for _set in p:
        for theta in _set:
            if(theta > 180 or theta < 0):
                isValid = False;
                break
        if(isValid = True):
    """
    