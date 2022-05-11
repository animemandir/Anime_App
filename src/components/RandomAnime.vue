<template>
  <div>
    <v-row>
      <v-col cols="6">
        <random-anime-results id="results" :library-thingy-thing="LibraryThingyThing"></random-anime-results>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-row>
            <v-col>
              <v-form @submit.prevent="getStuff">
                <v-btn type="submit" @click="randomAnime = !randomAnime">
                  Get Anime
                </v-btn>
              </v-form>
            </v-col>
            <v-col>
              <v-switch v-model="matureContent" label="Mature Content"></v-switch>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RandomAnimeResults from "@/components/RandomAnimeResults";
import {Anime} from "@/models/CardItems";
import LibraryCollection from "@/models/LibraryCollection";
import {default as axios} from "axios";

export default {
  name: "RandomAnime",
  components: {RandomAnimeResults},
  data(){
    return{
      LibraryThingyThing: new LibraryCollection(),
      animeResults: [],
      matureContent: false,
      randomAnime: false,
    }
  },

  methods: {
    randomGrabby(){
      console.log('ppp', this.animeSearchResults)

      let genres = "";
      this.animeSearchResults[0].genres.forEach(y => {
        genres += y.name + " ";
      });

      let studios = "";
      this.animeSearchResults[0].studios.forEach(y => {
        studios += y.name + " ";
      });

      if (this.matureContent === true){
        this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults[0].images.jpg.large_image_url, this.animeSearchResults[0].title, studios, genres, this.animeSearchResults[0].score, this.animeSearchResults[0].synopsis))
      } else if (this.matureContent === false){
        if (genres.toLowerCase().includes("hentai") || genres.toLowerCase().includes("ecchi")){
          console.log('not cool')
        } else{
          this.LibraryThingyThing.addItem(new Anime(this.animeSearchResults[0].images.jpg.large_image_url, this.animeSearchResults[0].title, studios, genres, this.animeSearchResults[0].score, this.animeSearchResults[0].synopsis))
        }
      }
    },

    async getStuff(){
      if (this.randomAnime){
        this.LibraryThingyThing = new LibraryCollection();
        this.animeSearchResults = [];

        let url = 'https://api.jikan.moe/v4/random/anime'

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

    },
  },
}
</script>

<style scoped>

</style>