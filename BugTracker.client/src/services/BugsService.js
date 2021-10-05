import { AppState } from '../AppState'
import { Bug } from '../Models/Bug'
import { Note } from '../Models/Note'
import { TrackedBug } from '../Models/TrackedBug'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = []
      AppState.filteredBugs = []
      AppState.bugs = res.data.map(b => new Bug(b))
      AppState.filteredBugs = res.data.map(b => new Bug(b))
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
      await AppState.bugs.push(new Bug(res.data))
      AppState.currentBug = (new Bug(res.data))
      router.push({ name: 'BugDetails', params: { id: res.data.id } })
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
      const bugIndex = AppState.bugs.findIndex(b => b.bugId === bugId)
      AppState.bugs[bugIndex] = new Bug(res.data)
      AppState.currentBug = new Bug(res.data)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async closeBug(bugId) {
    try {
      logger.log(bugId)
      const res = await api.delete(`api/bugs/${bugId}`)
      const bugIndex = AppState.bugs.findIndex(b => b.bugId === bugId)
      const bug = new Bug(res.data)
      AppState.currentBug = bug
      AppState.bugs[bugIndex] = bug
      logger.log('current bug', AppState.currentBug)
      // router.push({ name: 'Home' })
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}

export const bugsService = new BugsService()
