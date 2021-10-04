<template>
  <div class="about">
    <div class="row card flex-row pt-2">
      <div class="col-6 text-center">
        <h1>{{ bug.title }}</h1>
      </div>
      <div class="col-4 text-center">
        Status: <i class="mdi mdi-36px" :class="bug.closed ? 'text-danger mdi-alpha-c-circle' : 'text-success mdi-alpha-o-circle' "></i>
      </div>
      <div class="col-2 text-center">
        <i class="mdi mdi-24px selectable" :class="bug.closed ? '' : 'text-info mdi-lead-pencil' "></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'AboutPage',
  setup() {
    return {
      bug: computed(() => AppState.currentBug)
    }
  }
}
</script>
