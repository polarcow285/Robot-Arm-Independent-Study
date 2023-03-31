let link1CurrPos = 0
let link2CurrPos = 180
let link3CurrPos = 0
// in centimeters
let link1 = 19.05
let link2 = 10.5
let link3 = 13.3
hummingbird.startHummingbird()
hummingbird.setPositionServo(FourPort.One, 0)
hummingbird.setPositionServo(FourPort.Two, 180)
hummingbird.setPositionServo(FourPort.Three, 0)
function on_forever() {
    moveTo(0, 0, 0)
    basic.pause(1000)
    moveTo(90, 0, 90)
    basic.pause(1000)
}

// basic.forever(on_forever)
inv_solve(23.8, 0, 19.05)
function moveTo(target1: number, target2: number, target3: number) {
    target2 = 180 - target2
    
    
    
    while (link1CurrPos != target1 || link2CurrPos != target2 || link3CurrPos != target3) {
        if (link1CurrPos > target1) {
            link1CurrPos -= 1
        } else if (link1CurrPos < target1) {
            link1CurrPos += 1
        }
        
        if (link2CurrPos > target2) {
            link2CurrPos -= 1
        } else if (link2CurrPos < target2) {
            link2CurrPos += 1
        }
        
        if (link3CurrPos > target3) {
            link3CurrPos -= 1
        } else if (link3CurrPos < target3) {
            link3CurrPos += 1
        }
        
        hummingbird.setPositionServo(FourPort.One, link1CurrPos)
        hummingbird.setPositionServo(FourPort.Two, link2CurrPos)
        hummingbird.setPositionServo(FourPort.Three, link3CurrPos)
        basic.pause(10)
    }
}

function inv_solve(x: number, y: number, z: number) {
    let AP = Math.sqrt(x ** 2 + y ** 2)
    let s = z - link1
    let theta3_1 = Math.acos((y ** 2 + x ** 2 + s ** 2 - link2 ** 2 - link3 ** 2) / (2 * link2 * link3))
    let theta3_2 = -theta3_1
    let theta2_1 = Math.atan2(s, AP) - Math.atan(link3 * Math.sin(theta3_1) / (link2 + link3 * Math.cos(theta3_1)))
    let theta2_2 = Math.atan2(s, AP) - Math.atan(link3 * Math.sin(theta3_2) / (link2 + link3 * Math.cos(theta3_2)))
    let theta2_3 = Math.atan2(s, -AP) - Math.atan(link3 * Math.sin(theta3_1) / (link2 + link3 * Math.cos(theta3_1)))
    let theta2_4 = Math.atan2(s, -AP) - Math.atan(link3 * Math.sin(theta3_2) / (link2 + link3 * Math.cos(theta3_2)))
    let theta1_1 = Math.atan2(y, x)
    let theta1_2 = theta1_1 + Math.PI
    // convert to degrees
    theta1_1 = theta1_1 * (180 / Math.PI)
    theta1_2 = theta1_2 * (180 / Math.PI)
    theta3_1 = theta3_1 * (180 / Math.PI)
    theta3_2 = theta3_2 * (180 / Math.PI)
    theta2_1 = theta2_1 * (180 / Math.PI)
    theta2_2 = theta2_2 * (180 / Math.PI)
    theta2_3 = theta2_3 * (180 / Math.PI)
    theta2_4 = theta2_4 * (180 / Math.PI)
    theta1_1 = Math.round(theta1_1)
    theta1_2 = Math.round(theta1_2)
    theta2_1 = Math.round(theta2_1)
    theta2_2 = Math.round(theta2_2)
    theta2_3 = Math.round(theta2_3)
    theta2_4 = Math.round(theta2_4)
    theta3_1 = Math.round(theta3_1)
    theta3_2 = Math.round(theta3_2)
    let set1 = [theta1_1, theta2_1, theta3_1]
    let set2 = [theta1_1, theta2_2, theta3_2]
    let set3 = [theta1_2, theta2_3, theta3_1]
    let set4 = [theta1_2, theta2_4, theta3_2]
    let p = [set1, set2, set3, set4]
    let res = []
    let isValid = true
    for (let _set of p) {
        serial.writeValue("theta1", _set[0])
        serial.writeValue("theta2", _set[1])
        serial.writeValue("theta3", _set[2])
    }
    /** 
    for _set in p:
        for theta in _set:
            if(theta > 180 or theta < 0):
                isValid = False;
                break
        if(isValid = True):
    
 */
}

