<template>
  <div class="about">
    <!-- Bug Header -->
    <div class="card flex-row pt-2">
      <div class="col-6 text-center">
        <h1>{{ Cbug.title }}</h1>
      </div>
      <div class="col-4 text-center">
        Status: <i class="mdi mdi-36px" :class="Cbug.closed ? 'text-success mdi-alpha-c-circle' : 'text-danger mdi-alpha-o-circle' "></i>
      </div>
      <div class="col-2 text-center" :class="Cbug.closed ? 'visually-hidden' : '' ">
        <i class="mdi mdi-24px selectable text-info mdi-lead-pencil"></i>
      </div>
    </div>
    <!-- Bug Information and Tracking -->
    <div class="my-2 container-fluid">
      <div class="row text-center">
        <div class="col-2 mt-1">
          <img :src="Cbug.creator.picture" class="rounded icon"> <br>
        </div>
        <div class="col-2">
          Reported by: <br> {{ Cbug.creator.name }}
        </div>
        <div class="col-2" :class="Cbug.priority == 5 ? 'text-danger' : Cbug.priority <= 2 ? 'text-success' : Cbug.priority <= 4 ? 'text-warning' : ''">
          Priority: <br>
          {{ Cbug.priority }}
        </div>
        <div class="col-3">
          Updated At: <br>
          {{ updatedAt }}
        </div>
        <div class="col-3" :class="Cbug.closed ? 'visually-hidden' : '' ">
          <button class="btn btn-danger" @click="closeBug(Cbug.id)">
            Close
          </button>
        </div>
      </div>
    </div>
    <div class="text-center">
      {{ Cbug.description }}
    </div>
    <!-- Note information and center -->
    <div class="mt-5 container-fluid">
      <div class="row">
        <div class="col-10">
        </div>
        <div class="col-2">
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#note-modal">
            Add Note
          </button>
        </div>
      </div>
      <div class="row">
        <Note v-for="n in notes" :key="n.id" :note="n" />
      </div>
    </div>
  </div>
  <Modal id="note-modal">
    <template #modal-title>
      <h5>New Note</h5>
    </template>
    <template #modal-body>
      <NoteForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import moment from 'moment'
import { bugsService } from '../services/BugsService'
export default {
  name: 'AboutPage',
  setup() {
    const notes = computed(() => AppState.notes)
    return {
      notes,
      Cbug: computed(() => AppState.currentBug),
      updatedAt: computed(() => moment(String(AppState.currentBug.updatedAt)).format('MM/DD/YYYY hh:mm')),
      async closeBug(bugId) {
        await bugsService.closeBug(bugId)
      }
    }
  }
}
</script>

<style scoped>
.icon {
  height: 100px;
}
</style>
