export class Bug {
  constructor(bugData) {
    this.id = bugData.id
    this.title = bugData.title
    this.description = bugData.description
    this.priority = bugData.priority
    this.closed = bugData.closed
    this.closedDate = bugData.closedDate
    this.creatorId = bugData.creatorId
    this.creator = bugData.creator || {}
  }
}
