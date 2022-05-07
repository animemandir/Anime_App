<template>
  <div>
    <card-item class="d-inline-flex" v-for="(item, i) in watched" :key="i" :item="item"></card-item>
  </div>
</template>

<script>
import {CardItem} from "@/models/CardItems";

export default {
  name: "WatchList",
  components: {CardItem},
  props: {
    watched: {
      type: [],
      required: true,
    }
  }
}
</script>

<style scoped>

</style>