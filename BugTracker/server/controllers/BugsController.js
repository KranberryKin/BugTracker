import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'
import { BadRequest, Forbidden } from '../utils/Errors'
// import { Auth0Provider } from '@bcwdev/auth0provider'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getBugById)
      // .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('/:id/notes', this.getNotesByBugId)
      .get('/:id/trackedbugs', this.getTrackedBugsByBugId)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async closeBug(req, res, next) {
    try {
      const foundBug = await bugsService.getBugById(req.params.id)
      if (foundBug.creatorId.toString() === req.account.id) {
        const closedBug = await bugsService.closeBug(req.params.id)
        res.send(closedBug)
      } else { throw new Forbidden("Can't do that!") }
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const foundBug = await bugsService.getBugById(req.params.id)
      if (foundBug.closed) {
        throw new BadRequest('Bug is closed')
      }
      if (foundBug.creatorId.toString() === req.account.id) {
        const editedBug = await bugsService.editBug(req.params.id, req.body)
        res.send(editedBug)
      } else { throw new Forbidden("Can't do that!") }
    } catch (error) {
      next(error)
    }
  }

  async getTrackedBugsByBugId(req, res, next) {
    try {
      const trackedBugs = await bugsService.getTrackedBugsByBugId(req.params.id)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await bugsService.getNotesByBugId(req.params.id)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const createdBug = await bugsService.createBug(req.body)
      res.send(createdBug)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const Bug = await bugsService.getBugById(req.params.id)
      res.send(Bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      const Bugs = await bugsService.getAllBugs(req.query)
      res.send(Bugs)
    } catch (error) {
      next(error)
    }
  }
}
