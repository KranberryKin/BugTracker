import { trackedBugsService } from '../services/TrackedBugsService'
import BaseController from '../utils/BaseController'
import { BadRequest, Forbidden } from '../utils/Errors'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .post('', this.createTrackedBug)
      .delete('/:id', this.deleteTrackedBug)
  }

  async deleteTrackedBug(req, res, next) {
    try {
      const foundTrackedBug = await trackedBugsService.getUsersTrackedBugs(req.account.id)
      const foundTBug = foundTrackedBug.filter(tb => tb.id === req.params.id)
      // @ts-ignore
      if (foundTBug[0].accountId.toString() === req.account.id) {
        const deletedTrackedBug = await trackedBugsService.deleteTrackedBug(req.params.id)
        res.send(deletedTrackedBug)
      } else { throw new Forbidden("Can't do that!") }
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(req, res, next) {
    try {
      const foundTBug = await trackedBugsService.getUniqueTBug(req.account.id, req.body.bugId)
      if (foundTBug.length === 0) {
        const createdTrackedBug = await trackedBugsService.createTrackedBug(req.body)
        res.send(createdTrackedBug)
      } else { throw new BadRequest("Can't follow same bug twice!") }
    } catch (error) {
      next(error)
    }
  }
}
