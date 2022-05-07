<template>
  <div>
    <watch-item class="d-inline-flex" v-for="(item, i) in watched" :key="i" :item="item"></watch-item>
  </div>
</template>

<script>
import WatchItem from "@/components/WatchItem";
import {db} from "@/firebase/firebase";

export default {
  name: "WatchList",
  components: {WatchItem},
  data(){
    return{
      watched: [],
    }
  },

  props: {
    authUser: {
      required: true,
    },
  },

  firestore: function (){
    return {
      watched: db.collection('users').doc(this.authUser.uid).collection('watched')
    }
  },
}
</script>

<style scoped>

</style>