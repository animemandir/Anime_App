<template>
  <div style="max-width: 225px;">
<!--    <v-card max-width="400">

    </v-card>-->
    <div>
      <component :is="typeOfItem" :item="item"></component>
    </div>

    <v-divider class="mx-4"></v-divider>

    <div class="text-center">
      <v-btn style="width: 135px;">
        <v-icon left>mdi-bookmark</v-icon>Watch Later
      </v-btn>

      <v-btn v-if="item.isAvailable()" @click="item.seenAnime()">
        <v-icon left>mdi-eye</v-icon> Watched
      </v-btn>
      <v-btn v-else @click="item.notSeen()">
        <v-icon left>mdi-eye-off</v-icon> Not Watched
      </v-btn>
    </div>

  </div>
</template>

<script>
import AnimeDetails from "@/components/AnimeDetails";

export default {
  name: "CardItem",
  components: {AnimeDetails},
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  computed: {
    typeOfItem() {
      return this.item.constructor.name + 'Details'
    }
  }
}
</script>

<style scoped>

</style>