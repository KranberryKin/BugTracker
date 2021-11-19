<template>
  <div class="component col-10 mt-3">
    <div class="card row d-flex flex-row py-2 selectable text-dark" @click="setCurrentBug(bug.bug.id)">
      <div class="col-lg-3">
        {{ bug.bug.title }}
      </div>
      <div class="col-lg-3">
        <img :src="bug.tracker.picture" alt="" class="icon rounded">
        {{ bug.tracker.name }}
      </div>
      <div class="col-lg-3" :class="bug.bug.priority == 5 ? 'text-danger' : bug.bug.priority <= 2 ? 'text-success' : bug.bug.priority <= 4 ? 'text-warning' : ''">
        Priority: {{ bug.bug.priority }}
      </div>
      <div class="col-lg-2">
        {{ updatedAt }}
      </div>
      <div class="col-lg-1">
        <i class="mdi mdi-36px" :class="bug.bug.closed ? 'text-success mdi-alpha-c-circle' : 'text-danger mdi-alpha-o-circle' "></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { router } from '../router'
import { bugsService } from '../services/BugsService'
import moment from 'moment'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      updatedAt: computed(() => moment(String(props.bug.bug.updatedAt)).format('MM/DD/YYYY hh:mm')),
      async setCurrentBug(bugId) {
        await bugsService.getBugById(bugId)
        await bugsService.getNotesByBugId(bugId)
        await bugsService.getTrackedByBugId(bugId)
        router.push({ name: 'BugDetails', params: { id: props.bug.bug.id } })
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
