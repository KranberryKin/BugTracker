<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <button class="btn btn-info mt-2 flex-end">
        Create Bug
      </button>
    </div>
    <div class="col-11 card my-3 py-3">
      <div class="card-header">
        <div class="row px-2">
          <div class="col-3">
            <h6>Title</h6>
          </div>
          <div class="col-3">
            <h6>Description</h6>
          </div>
          <div class="col-3">
            <h6>Priority</h6>
          </div>
          <div class="col-3">
            <h6>Status</h6>
          </div>
        </div>
      </div>
      <div class="card-body">
        <Bug v-for="b in bugs" :key="b.id" :bug="b" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await bugsService.getAllBugs()
    })
    return {
      bugs: computed(() => AppState.bugs)
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
