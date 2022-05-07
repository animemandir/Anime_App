<template>
  <div>
    <div v-for="(item, i) in watchLater" :key="i">
      <watch-item :item="item"></watch-item>
      <v-btn @click="deleteAnime(item)">delete</v-btn>
    </div>
  </div>
</template>

<script>
import WatchItem from "@/components/WatchItem";
import {db} from "@/firebase/firebase";

export default {
  name: "WatchLaterList",
  components: {WatchItem},
  data(){
    return{
      watchLater: [],
    }
  },

  methods: {
    //justin helped with this part cause my code doesn't ge the ID so I have to use some obscure method to get the
    //card so it deletes it from the list.

    async deleteAnime(l){
      let id = '';
      this.watchLater = await db.collection('users').doc(this.authUser.uid).collection('watch-later')
          .get()
          .then(dogege => {
            return dogege.docs;
          })

      this.watchLater.forEach(dog => {
        if (l.title === dog.data().title){
          id = dog.id
        }
      })
      await db.collection('users').doc(this.authUser.uid).collection('watch-later').doc(id).delete();
    }
  },

  props: {
    authUser: {
      required: true,
    },
  },

  firestore: function (){
    return {
      watchLater: db.collection('users').doc(this.authUser.uid).collection('watch-later')
    }
  },
}
</script>

<style scoped>

</style>