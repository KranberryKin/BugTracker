import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Forbidden } from '../utils/Errors'
export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:id', this.deleteNote)
  }

  async deleteNote(req, res, next) {
    try {
      const foundNote = await notesService.findNoteById(req.params.id)
      if (foundNote.creatorId.toString() === req.account.id) {
        const deletedTask = await notesService.deleteNote(req.params.id)
        res.send(deletedTask)
      } else { throw new Forbidden("Can't do that!") }
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
