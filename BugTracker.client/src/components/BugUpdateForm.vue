<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title">Title:</label>
      <input type="text" name="title" required v-model="bug.title">
    </div>
    <div class="form-group">
      <label for="priority">Priority:</label>
      <input type="number"
             min="1"
             max="5"
             name="priority"
             required
             v-model="bug.priority"
      >
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <input type="text" name="description" required v-model="bug.description">
    </div>
    <button type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#bug-modal">
      Create
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const bug = ref({})
    return {
      bug,
      account: computed(() => AppState.account),
      async createBug() {
        try {
          bug.value.creatorId = this.account.id
          bug.value.updatedAt = new Date()
          await bugsService.editBug(AppState.currentBug.id, bug.value)
          Pop.toast('Bug CreatedQ', 'success')
        } catch (error) {
          logger.log('what happened?', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
