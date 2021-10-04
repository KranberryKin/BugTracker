<template>
  <div class="component col-11 mt-3">
    <router-link :to="{name: 'About'}">
      <div class="card row d-flex flex-row py-2 selectable text-dark" @click="setCurrentBug(bug.id)">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-3">
          {{ bug.description }}
        </div>
        <div class="col-3">
          Priority: {{ bug.priority }}
        </div>
        <div class="col-3">
          <i class="mdi mdi-36px" :class="bug.closed ? 'text-danger mdi-alpha-c-circle' : 'text-success mdi-alpha-o-circle' "></i>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      setCurrentBug(bugId) {
        bugsService.getBugById(bugId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
