export class Note {
  constructor(noteData) {
    this.id = noteData.id
    this.body = noteData.body
    this.bugId = noteData.bugId
    this.creatorId = noteData.creatorId
  }
}
