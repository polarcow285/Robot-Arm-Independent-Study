let link1CurrPos = 0
let link2CurrPos = 180
let link3CurrPos = 0
// in centimeters
let link1 = 19
let link2 = 10.5
let link3 = 13
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
// thetas = inv_solve(23.5, 0, 19)
// thetas = inv_solve(21.5, 0, 19)
let can = []
// x max: 23.5
// y max: 23.5
// z max: 19
// can = findPoint(15, 15, 17)
// can = moveToPos(23.5, 0, 19)
// serial.write_numbers(can)
findPoint(15, 15, 17)
// for cand in can:
// serial.write_numbers(cand)
// serial.write_line("done")
// thetas = inv_solve(15, 0, 12)
// moveTo(thetas[0][0], thetas[0][1], thetas[0][2])
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

function findPoint(x: number, y: number, z: number) {
    let thetas: any[];
    let nearestPoint: number;
    let x_candPoints = []
    let y_candPoints = []
    let z_candPoints = []
    let result = inv_solve(x, y, z)
    let tolerance = 10
    // serial.write_value(len)
    if (result.length == 0) {
        serial.writeLine("need to find candidate points")
        for (let a = 0; a < tolerance; a++) {
            for (let b = 0; b < tolerance; b++) {
                for (let c = 0; c < tolerance; c++) {
                    serial.writeLine("doing inv_solve for candidates")
                    thetas = inv_solve(x + a, y + b, z + c)
                    if (thetas.length != 0) {
                        serial.writeLine("found a candidate point!")
                        x_candPoints.push(x + a)
                        y_candPoints.push(y + b)
                        z_candPoints.push(z + c)
                    }
                    
                    // thetas = inv_solve(x-a,y-b,z-c)
                    /** 
                    if(len(thetas) != 0):
                        serial.write_line("found a candidate point!")
                        for n in thetas:
                            candidate_points.append([x-a,y-b,z-c])
                    
 */
                }
            }
        }
        nearestPoint = find_nearest_points([x, y, z], x_candPoints, y_candPoints, z_candPoints)
    }
    
    /** 
    else:
        serial.write_line("no need to find candidate points")
        return result[0]
    
 */
}

function find_nearest_points(point: any, x_points: number[], y_points: any, z_points: any): number {
    let nearest_point = null
    let min_distance = 100
    let xP = [0, 9, 8, 7]
    serial.writeNumbers(x_points)
    // serial.write_numbers(y_points)
    // serial.write_numbers(z_points)
    let count = 0
    serial.writeNumber(count)
    for (let a of x_points) {
        serial.writeNumber(a)
        serial.writeNumber(count)
        serial.writeNumber(222222)
        // serial.write_line("lsndfaksnfsadkjfans")
        count += 1
    }
    // leng = len(xP)
    // length = len(x_points)
    // listC = cand_points[0]
    // serial.write_number(listC[0])
    for (let i = 0; i < 5; i++) {
        // serial.write_numbers(p)
        // distance = Math.sqrt((point[0]-p[0])**2 + (point[1]-p[1])**2 + (point[2]-p[2])**2)
        /** 
        if(distance < min_distance):
            nearest_point = p
            min_distance = distance
        
 */
    }
    return min_distance
}

function inv_solve(x: number, y: number, z: number): any[] {
    let isValid: boolean;
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
    theta1_1 = convertToDegrees(theta1_1)
    theta1_2 = convertToDegrees(theta1_2)
    theta2_1 = convertToDegrees(theta2_1)
    theta2_2 = convertToDegrees(theta2_2)
    theta2_3 = convertToDegrees(theta2_3)
    theta2_4 = convertToDegrees(theta2_4)
    theta3_1 = convertToDegrees(theta3_1)
    theta3_2 = convertToDegrees(theta3_2)
    let set1 = [theta1_1, theta2_1, theta3_1]
    let set2 = [theta1_1, theta2_2, theta3_2]
    let set3 = [theta1_2, theta2_3, theta3_1]
    let set4 = [theta1_2, theta2_4, theta3_2]
    let p = [set1, set2, set3, set4]
    let res = []
    /** 
    for _set in p:
        serial.write_value("theta1", _set[0])
        serial.write_value("theta2", _set[1])
        serial.write_value("theta3", _set[2])
    
 */
    for (let _set of p) {
        isValid = true
        for (let theta of _set) {
            if (theta > 180 || theta < 0) {
                isValid = false
                break
            }
            
        }
        if (isValid == true) {
            res.push(_set)
        }
        
    }
    if (res.length == 0) {
        serial.writeLine("no values work :(")
    } else {
        serial.writeLine("there is a possible configuration!")
    }
    
    return res
}

function convertToDegrees(theta: number): number {
    // checking for nan, nan is not equal to itself
    if (theta == theta) {
        return Math.round(theta * (180 / Math.PI))
    } else {
        // print("Error: cannot perform operation with NaN value.")
        // returns -1 because later we get rid of sets that have negative thetas
        return -1
    }
    
}

