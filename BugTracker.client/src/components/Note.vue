<template>
  <div class="component mt-2">
    <div class="justify-content-center d-flex flex-row my-1">
      <div class="col-10">
        <div class="card d-flex flex-row py-2">
          <div class="col-1 px-1">
            <img :src="note.creator.picture" class="icon rounded">
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
