<template>
  <transition mode="out-in">
    <form class="adicionar-produto">
      <div class="check">
        <input id="kilo" type="checkbox" @click="updateIsFraction($event)" />
        <label for="kilo">Item por kilo</label>
      </div>

      <div class="check">
        <input id="nota" type="checkbox" @click="updateIsNota($event)" />
        <label for="nota">É uma nota</label>
      </div>

      <input
        v-if="isNota"
        id="notatag"
        name="notatag"
        type="text"
        v-model="nota.tags"
        placeholder="Nota Tags"
        key="tags"
      />

      <input id="nome" name="nome" type="text" v-model="item.name" placeholder="Nome" />

      <input id="tag" name="tag" type="text" v-model="item.tags" placeholder="Tag" />

      <div class="price-data">
        <input
          id="preco"
          name="preco"
          type="number"
          v-model="item.priceData[0].price"
          placeholder="Preço"
        />

        <input
          id="marca"
          name="marca"
          type="text"
          v-model="item.priceData[0].brand"
          placeholder="Marca"
        />

        <input
          id="local"
          name="local"
          type="text"
          v-model="item.priceData[0].local"
          placeholder="Local"
        />

        <datetime placeholder="Data" type="datetime" v-model="temptimestemp"></datetime>
      </div>
      <transition-group v-if="isFraction" mode="out-in" class="kg-input">
        <input
          id="kg"
          name="kg"
          type="number"
          v-model="item.priceData[0].kgData.kg"
          placeholder="Kg"
          key="kg"
        />
        <input
          id="kgPrice"
          name="kgPrice"
          type="number"
          v-model="item.priceData[0].kgData.kgPrice"
          placeholder="Preço do Kg"
          key="kgp"
        />
      </transition-group>

      <input
        id="add-item"
        class="btn"
        type="button"
        value="Adicionar Produto"
        @click.prevent="salvar"
      />

      <input
        v-if="isNota"
        id="add-nota"
        class="btn"
        type="button"
        value="Adicionar Nota"
        @click.prevent="salvarNota"
      />
      <Aviso v-if="aviso.mensagem" :mensagem="aviso.mensagem" :tipo="aviso.tipo" />
    </form>
  </transition>
</template>

<script>
import { itemServices } from "../services/ItemServices";
import { tagServices } from "../services/TagServices";
import { notaServices } from "../services/NotaServices";
import Aviso from "@/components/Aviso.vue";
export default {
  name: "ProdutosAdicionar",
  components: {
    Aviso
  },
  async mounted() {
    await this.fetchItems();
    // await this.fetchTags();
  },
  data() {
    return {
      aviso: {
        mensagem: null,
        tipo: null
      },
      items: [],
      itemsName: [],
      tags: "",
      isFraction: false,
      isNota: false,
      temptimestemp: "",
      nota: {
        tags: "",
        timestamp: "",
        items: [],
        local: ""
      },
      item: {
        nome: "",
        tags: "",
        priceData: [
          {
            kgData: {
              kg: "",
              kgPrice: ""
            },
            price: "",
            brand: "",
            timestamp: 0,
            local: ""
          }
        ]
      }
    };
  },
  methods: {
    updateIsFraction(event) {
      if (event.target.checked) {
        this.isFraction = true;
      } else {
        this.isFraction = false;
      }
    },
    updateIsNota(event) {
      if (event.target.checked) {
        this.isNota = true;
      } else {
        this.isNota = false;
      }
    },
    async adicionarItem() {
      this.items = [];
      this.formataItem();
      itemServices.createItem(this.item).then(res => {
        if (this.isNota) {
          this.nota.items.push(res.data.item._id);
          console.log(this.nota);
        }
        if (res.status === 201) {
          this.disparaAviso("Item criado com sucesso", "success");
        }
      });
    },
    disparaAviso(mensagem, tipo) {
      this.aviso = { mensagem: mensagem, tipo: tipo };
      setTimeout(() => {
        this.aviso = { mensagem: null, tipo: null };
        document.getElementById("add-item").style.background = "yellow";
        document.getElementById("add-item").disabled = false;
      }, 3000);
    },
    async formataItem() {
      this.item.priceData[0].timestamp = await new Date(
        this.temptimestemp
      ).getTime();
      if (this.item.tags) {
        this.item.tags = this.item.tags.split(",").map(e => e.trim());
      }
    },
    async salvar() {
      document.getElementById("add-item").style.background = "#ccc";
      document.getElementById("add-item").disabled = true;
      if (this.itemsName.includes(this.item.name.toUpperCase())) {
        await this.update();
      } else {
        await this.adicionarItem();
      }
      await this.$store.dispatch("getItems");
      this.fetchItems();
    },
    salvarNota() {
      this.nota.timestamp = new Date(this.temptimestemp).getTime();
      this.nota.tags = this.nota.tags.split(",").map(e => e.trim());
      this.nota.local = this.item.priceData[0].local;
      notaServices.createNota(this.nota).then(res => {
        if (res.status === 201) {
          this.disparaAviso("Nota adicionada com Sucesso", "success");
        }
      });
    },
    async update() {
      await this.formataItem();
      itemServices
        .atualizaPriceData(this.item.name, this.item.priceData[0])
        .then(res => {
          console.log(res);
          if (res.res.status === 204) {
            this.nota.items.push(res.item._id);
            this.disparaAviso("Item atualizado com sucesso", "success");
          }
        });
    },
    async fetchItems() {
      const items = await itemServices.fetchItems();
      this.items = items.data.items;
      await this.getNames();
    },
    getNames() {
      this.items.forEach(e => {
        this.itemsName.push(e.name.toUpperCase());
      });
    }
  }
};
</script>

<style scoped>
label,
.kg-input,
input,
.tags,
.price-data {
  grid-column: 2;
}

.check-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

#nota {
  grid-column: 2;
}

.notatag {
  grid-column: 2;
}

.check {
  display: inline;
  grid-column: 2;
}

.check label {
  margin-left: 20px;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  color: #d4af37;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: white;
}

#data {
  grid-column: 4;
}

.price-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.price-data #preco {
  grid-column: 1;
}

.price-data #local {
  grid-column: 3;
}

.kg-input {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
}

.nota-input {
  display: grid;
  grid-template-columns: 1fr;
}

.nota-input input {
  grid-column: 1;
}

select {
  background: white;
}

#kg {
  grid-column: 1;
}

.adicionar-produto {
  display: grid;
  grid-template-columns: 1fr 900px 1fr;
  align-items: center;
  margin-bottom: 60px;
  min-width: 300px;
}

.btn {
  grid-column: 2;
}
</style>