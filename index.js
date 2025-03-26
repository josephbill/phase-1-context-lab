// 1. createRecordEmployee : receive an array of info about an employee
// 2. return an object with the details of that employee 
// 3.
// createEmployeeRecord 
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// createEmployeeRecords 
let createEmployeeRecords = function(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

// create time in event 
let createTimeInEvent = function(datestamp){
    let [date, hour] = datestamp.split(' ') // split 
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    }); 
    return this 
}

// create time out event 
let createTimeOutEvent = function(datestamp){
    let [date, hour] = datestamp.split(' ') // split 
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date: date
    }); 
    return this 
}
// hours worked 
let hoursWorkedOnDate = function(datestamp){
     let inEvent = this.timeInEvents.find(e => e.date === datestamp)
     let outEvent = this.timeOutEvents.find(e => e.date === datestamp)

     return (outEvent.hour - inEvent.hour) / 100 
}
let emp = createEmployeeRecord(["joseph","mbugua","software dev",800])
createTimeInEvent.call(emp, "2025-03-25 0900")
createTimeOutEvent.call(emp,"2025-03-25 2100")
console.log(hoursWorkedOnDate.call(emp, "2025-03-25"))
console.log(emp)

//wagesEarnedOnDate
let wagesEarnedOnDate = function(datestamp){
    let rawWage = hoursWorkedOnDate.call(this, datestamp) * this.payPerHour
    return parseFloat(rawWage.toString());
}
console.log(wagesEarnedOnDate.call(emp,"2025-03-25"))

 const allWagesFor = function () {
    // getting an array of all worked dates for the employee
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    // reduce is used to sum up the wages for each date 
    const payable = eligibleDates.reduce(function (memo, d) {
        console.log(memo, d)
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// 
let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(rec => rec.firstName === firstName)
}

//calculatePayroll
let calculatePayroll = function(arrayEmp){
     return arrayEmp.reduce((memo,rec) =>{
        return memo + allWagesFor.call(rec)
     }, 0)
}

