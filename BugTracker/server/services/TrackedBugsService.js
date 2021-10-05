import { dbContext } from '../db/DbContext'

class TrackedBugsService {
  async getUniqueTBug(accountId, bugId) {
    const foundTBug = await dbContext.TrackedBugs.find({ accountId: accountId, bugId: bugId })
    return foundTBug
  }

  async getUsersTrackedBugs(accoundId) {
    const foundTrackedBugs = await dbContext.TrackedBugs.find({ accountId: accoundId }).populate('bug').populate('tracker')
    return foundTrackedBugs
  }

  async deleteTrackedBug(trackedBugId) {
    const deletedTrackedBug = await dbContext.TrackedBugs.findByIdAndDelete(trackedBugId)
    return deletedTrackedBug
  }

  async createTrackedBug(trackedBugData) {
    const createdTrackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    createdTrackedBug.populate('bug')
    return createdTrackedBug.populate('tracker')
  }

  async getUserTrackingByBugId(BugId) {

  }
}

export const trackedBugsService = new TrackedBugsService()
