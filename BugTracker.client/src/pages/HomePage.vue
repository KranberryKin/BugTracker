<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6">
        <button class="btn btn-info mt-2 flex-end" data-bs-toggle="modal" data-bs-target="#bug-modal">
          Create Bug
        </button>
      </div>
    </div>
    <div class="col-lg-11 card my-3 py-3 bg-warning">
      <div class="card-header">
        <div class="row px-2 text-center">
          <div class="col-lg-3">
            <h6>Title</h6>
          </div>
          <div class="col-lg-3">
            <h6>Creator</h6>
          </div>
          <div class="col-lg-3">
            <h6>Priority</h6>
            <i class="mdi mdi-arrow-up"></i>
          </div>
          <div class="col-lg-2">
            <h6>Updated At</h6>
          </div>
          <div class="col-lg-1">
            <h6>Status</h6>
          </div>
        </div>
      </div>
      <div class="card-body text-center">
        <select v-model="selectedStatus" @Change="onSelectedStatusChanged()">
          <option value="all">
            All
          </option>
          <option value="false">
            Open
          </option>
          <option value="true">
            Closed
          </option>
        </select>
        <Bug v-for="b in filteredBugs" :key="b.id" :bug="b" />
      </div>
    </div>
  </div>

  <Modal id="bug-modal">
    <template #modal-title>
      <h5>New Bug?</h5>
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const sorting = ref(false)
    onMounted(async() => {
      await bugsService.getAllBugs()
    })
    return {
      sorting,
      allBugs: computed(() => AppState.bugs),
      filteredBugs: computed(() => AppState.filteredBugs),
      selectedStatus: 'all',
      sortByPriority(a, b) {
        if (sorting.value) {
          return b.priority - a.priority
        }
        return a.priority - b.priority
      },
      onSelectedStatusChanged() {
        switch (this.selectedStatus) {
          case 'all': {
            AppState.filteredBugs = AppState.bugs
            break
          }
          case 'true': {
            AppState.filteredBugs = AppState.bugs.find(b => b.closed === true)
            break
          }
          case 'false': {
            AppState.filteredBugs = AppState.bugs.find(b => b.closed === false)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
// .home{
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;
//   .home-card{
//     width: 50vw;
//     > img{
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
