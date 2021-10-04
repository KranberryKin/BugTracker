import { AppState } from '../AppState'
import { Note } from '../Models/Note'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async createNote(noteData) {
    try {
      const res = await api.post('api/notes', noteData)
      AppState.notes.push(new Note(res.data))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async deleteNote(noteId) {
    try {
      const res = await api.delete(`api/notes/${noteId}`)
      AppState.notes = AppState.notes.filter(n => n.id !== res.data.id)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}
export const notesService = new NotesService()
