<template>
  <v-app>
    <div>
      <v-app-bar color="light-green" dark app>
        <v-icon>mdi-alpha-a-box</v-icon>
        <v-toolbar-title>nime Search</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn>
          <v-icon>mdi-account</v-icon> Log-in
        </v-btn>

        <v-form @submit.prevent="getAnimeShtuff">
          <v-btn type="submit" @click="randomAnime = !randomAnime">
            RANDOM
          </v-btn>
        </v-form>

        <v-btn>
          Quiz <v-icon>mdi-badge-account-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <br>


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


    <div id="chickenNuggets">
      <router-view :library="LibraryThingyThing"></router-view>
    </div>

  </v-app>
</template>

<script>
// import LibraryList from "@/components/LibraryList";
import LibraryCollection from "@/models/LibraryCollection";
import {Anime} from "@/models/CardItems";

const axios = require('axios').default;

export default {
  name: 'App',
  components: {
    // LibraryList,
  },
  data(){
    return {
      randomAnime: false,
      matureContent: false,
      searchTerm: '',
      animeSearchResults: [],
      LibraryThingyThing: new LibraryCollection(),
    }
  },

  methods: {
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

    randomGrabby(){
      console.log('ppp', this.animeSearchResults)

      // Error down below mentioned in email

      let genres = "";
      this.animeSearchResults[0].genres.forEach(y => {
        genres += y.name + " ";
      });

      let studios = "";
      this.animeSearchResults[0].studios.forEach(y => {
        studios += y.name + " ";
      });

      this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults[0].images.jpg.large_image_url, this.animeSearchResults[0].title, studios, genres, this.animeSearchResults[0].score, this.animeSearchResults[0].synopsis))

    },


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
        })


      } else if (this.randomAnime) {
        this.LibraryThingyThing = new LibraryCollection();

        this.animeSearchResults = [];

        url = 'https://api.jikan.moe/v4/random/anime'

        axios.get(url)
            .then(c => {
              console.log('api response', c.data);
              let asdf = []
              asdf.push(c.data.data)
              this.animeSearchResults = asdf;

              console.log(asdf)
            }).catch(error => {
          console.log('error', error);
        }).finally(() => {
          this.randomGrabby();
          console.log('anime', this.animeSearchResults)
        })
      }

    }
  }
};
</script>

<style>
#chickenNuggets{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 1rem;
}
</style>