<template>
  <div class="home">
    <AppTopBar @evtSearch="searchMovies($event)"/>
    <main v-if="!isSearch" class="d-flex flex-column">
      <h3 v-if="favoriteMovies.length">Favoritos</h3>
      <Carousel v-if="favoriteMovies.length" :perPage="5" class="carousel p-2 d-flex justify-content-center">
        <Slide
          v-for="movie in favoriteMovies"
          :key="movie.id"
          class="slide-item"
        >
          <NuxtLink :to="`movie/${movie.id}`" class="image-container">
            <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face'+ movie.backdrop_path" alt="">
            <footer class="status-bar">
              <p>{{ movie.title}}</p>
              <span>Avaliação: <p class="badge badge-pill badge-warning">{{ movie.vote_average | averagePercent}}%</p></span>
            </footer>
            <button @click.prevent="handleToggleFavoriteMovie(movie)" class="favorite-icon btn" :class="favorito(movie)"><font-awesome-icon :icon="['fas', 'heart']"/></button>
          </NuxtLink>
        </Slide>
      </Carousel>
      <h3>Em breve</h3>
      <div>
      <!-- EM BREVE FILMES -->
      <Carousel :perPage="5" class="carousel p-2 d-flex justify-content-center">
        <Slide
          v-for="movie in moviesUpcoming"
          :key="movie.id"
          class="slide-item"
        >
          <NuxtLink :to="`movie/${movie.id}`" class="image-container">
            <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face'+ movie.backdrop_path" alt="">
            <footer class="status-bar">
              <p>{{ movie.title}}</p>
              <span>Avaliação: <p class="badge badge-pill badge-warning">{{ movie.vote_average | averagePercent}}%</p></span>
            </footer>
            <button @click.prevent="handleToggleFavoriteMovie(movie)" class="favorite-icon btn" :class="favorito(movie)"><font-awesome-icon :icon="['fas', 'heart']"/></button>
          </NuxtLink>
        </Slide>
      </Carousel>
      </div>

      <!-- TOP FILMES -->
      <h3>Mais bem avaliados</h3>
      <Carousel :perPage="5" class="carousel p-2 d-flex justify-content-center">
        <Slide
          v-for="movie in moviesTopRated"
          :key="movie.id"
          class="slide-item"
        >
        <NuxtLink :to="`movie/${movie.id}`" class="image-container">
          <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face'+ movie.backdrop_path" alt="">
          <footer class="status-bar">
            <p>{{ movie.title}}</p>
            <span>Avaliação: <p class="badge badge-pill badge-warning">{{ movie.vote_average | averagePercent}}%</p></span>
          </footer>
          <button @click.prevent="handleToggleFavoriteMovie(movie)" class="favorite-icon btn" :class="favorito(movie)"><font-awesome-icon :icon="['fas', 'heart']"/></button>
        </NuxtLink>
        </Slide>
      </Carousel>
    </main>
    <div class="text-center mt-4">
      <button v-if="isSearch"  @click.prevent="isSearch = false" class="btn btn-primary mb-4">Voltar</button>
    </div>
    <main v-if="isSearch" class="container">
    <h3 class="text-center" v-if="!resultSearch.length">Desculpe, não encontramos seu filme</h3>

      <div class="movie" v-for="movie in resultSearch" :key="movie.id">
        <NuxtLink :to="`movie/${movie.id}`" class="image-container">
          <img :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.backdrop_path || movie.poster_path}`" :alt="movie.title">
          <footer class="status-bar" style="width: 220px">
            <p>{{ movie.title}}</p>
            <span>Avaliação: <p class="badge badge-pill badge-warning">{{ movie.vote_average | averagePercent}}%</p></span>
          </footer>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      favoriteMovies: [],
      isSearch: false,
      resultSearch: []
    }
  },
  computed: {
    ...mapState(['moviesUpcoming','moviesTopRated']),
  },
  methods: {
    ...mapActions(['getMoviesUpcoming','getMoviesTopRated']),
    handleToggleFavoriteMovie(movie) {
      if(this.favoriteMovies.length === 0) {
        this.favoriteMovies.push(movie)
        return
      }

      const result = this.favoriteMovies.find( m => m.id === movie.id)
      
      result ? this.favoriteMovies.splice(this.favoriteMovies.indexOf(movie), 1) : this.favoriteMovies.push(movie)
    },
    favorito(movie) {
      const result = this.favoriteMovies.find( m => m.id === movie.id)

      return result ? 'favorite-icon-active' : ''
    },
    async searchMovies({term}) {
      this.isSearch = true
      const { results } = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${term}&language=pt-BR`)
      this.resultSearch = results
    },
    disableSearch() {
      console.log('asbgvasçj')
      this.isSearch = false
    }
  },
  async mounted() {
    await this.getMoviesUpcoming()
    await this.getMoviesTopRated()
  }
};
</script>
<style scoped>
.home {
  height: 100%;

}
main {
  height: 100%;
  padding: 0 50px;
}
.slide-item  {
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  position: relative;
}
.slide-item img {
  border-radius: 8px 8px 0 0 ;
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
.favorite-icon {
  color: white;
  position: absolute;
  right: 15px;
  top: 15px;
}

.favorite-icon-active {
  color: red;
}
.container-search {
  width: 100%;
}

input {
  border: none;
  border-radius: 8px;
  height: 35px;
  width: 500px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
}

footer {
  background: #191622;
  color: white;
  border-radius: 0 0 8px 8px ;
  padding: 5px;
}

.container {
  display: grid;
  width: 100%;
  justify-content: center;
  gap: 30px 80px;
  grid-template: auto / repeat(4, 1fr);
}
</style>
