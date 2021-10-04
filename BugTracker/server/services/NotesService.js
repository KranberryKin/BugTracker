import { dbContext } from '../db/DbContext'

class NotesService {
  async findNoteById(noteId) {
    const foundNote = await dbContext.Notes.findById(noteId)
    return foundNote
  }

  async deleteNote(id) {
    const deletedNote = await dbContext.Notes.findByIdAndDelete(id)
    return deletedNote
  }

  async createNote(noteData) {
    const createdNote = await dbContext.Notes.create(noteData)
    return createdNote.populate('creator')
  }
}

export const notesService = new NotesService()
