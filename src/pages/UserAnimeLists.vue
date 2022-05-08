<template>
  <v-row style="max-width: 100%">
    <v-col cols="6">
      <h1 class="d-flex justify-center align-center">Watch later</h1>
      <div class="d-flex justify-center align-center">
        <watch-later-list :auth-user="this.authUser"></watch-later-list>
      </div>
    </v-col>


    <v-col cols="6">
      <h1 class="d-flex justify-center align-center">Watched</h1>
      <div class="d-flex justify-center align-center">
        <watch-list :auth-user="this.authUser"></watch-list>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import WatchLaterList from "@/components/WatchLaterList";
import WatchList from "@/components/WatchList";

export default {
  name: "UserAnimeLists",
  components: {WatchLaterList, WatchList},

  props: {
    authUser: {
      required: true,
    },
  },
}
</script>

<style scoped>

</style>