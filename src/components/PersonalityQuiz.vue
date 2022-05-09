<template>
  <div>
    <v-card v-if="quiz" elevation="10" max-width="800">
      <v-card-text fluid>
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <label>favorite donut</label>
              <v-radio-group v-model="radioGroup" column>
                <v-radio label="chocolate" color="green" :value="1"></v-radio>
                <v-radio label="glazed" color="green" :value="2"></v-radio>
                <v-radio label="vanilla sprinkled" color="green" :value="3"></v-radio>
                <v-radio label="sugar" color="green" :value="4"></v-radio>
                <v-radio label="cream filled" color="green" :value="5"></v-radio>
                <v-radio label="raspberry glaze" color="green" :value="6"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="6">
              <label>Go Out or Stay In</label>
              <v-radio-group v-model="radioGroupTwo" column>
                <v-radio label="Stay in" color="green" :value="1"></v-radio>
                <v-radio label="Go out" color="green" :value="2"></v-radio>
                <v-radio label="Go out alone" color="green" :value="3"></v-radio>
                <v-radio label="Stay in invite friends over" color="green" :value="4"></v-radio>
                <v-radio label="Go out with friends" color="green" :value="5"></v-radio>
                <v-radio label="None" color="green" :value="6"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <label>Best Weezer album</label>
              <v-radio-group v-model="radioGroupThree" column>
                <v-radio label="Green Album" color="green" :value="1"></v-radio>
                <v-radio label="Red Album" color="green" :value="2"></v-radio>
                <v-radio label="Blue Album" color="green" :value="3"></v-radio>
                <v-radio label="Teal Album" color="green" :value="4"></v-radio>
                <v-radio label="White Album" color="green" :value="5"></v-radio>
                <v-radio label="Raditude" color="green" :value="6"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12">
              <label>What's Your Diet</label>
              <v-radio-group v-model="radioGroupFour" column>
                <v-radio label="Eat Meat" color="green" :value="1"></v-radio>
                <v-radio label="Vegan" color="green" :value="2"></v-radio>
                <v-radio label="Vegetarian" color="green" :value="3"></v-radio>
                <v-radio label="Pescatarian" color="green" :value="4"></v-radio>
                <v-radio label="Says they're vegan but actually aren't" color="green" :value="5"></v-radio>
                <v-radio label="No vegetables. Only meat. Nothing More Nothing less." color="green" :value="6"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <label>Mature content</label>
              <v-radio-group v-model="radioGroupFive" column>
                <v-radio label="yes" color="green" :value="true"></v-radio>
                <v-radio label="no" color="green" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-col class="text-right">
            <v-btn @click="getResults" right>Get Anime</v-btn>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>

    <quiz-anime-results id="result" :library-thingy-thing="LibraryThingyThing" v-else></quiz-anime-results>
  </div>
</template>

<script>
import QuizAnimeResults from "@/components/QuizAnimeResults";
import {Anime} from "@/models/CardItems";
import LibraryCollection from "@/models/LibraryCollection";
import {default as axios} from "axios";

export default {
  name: "PersonalityQuiz",
  components: {QuizAnimeResults},
  data(){
    return {
      LibraryThingyThing: new LibraryCollection(),
      animeResults: [],
      quiz: true,
      answers: 0,
      radioGroup: 1,
      radioGroupTwo: 1,
      radioGroupThree: 1,
      radioGroupFour: 1,
      radioGroupFive: 1,
      matureContent: false,
    }
  },

  methods: {
    getResults(){
      this.answers = 0
      this.answers += this.radioGroup
      console.log('yy', this.answers)
      this.answers += this.radioGroupTwo
      console.log('gran', this.answers)
      this.answers += this.radioGroupThree
      console.log('tt', this.answers)
      this.answers += this.radioGroupFour
      console.log('xx', this.answers)

      this.answers = this.answers * 3

      this.matureContent = this.radioGroupFive

      if (this.matureContent === false && this.answers === 12){
        this.answers = 22
      }

      this.tom()

      console.log('answer', this.answers)

      this.quiz = false
    },

    jerry(){
      console.log('pasta',this.animeResults)

      for (let i = 0; i < this.animeResults[0].length; i++){

        // Error down below mentioned in email

        let henry = this.animeResults[0]

        let genres = "";
        henry[i].genres.forEach(y => {
          genres += y.name + " ";
        });

        console.log('dogege',henry[i])

        let studios = "";
        henry[i].studios.forEach(y => {
          studios += y.name + " ";
        });

        if(this.matureContent === true){

          this.LibraryThingyThing.addItem(new Anime(henry[i].images.jpg.large_image_url, henry[i].title, studios, genres, henry[i].score, henry[i].synopsis))

        }else if (this.matureContent === false){

          if(genres.toLowerCase().includes("hentai") || genres.toLowerCase().includes("ecchi")){
            console.log('not pog stuff')
          }else{
            this.LibraryThingyThing.addItem(new Anime(henry[i].images.jpg.large_image_url, henry[i].title, studios, genres, henry[i].score, henry[i].synopsis))
          }

        }
      }
    },

    async tom(){
      let url = 'https://api.jikan.moe/v4/anime?q=&genres=' + this.answers;

      this.LibraryThingyThing = new LibraryCollection();
      this.animeResults = [];

      await axios.get(url)
          .then(z => {
            console.log('api response', z.data);
            let jj = []
            jj.push(z.data.data)
            this.animeResults = jj;

            console.log('jj', this.animeResults)
          }).catch(error => {
        console.log('error', error);
      }).finally(() => {
        this.jerry();
        console.log('anime', this.animeResults)
      })
    }
  }
}
</script>

<style scoped>
#result{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 1rem;
}
</style>