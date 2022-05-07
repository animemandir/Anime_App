<template>
  <div>
    <card-item @add-watched="update" @add-watch-later="notSureAnymore" class="d-inline-flex" v-for="(item, i) in library" :key="i" :item="item"></card-item>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";

export default {
  name: "LibraryList",
  components: {CardItem},
  data(){
    return {
      page: 1
    }
  },

  props: {
    library: {
      type: [],
      required: true,
    }
  },

  methods: {
    update(y){
      this.$emit('update-watched', y)
    },

    notSureAnymore(x){
      this.$emit('update-watch-later', x)
    }
  }
}
</script>

<style scoped>

</style>