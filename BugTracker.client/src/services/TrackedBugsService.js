import { AppState } from '../AppState'
import { TrackedBug } from '../Models/TrackedBug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrackedBugsService {
  async createTrackedBug(bugData) {
    try {
      const res = await api.post('api/trackedbugs', bugData)
      AppState.accountTrackedBugs.push(new TrackedBug(res.data))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async deleteTrackedBug(bugId) {
    try {
      const res = await api.delete(`api/trackedbugs/${bugId}`)
      AppState.accountTrackedBugs = AppState.currentTrackedBugs.filter(t => t.id !== res.data.id)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}

export const trackedBugsService = new TrackedBugsService()
