<template>
  <div>
    <card-item class="d-inline-flex" v-for="(item, i) in watchLater" :key="i" :item="item"></card-item>
  </div>
</template>

<script>
import {CardItem} from "@/models/CardItems";

export default {
  name: "WatchLaterList",
  components: {CardItem},
  props: {
    watchLater: {
      type: [],
      required: true,
    }
  }
}
</script>

<style scoped>

</style>