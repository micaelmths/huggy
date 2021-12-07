<template>
  <div
    class="app-top-bar d-flex align-items-center justify-content-between px-3"
  >
    <NuxtLink to="/">
      <img src="../assets/images/logoHuggy.svg" alt="" />
    </NuxtLink>
    <h2>Filmes</h2>
    <div v-if="isIndex" class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">
          <font-awesome-icon :icon="['fas', 'search']"/>
        </span>
      </div>
      <input
        @keypress.enter="evtSearch()"
        type="text"
        class="form-control"
        placeholder="Buscar"
        v-model="searchTerm"
      />
      <button @click.prevent="handleLogout" class="btn btn-danger ml-3 col-1">
        
          <font-awesome-icon style="font-size: 24px" :icon="['fas', 'sign-out-alt']"/>
        
      </button>
    </div>
    <button v-else  @click.prevent="$router.push('/')" class="btn btn-primary">Voltar</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    isIndex() {
      if(this.$route.name === 'index') {

        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(["handleLogout"]),
    evtSearch() {
      if(!this.searchTerm) return
      this.$emit('evtSearch', {
        term: this.searchTerm
      })
    },
    evtDisableSearch() {
      this.$emit('evtDisableSearch')
    }
  },
};
</script>

<style scoped>
.app-top-bar {
  background: #263645;
  color: white;
  width: 100%;
  height: 70px;
}

.icon {
  font-size: 28px;
}
a {
  width: 300px;
}
button {
  width: 164px;
  height: 40px;
}
.input-group {
  width: 600px;
}
.form-control {
  height: 42px;
}
</style>