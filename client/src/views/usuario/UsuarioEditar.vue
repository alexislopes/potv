<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { userServices } from "@/services/UserServices";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
  methods: {
    atualizarUsuario() {
      userServices
        .atualizaUsuario({
          id: this.$store.state.usuario._id,
          user: this.$store.state.usuario
        })
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>