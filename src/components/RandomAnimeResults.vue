<template>
  <div>
    <card-item :item="anime" v-for="anime in LibraryThingyThing" :key="anime.id"></card-item>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
export default {
  name: "RandomAnimeResults",
  components: {CardItem},
  props:{
    aniResults: [],
    matureContent: Boolean,
    LibraryThingyThing: [],
  }
}
</script>

<style scoped>

</style>