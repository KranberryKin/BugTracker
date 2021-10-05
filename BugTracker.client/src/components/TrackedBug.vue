<template>
  <div class="component">
    <img :src="bug.tracker.picture" :title="bug.tracker.name" class="icon">
  </div>
</template>

<script>
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.icon {
  height: 25px;
}
</style>
