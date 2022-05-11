<template>
  <v-app>
    <div>
      <!--nav bar-->
      <v-app-bar color="light-green" dark app>
        <v-icon>mdi-alpha-a-box</v-icon>
        <router-link to="/" style="text-decoration: none; color: white"><v-toolbar-title>nime Search</v-toolbar-title></router-link>

        <v-spacer></v-spacer>

        <v-btn v-if="authUser === null" @click="loginWithGoogle">
          <v-icon>mdi-account</v-icon> Log-in
        </v-btn>
        <v-btn v-else @click="logOut">
          <v-icon>mdi-account</v-icon> Log-out
        </v-btn>

        <v-btn>
          <router-link style="text-decoration: none; color: white" to="/random">Random <v-icon>mdi-help</v-icon></router-link>
        </v-btn>

        <v-btn>
          <router-link style="text-decoration: none; color: white" to="/quiz">Quiz <v-icon>mdi-badge-account-outline</v-icon></router-link>
        </v-btn>

        <v-btn>
          <router-link style="text-decoration: none; color: white" to="/lists">Show<v-icon>mdi-archive</v-icon></router-link>
        </v-btn>
      </v-app-bar>
    </div>
    <br>

    <!--search stuff-->
    <v-main>
      <v-form @submit.prevent="getAnimeShtuff">
        <v-row>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field v-model="searchTerm" prepend-icon="mdi-magnify" label="Search"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn type="submit">Search</v-btn>
              </v-col>
              <v-col cols="2">
                <v-switch v-model="matureContent" label="Mature Content"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-form>
    </v-main>

    <!--displays anime-->
    <div id="chickenNuggets">
      <router-view :auth-user="authUser" :library="LibraryThingyThing" @update-watched="update" @update-watch-later="updateTwo"></router-view>
    </div>
  </v-app>
</template>

<script>
// import LibraryList from "@/components/LibraryList";
import LibraryCollection from "@/models/LibraryCollection";
import {Anime} from "@/models/CardItems";
import {auth, db, firebase} from "@/firebase/firebase";
import User from "@/models/user";

const axios = require('axios').default;

export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      authUser: {},
      randomAnime: false,
      matureContent: false,
      searchTerm: '',
      animeSearchResults: [],
      LibraryThingyThing: new LibraryCollection(),
      watched: [],
      watchLater: [],
    }
  },

  methods: {
    async loginWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider).catch(error => {
        console.error('Unable to Sign In', error)
      })

      console.log(this.authUser)
    },

    async logOut() {
      await auth.signOut();
    },

    async update(y){
      console.log('watched thing', y)
      let item = {picture:y.picture, title:y.title, studio:y.studio, genre:y.genre, rating:y.rating, summary:y.summary}

      await db.collection('users').doc(this.authUser.uid).collection('watched').add(item)
    },

    async updateTwo(y){
      console.log('watch later thing', y)
      let item = {picture:y.picture, title:y.title, studio:y.studio, genre:y.genre, rating:y.rating, summary:y.summary}

      await db.collection('users').doc(this.authUser.uid).collection('watch-later').add(item)
    },

    grabby(){
      console.log('EE',this.animeSearchResults)
      for (let i = 0; i < this.animeSearchResults.data.length; i++){

        console.log(this.animeSearchResults.data[i].genres.join(" "))

        let genres = "";
        this.animeSearchResults.data[i].genres.forEach(y => {
          genres += y.name + " ";
        });

        let studios = "";
        this.animeSearchResults.data[i].studios.forEach(y => {
          studios += y.name + " ";
        });

        console.log('whats this', this.animeSearchResults[i])
        //filters out mature content.
        if(this.matureContent === true){
          this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults.data[i].images.jpg.large_image_url, this.animeSearchResults.data[i].title, studios, genres, this.animeSearchResults.data[i].score, this.animeSearchResults.data[i].synopsis))
        }else if (this.matureContent === false){
          if(genres.toLowerCase().includes("hentai") || genres.toLowerCase().includes("ecchi")){
            console.log('not pog stuff')
          }else{
            this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults.data[i].images.jpg.large_image_url, this.animeSearchResults.data[i].title, studios, genres, this.animeSearchResults.data[i].score, this.animeSearchResults.data[i].synopsis))
          }
        }
      }

      console.log('painpain', this.LibraryThingyThing)
    },

    /*randomGrabby(){
      console.log('ppp', this.animeSearchResults)

      let genres = "";
      this.animeSearchResults[0].genres.forEach(y => {
        genres += y.name + " ";
      });

      let studios = "";
      this.animeSearchResults[0].studios.forEach(y => {
        studios += y.name + " ";
      });

      this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults[0].images.jpg.large_image_url, this.animeSearchResults[0].title, studios, genres, this.animeSearchResults[0].score, this.animeSearchResults[0].synopsis))
    },*/

    getAnimeShtuff(){
      let url = 'https://api.jikan.moe/v4/anime';

      let params;

      if(this.searchTerm){
        this.LibraryThingyThing = new LibraryCollection();
        this.animeSearchResults = [];

        params = {q: this.searchTerm}

        axios.get(url, {params})
            .then(c => {
              console.log('api response', c);
              this.animeSearchResults = c.data
            }).catch(error => {
          console.log('error', error);
        }).finally(() => {
          this.grabby();
          console.log('anime', this.animeSearchResults)
        })}

      //else if (this.randomAnime) {
      //   this.LibraryThingyThing = new LibraryCollection();
      //
      //   this.animeSearchResults = [];
      //
      //   url = 'https://api.jikan.moe/v4/random/anime'
      //
      //   axios.get(url)
      //       .then(c => {
      //         console.log('api response', c.data);
      //         let asdf = []
      //         asdf.push(c.data.data)
      //         this.animeSearchResults = asdf;
      //
      //         console.log(asdf)
      //       }).catch(error => {
      //     console.log('error', error);
      //   }).finally(() => {
      //     this.randomGrabby();
      //     console.log('anime', this.animeSearchResults)
      //   })
      // }
    }
  },

  beforeCreate: async function () {
    await auth.onAuthStateChanged(x => {
      if (x) {
        this.authUser = new User(x);
      } else {
        this.authUser = null
      }
    })
  },
}
</script>

<style>
#chickenNuggets{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 1rem;
}
</style>