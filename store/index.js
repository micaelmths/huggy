const baseURL = 'https://api.themoviedb.org/3'

export const state = () => ({
  moviesUpcoming: [],
  moviesTopRated: [],
})

export const mutations = {
  SET_MOVIES_UPCOMING: (state, payload) => {
    state.moviesUpcoming = payload
  },
  SET_MOVIES_TOP_RATED: (state, payload) => {
    state.moviesTopRated = payload
  }
}

export const actions = {
  async handleLogin(payload) {
    try {
      await this.$auth.loginWith('local', {data: payload})
    } catch (err) {
      console.log(err)
    }
  },
  async handleLogout() {
    try {
      await this.$auth.logout(/* .... */)
    } catch (err) {
      console.log(err)
    }
  },

  async getMoviesUpcoming({ commit }) {
    const response = await this.$axios.$get(`${baseURL}/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=pt-BR`)
    commit('SET_MOVIES_UPCOMING', response.results)
  },
  async getMoviesTopRated({ commit }) {
    const response = await this.$axios.$get(`${baseURL}/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=pt-BR`)
    commit('SET_MOVIES_TOP_RATED', response.results)
  },
  async getRecommendations({_},payload) {
    console.log('payload', payload)
    const {results} = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${payload.id}/recommendations?api_key=${process.env.TMDB_KEY}&language=pt-BR`)
    return results
  }
}