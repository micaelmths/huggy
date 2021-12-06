<template>
  <div class="container">
    <div class="recover d-flex justify-self-center">
      <aside class="px-2 d-flex align-items-center justify-content-center">
        <img src="../assets/images/huggySlogan.png" alt="Huggy slogan" />
      </aside>
      <form action="">
        <input v-model="email" type="text" placeholder="Digite seu e-mail" />
        <button
          @click.prevent="handleSendEmail"
          class="btn btn-primary"
        >
          Recuperar senha
        </button>
        <NuxtLink class="mt-1" to="/login">Voltar para o login!</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSendEmail() {
      alert(`Um email com intruções foi enviado para ${this.email}`)
      this.email = ''
    }
  }
  
}
</script>

<style scoped>
.container{
  display: flex;
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;
}
.recover {
  width: 700px;
  height: 600px;

  border: 1px solid #EEE;
  border-radius: 8px;
}

.recover aside {
  width: 55%;
  background: #DDD;
}

.recover form {
  display: flex;
  flex-direction: column;
  width: 45%;
  align-items: center;
  justify-content: center;
}
.recover form input {
  border: none;
  border-radius: 8px;
  height: 35px;
  width: 230px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  margin-bottom: 10px;
}

</style>