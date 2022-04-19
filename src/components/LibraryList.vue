<template>
  <div>
    <card-item class="d-inline-flex" v-for="(item, i) in library" :key="i" :item="item"></card-item>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";

export default {
  name: "LibraryList",
  components: {CardItem},
  data(){
    return {
      page: 1
    }
  },
  props: {
    library: {
      type: [],
      required: true,
    }
  },
}
</script>

<style scoped>

</style>