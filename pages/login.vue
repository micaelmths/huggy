<template>
  <div class="container">
    <div class="login d-flex justify-self-center">
      <aside class="px-2 d-flex align-items-center justify-content-center">
        <img src="../assets/images/huggySlogan.png" alt="Huggy slogan" />
      </aside>
      <form action="">
        <input v-model="email" type="text" placeholder="Digite seu e-mail" />
        <input
          v-model="password"
          type="password"
          placeholder="Digite sua senha"
        />
        <button
          @click.prevent="handleLoginButton(email, password)"
          class="btn btn-primary"
        >
          <p v-if="!loading">Entrar</p>
          <p v-else class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </p>
        </button>
        <p>
          Esqueceu sua senha?
          <NuxtLink class="text-primary" to="/recover-password">Clique aqui!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["handleLogin"]),
    handleLoginButton() {
      this.loading = true
      setTimeout(()=>{
        this.handleLogin()
      }, 1000)
      this.loading = false
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;
}
.login {
  width: 700px;
  height: 600px;
  background:#ddd ;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.login aside {
  width: 55%;
  background: #ddd;
}

.login form {
  display: flex;
  flex-direction: column;
  width: 45%;
  background: white;
  align-items: center;
  justify-content: center;
  border-radius: 0 8px 8px 0 ;
}
.login form input[type="password"] {
  margin: 10px 0;
}
.login form input {
  border: none;
  border-radius: 8px;
  height: 35px;
  width: 230px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
}
</style>