<template>
  <div style="max-width: 225px;" class="d-block">
    <v-card>
      <component :is="typeOfItem" :item="item"></component>

      <div class="text-center">
        <v-btn style="width: 135px;" @click="$emit('add-watch-later', item)">
          <v-icon left>mdi-bookmark</v-icon>Watch Later
        </v-btn>

        <v-btn @click="$emit('add-watched', item)">
          <v-icon left>mdi-eye</v-icon> Watched
        </v-btn>
<!--        <v-btn v-else @click="item.notSeen()">-->
<!--          <v-icon left>mdi-eye-off</v-icon> Not Watched-->
<!--        </v-btn>-->
      </div>
    </v-card>
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