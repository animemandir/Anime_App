<template>
  <div>
    <card-item :item="anime" v-for="anime in LibraryThingyThing" :key="anime.id"></card-item>
  </div>
</template>

<script>

import CardItem from "@/components/CardItem";
export default {
  name: "QuizAnimeResults",
  components: {CardItem},
  props: {
    animeResults: [],
    matureContent: Boolean,
    LibraryThingyThing: [],
  },

  data(){
    return {
      dialog: false,
    }
  }
}
</script>

<style scoped>

</style>