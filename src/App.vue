<template>
  <v-app>
    <div>
      <v-app-bar color="light-green" dark app>
        <v-icon>mdi-alpha-a-box</v-icon>
        <v-toolbar-title>nime Search</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <br>


    <v-main>
      <v-form @submit.prevent="getAnimeShit">
        <v-row>
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-text-field v-model="searchTerm" prepend-icon="mdi-magnify" label="Search"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn type="submit">Search</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-form>
    </v-main>



    <div id="chickenNuggets">
      <library-list :library="LibraryThingyThing"></library-list>
    </div>

  </v-app>
</template>

<script>
import LibraryList from "@/components/LibraryList";
import LibraryCollection from "@/models/LibraryCollection";
import {Anime} from "@/models/CardItems";

const axios = require('axios').default;

export default {
  name: 'App',
  components: {
    LibraryList,
  },
  data(){
    return {
      searchTerm: '',
      animeSearchResults: [],
      LibraryThingyThing: new LibraryCollection(),
    }
  },

  methods: {
    grabby(){
      console.log('pp',this.animeSearchResults)
      for (let i = 0; i < this.animeSearchResults.data.length; i++){
        /*if (this.animeSearchResults.data[i].genres.join()){

        }*/
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
        if(genres.toLowerCase().includes("hentai") || genres.toLowerCase().includes("ecchi")){
          console.log('not pog stuff')
        }else{
          this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults.data[i].images.jpg.large_image_url, this.animeSearchResults.data[i].title, studios, genres, this.animeSearchResults.data[i].score, this.animeSearchResults.data[i].synopsis))
        }

      }

      console.log('painpain', this.LibraryThingyThing)
    },

    getAnimeShit(){

      if(this.searchTerm){

        this.animeSearchResults = [];

        let url = 'https://api.jikan.moe/v4/anime';
        let params = {q: this.searchTerm}

        axios.get(url, {params})
            .then(c => {
              console.log('api response', c);
              this.animeSearchResults = c.data
            }).catch(error => {
          console.log('fucking idiot error', error);
        }).finally(() => {
          this.grabby();
          console.log('anime bullshit', this.animeSearchResults)
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