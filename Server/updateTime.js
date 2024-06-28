const userRepo = require('./Repositories/userRepo');
const updateActionRepo = require('./Repositories/updateActionRepo');
const employeeService = require('./Services/employeeService');


function eventTime(hour, minute) {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);

    if (now > target) {
        // If the target time is earlier than the current time, schedule for the next day
        target.setDate(target.getDate() + 1);
    }
    return target - now;
}

async function scheduleDailyUpdate(hour, minute) {
    const timeUntilTarget = await eventTime(hour, minute);

    // Set an initial timeout to the target time
    await setTimeout(function() {
        dailyTask(); // Run the callback function

        // Schedule subsequent runs every 24 hours (86400000 milliseconds)
        setInterval(dailyTask, 24 * 60 * 60 * 1000);
    }, timeUntilTarget);
}


// Example usage:
async function dailyTask(){
    const arr = await employeeService.getEmployees();
    for(element of arr){
        const actions = await updateActionRepo.getActionById(element.id);
        const update = {Num_of_actions: actions[0].actions}
        await userRepo.updateUser(element.id, update)
    }
    
    console.log("Running daily task at 8:00. ");
}

module.exports = {scheduleDailyUpdate}

