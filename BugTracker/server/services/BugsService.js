import { dbContext } from '../db/DbContext'

class BugsService {
  async closeBug(id) {
    const foundBug = await this.getBugById(id)
    foundBug.closed = !foundBug.closed
    foundBug.closedDate = new Date()
    await dbContext.Bugs.findByIdAndUpdate(id, foundBug)
  }

  async editBug(id, body) {
    const bug = await dbContext.Bugs.findByIdAndUpdate(id, body)
    bug.populate('creator')
    return bug
  }

  async getTrackedBugsByBugId(id) {
    const bug = await dbContext.TrackedBugs.find({ bugId: id }).populate('bug').populate('tracker')
    return bug
  }

  async getNotesByBugId(id) {
    const res = await dbContext.Notes.find({ bugId: id }).populate('creator')
    return res
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator').execPopulate()
    return bug
  }

  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    return bug
  }

  async getAllBugs(query) {
    const res = await dbContext.Bugs.find(query).populate('creator').sort('-updatedAt')
    return res
  }
}

export const bugsService = new BugsService()
