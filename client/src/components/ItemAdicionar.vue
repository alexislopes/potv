<template>
  <transition class="transition" mode="out-in">
    <form class="adicionar-produto">
      <div class="check">
        <input id="kilo" type="checkbox" @click="updateIsFraction($event)" />
        <label for="kilo">Fração</label>
        <input id="nota" type="checkbox" @click="updateIsNota($event)" />
        <label for="nota">É uma nota</label>
      </div>

      <div class="nota-info">
        <input
          v-if="isNota"
          id="notatag"
          name="notatag"
          type="text"
          v-model="notatags"
          placeholder="Nota Tags"
          key="tags"
        />
        <input
          v-if="isNota"
          id="itemqtd"
          name="itemqtd"
          type="number"
          v-model="quantity"
          placeholder="Quantidade"
          key="qtd"
        />
      </div>
      <input
        v-if="isNota"
        id="nota-title"
        name="nota-title"
        type="text"
        v-model="nota.title"
        placeholder="Descrição"
        key="desc"
      />

      <input
        @keyup="keyReleased"
        @keydown="keyPressed"
        id="nome"
        name="nome"
        type="text"
        v-model="item.name"
        placeholder="Nome"
      />

      <input id="tag" name="tag" type="text" v-model="itemtags" placeholder="Tag" />

      <div class="price-data">
        <input id="preco" name="preco" type="number" v-model="priceData.price" placeholder="Preço" />

        <input id="marca" name="marca" type="text" v-model="priceData.brand" placeholder="Marca" />

        <input id="local" name="local" type="text" v-model="priceData.local" placeholder="Local" />

        <datetime placeholder="Data" type="datetime" v-model="temptimestemp"></datetime>
      </div>
      <transition-group v-if="isFraction" mode="out-in" class="kg-input">
        <input
          id="kg"
          name="kg"
          type="number"
          v-model="priceData.kgData.kg"
          placeholder="Kg"
          key="kg"
        />
        <input
          id="kgPrice"
          name="kgPrice"
          type="number"
          v-model="priceData.kgData.kgPrice"
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
    </form>
  </transition>
</template>

<script>
import { itemServices } from "../services/ItemServices";
import { tagServices } from "../services/TagServices";
import { notaServices } from "../services/NotaServices";
import { priceDataServices } from "../services/PriceDataServices";
import Nota from "@/models/Nota.ts";

export default {
  name: "ItemAdicionar",
  components: {},
  async mounted() {
    await this.fetchItems();
    await priceDataServices.find();
    // await this.fetchTags();
  },

  data() {
    return {
      typingTimer: null,
      interval: 1500,
      items: [],
      itemsName: [],
      notatags: "",
      itemtags: "",
      isFraction: false,
      isNota: false,
      temptimestemp: "",
      nota: {
        tags: "",
        timestamp: "",
        items: [],
        local: "",
        title: ""
      },
      quantity: "",
      id: "",
      item: {
        nome: "",
        name_lower: "",
        tags: "",
        priceData: []
      },
      priceData: {
        kgData: { kg: "", kgPrice: "" },
        price: "",
        brand: "",
        timestamp: 0,
        local: ""
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
      let priceData = "";
      this.formataItem();
      await priceDataServices.create(this.priceData).then(res => {
        this.item.priceData.push(res._id);
        priceData = res._id;
      });
      await itemServices.createItem(this.item).then(res => {
        if (this.isNota) {
          this.nota.items.push({
            item: res.data.item._id,
            quantity: this.quantity,
            fixedPriceData: priceData
          });
        }
        if (res.status === 201) {
          this.$store.dispatch("updateAviso", {
            mensagem: "Item criado!",
            tipo: "success"
          });
        }
      });
    },
    async formataItem() {
      this.priceData.timestamp = await new Date(this.temptimestemp).getTime();
      if (this.itemtags) {
        this.item.tags = this.itemtags.split(",").map(e => e.trim());
      }
      this.item.name_lower = this.item.name.toLowerCase();
    },
    async salvar() {
      if (this.id) {
        await this.update();
      } else {
        await this.adicionarItem();
      }
      await this.$store.dispatch("getItems");
      this.fetchItems();
    },
    salvarNota() {
      this.nota.timestamp = new Date(this.temptimestemp).getTime();
      if (this.notatags) {
        this.nota.tags = this.notatags.split(",").map(e => e.trim());
      }
      this.nota.local = this.priceData.local;
      const nota = new Nota(this.nota);

      notaServices.createNota(nota).then(res => {
        if (res.status === 201) {
          this.$store.dispatch("updateAviso", {
            mensagem: "Nota criada!",
            tipo: "success"
          });
        }
      });
    },
    async update() {
      let priceData = "";
      await this.formataItem();
      await priceDataServices.create(this.priceData).then(res => {
        if (res) {
          priceData = res._id;

          this.item.priceData.push(res._id);
          itemServices.atualizaItem(this.id, this.item).then(res => {
            if (this.isNota) {
              this.nota.items.push({
                item: this.id,
                quantity: this.quantity,
                fixedPriceData: priceData
              });
            }
            this.$store.dispatch("updateAviso", {
              mensagem: "Item atualizado!",
              tipo: "success"
            });
          });
        }
      });
    },
    keyReleased() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.fetchItemName();
      }, this.interval);
    },
    keyPressed() {
      clearTimeout(this.typingTimer);
    },
    fetchItemName() {
      itemServices.fetchItemByName(this.item.name).then(res => {
        if (res) {
          this.id = res.id;
          res.priceData.forEach(priceData => {
            this.item.priceData.push(priceData._id);
          });
          this.$store.dispatch("updateAviso", {
            mensagem: "Item recuperado!",
            tipo: "success"
          });
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
.transition {
  margin-top: 60px;
}

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

.nota-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: 2;
  grid-gap: 20px;
}

#nota {
  grid-column: 2;
}

#notatag {
  grid-column: 1;
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

#nota {
  margin-left: 20px;
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
  margin-top: 60px;
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