export class TrackedBug {
  constructor(bugData) {
    this.id = bugData.id
    this.bugId = bugData.bugId
    this.accountId = bugData.accountId
    this.tracker = bugData.tracker || {}
    this.bug = bugData.bug || {}
  }
}
