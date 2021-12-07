<template>
  <div class="movie-detail-container">
    <AppTopBar @evtSearch="searchMovies($event)" />
    <div class="main d-flex flex-column align-items-center">
      <img :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${backdrop_path}`" alt="">
      <span 
        class="d-flex align-items-center">
          <a :href="homepage" target="_blank">
            <h3>{{ title}}</h3>
          </a>
          <p>({{realeseDate}})</p>
      </span>
      <span class="d-flex align-items-center">
        <i 
          class="mx-2"
          v-for="genre in genres" 
          :key="genre.id">
            {{genre.name}} 
        </i>
      </span>
      <span class="d-flex align-items-center">
        <p>Orçamento: {{ budget | monetary }}</p>
        <p class="ml-2"> Receita: {{ revenue | monetary }}</p>
      </span>
      
      <span class="mt-4 text-start w-100">
        <h5>Sinopse</h5>
        <p>{{overview}}</p>
      </span>
    </div>
    <div class="recommendation-container mt-4">
      <h4 v-if="recommendations.length" class="px-5">Você também pode gostar</h4>
      <Carousel v-if="recommendations.length" :perPage="5" class="carousel px-5 d-flex justify-content-center">
          <Slide
            v-for="movie in recommendations"
            :key="movie.id"
            class="slide-item"
          >
            <NuxtLink :to="`${movie.id}`" class="image-container">
              <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face'+ movie.backdrop_path" alt="">
              <footer class="status-bar">
                <p>{{ movie.title}}</p>
                <span>Avaliação: <p class="badge badge-pill badge-warning">{{ movie.vote_average | averagePercent}}%</p></span>
              </footer>
           </NuxtLink>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

export default Vue.extend({
  components: {
    Carousel,
    Slide
  },
  async asyncData({ $axios, params }) {
    const movie = await $axios.$get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_KEY}&language=pt-BR`) 
    return movie
  },
  data() {
    return {
      recommendations: []
    }
  },
  head() {
    return {
      title: this.title

    }
  },
  computed: {
    realeseDate() {
      return moment(this.release_date).format('YYYY')
    }
  },
  methods: {
    ...mapActions(['getRecommendations']),
    async searchMovies({term}) {
      this.isSearch = true
      this.$router.push('/')
      const { results } = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${term}&language=pt-BR`)
      this.resultSearch = results
    },
  },
  async mounted() {
    this.recommendations = await this.getRecommendations(this.$route.params)
  }
}) 
</script>

<style scoped>
.movie-detail-container {
  width: 100%;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  

  padding: 10px 50px;
}
.main img {
  width: 200px;
  border: solid 1px #CCC ;
}
.slide-item  {
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  position: relative;
}
.slide-item img {
  border-radius: 8px 8px 0 0;
  width: 100%;
}
.slide-item img:hover {
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.29);
}
.slide-item .image-container {
  border-radius: 8px;
}
.slide-item .image-container:hover {
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.29);
  transform: translateY(5px);
}
footer {
  background: #191622;
  color: white;
  border-radius: 0 0 8px 8px ;
  padding: 5px;
}

</style>