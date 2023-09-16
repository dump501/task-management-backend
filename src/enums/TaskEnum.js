class TaskEnum{
    static assigned = "Assigned"
    static inProgress = "In Progress"
    static done = "Done"

    static isCurrentStatusValid(status){
        let statuses = ["Assigned", "In Progress", "Done"]
        return statuses.includes(status)
    }
}

module.exports = TaskEnum
