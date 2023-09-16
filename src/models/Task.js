class Task {
    constructor(id, title, description, current_status, deadline, tag, assigned_to){
        this.id = id
        this.title = title
        this.description = description
        this.current_status = current_status
        this.deadline = deadline
        this.tag = tag
        this.assigned_to = assigned_to
    }
}

module.exports = Task