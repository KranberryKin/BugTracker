<template>
  <form @submit.prevent="createNote()">
    <div class="form-group">
      <label for="body">Description:</label>
      <input type="text" name="body" required v-model="note.body">
    </div>
    <button type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#note-modal">
      Create
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  setup() {
    const note = ref({})
    const account = computed(() => AppState.account)
    return {
      note,
      async createNote() {
        note.value.creatorId = account.id
        note.value.bugId = AppState.currentBug.id
        await notesService.createNote(note.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
