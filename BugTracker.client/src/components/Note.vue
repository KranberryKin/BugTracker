<template>
  <div class="component container-fluid card mt-2">
    <div class="row my-1">
      <div class="col-1 px-1">
        <img :src="note.creator.picture" class="icon">
      </div>
      <div class="col-5">
        {{ note.creator.name }}
      </div>
      <div class="col-5">
        {{ note.body }}
      </div>
      <div class="col-1">
        <i class="mdi mdi-delete text-danger selectable" @click="deleteNote(note.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async deleteNote(noteId) {
        await notesService.deleteNote(noteId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon{
 height: 50px;
}
</style>
