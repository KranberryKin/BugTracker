<template>
  <div class="about">
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
