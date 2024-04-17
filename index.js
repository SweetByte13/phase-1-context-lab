function createEmployeeRecord (recordArr) {
    return {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents:[],
        timeOutEvents: []
    }
};

function createEmployeeRecords (arrOfArr) {
    return arrOfArr.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp) {

    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);
    const fullDate = `${date} ${hour.toString().padStart(2,"0")}:00`;

    this.timeInEvents.push({
        type: "TimeIn",
        hour,
        date
    });
    return this;
};

function createTimeOutEvent (dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);
    const fullDate = `${date} ${hour.toString().padStart(2,"0")}:00`;

    this.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date
    });
    return this;
};

function hoursWorkedOnDate (date) {
    const timeInEvent = this.timeInEvents.find(e => e.date === date)
    const timeOutEvent = this.timeOutEvents.find(e => e.date === date)

if(!timeInEvent || !timeOutEvent) {
    return 0;
}

const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) /100;
return Math.floor(hoursWorked)
};

function wagesEarnedOnDate (date) {
const hoursWorked = hoursWorkedOnDate.call(this, date);
const payForHours = (hoursWorked * this.payPerHour)
return Math.floor(payForHours)
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(srcArray) {
    return srcArray.reduce((total, record) => {
        return total + allWagesFor.call(record);
    },0);
}