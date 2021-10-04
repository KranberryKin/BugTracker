import { AppState } from '../AppState'
import { Bug } from '../Models/Bug'
import { Note } from '../Models/Note'
import { TrackedBug } from '../Models/TrackedBug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = []
      AppState.bugs = res.data.map(b => new Bug(b))
      logger.log('appstates bugs', AppState.bugs)
    } catch (error) {
      logger.log('What happened?', error)
    }
  }

  async getBugById(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}`)
      AppState.currentBug = {}
      AppState.currentBug = new Bug(res.data)
      logger.log('current bug', AppState.currentBug)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async createBug(bugData) {
    try {
      const res = await api.post('api/bugs', bugData)
      AppState.bugs.push(new Bug(res.data))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}/notes`)
      AppState.notes = []
      AppState.notes = res.data.map(n => new Note(n))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async getTrackedByBugId(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
      AppState.currentTrackedBugs = []
      AppState.currentTrackedBugs = res.data.map(t => new TrackedBug(t))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async editBug(bugId, bugData) {
    try {
      const res = await api.put(`api/bugs/${bugId}`, bugData)
      const bugIndex = AppState.bugs.findIndex({ bugId })
      AppState.bugs[bugIndex] = new Bug(res.data)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async closeBug(bugId) {
    try {
      const res = await api.delete(`api/bugs/${bugId}`)
      const bugIndex = AppState.bugs.findIndex({ bugId })
      AppState.bugs[bugIndex] = new Bug(res.data)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}

export const bugsService = new BugsService()
