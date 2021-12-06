<template>
  <h1>busca</h1>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ $axios, req }) {
    const result = await $axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${req}&language=pt-BR`) 
    return movie
  },
})
</script>

<style scoped>

</style>