import { AppState } from '../AppState'
import { TrackedBug } from '../Models/TrackedBug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountTrackedBugs() {
    try {
      const res = await api.get('/account/trackedbugs')
      AppState.accountTrackedBugs = []
      AppState.accountTrackedBugs = res.data.map(t => new TrackedBug(t))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}

export const accountService = new AccountService()
