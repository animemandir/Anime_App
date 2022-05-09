<template>
  <div style="max-width: 225px;" class="d-block">
    <v-card>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img :src="item.picture" alt="Avatar" style="width:225px;height:315px;">
          </div>
          <div class="flip-card-back">

            <v-card-text>
              <v-row class="mx-0">
                <div>
                  <p>
                    Studio: {{item.studio}}
                  </p>
                </div>
              </v-row>
              <v-row class="mx-0">
                <div>
                  <p>
                    Genres: {{item.genre}}
                  </p>
                </div>
              </v-row>
              <v-row class="mx-0">
                <div>
                  <p>
                    Rating: {{item.rating}}
                  </p>
                </div>
              </v-row>
            </v-card-text>

            <div class="text-center">
              <v-dialog width="600">

                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="light-green" dark v-bind="attrs" v-on="on">
                    Summary
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 black lighten-2">
                    {{item.title}}
                  </v-card-title>

                  <v-card-text>
                    {{item.summary}}
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <v-btn style="width: 135px;" @click="$emit('add-watch-later', item)">
          <v-icon left>mdi-bookmark</v-icon>Watch Later
        </v-btn>

        <v-btn @click="$emit('add-watched', item)">
          <v-icon left>mdi-eye</v-icon> Watched
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "CardItem",
  components: {},
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
.flip-card{
  background-color: transparent;
  width: 225px;
  height: 315px;
  perspective: 1000px;
}

.flip-card-inner{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner{
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back{
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}
</style>