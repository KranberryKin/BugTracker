<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="row justify-content-center">
      <AccBug v-for="b in bugs" :key="b.id" :bug="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      await accountService.getAccountTrackedBugs()
    })
    const bugs = computed(() => AppState.accountTrackedBugs)
    logger.log('bugs', bugs)
    return {
      bugs,
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
