<template>
  <div>
    <div v-for="(item, i) in watched" :key="i">
      <watch-item :item="item"></watch-item>
      <v-btn @click="deleteStuff(item)">Delete</v-btn>
    </div>
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

  methods: {
    async deleteStuff(h){
      await db.collection('users').doc(this.authUser.uid).collection('watched').doc(h.id).delete()
    }
  },
}
</script>

<style scoped>

</style>