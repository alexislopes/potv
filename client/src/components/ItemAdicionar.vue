<template>
  <transition mode="out-in">
    <form class="adicionar-produto">
      <div class="check">
        <input id="kilo" type="checkbox" @click="updateIsFraction($event)" />
        <label for="kilo">Item por kilo</label>
      </div>
      <!-- <label for="nome">Nome</label> -->
      <input id="nome" name="nome" type="text" v-model="item.name" placeholder="Nome" />

      <input id="tag" name="tag" type="text" v-model="item.tags" placeholder="Tag" />

      <!-- <select>
        <option>Escolha algumas Tags</option>
        <option v-for="tag in tags" :value="tag._id">{{tag.name}}</option>
      </select>-->

      <!-- <sui-dropdown
        class="tags"
        multiple
        fluid
        :options="tags"
        placeholder="Tags"
        search
        selection
        allow-additions
        v-model="item.tags"
      />-->

      <!-- <label for="preco">Preço</label> -->
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

        <!-- <input
          id="data"
          name="data"
          type="text"
          v-model="item.priceData[0].timestamp"
          placeholder="Data"
        />-->
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

      <!-- <label for="fotos">fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos" />

    <label for="descricao">Descrição</label>
      <textarea name="descricao" id="descricao"></textarea>-->

      <input class="btn" type="button" value="Adicionar Produto" @click.prevent="salvar" />
    </form>
  </transition>
</template>

<script>
import { itemServices } from "../services/ItemServices";
import { tagServices } from "../services/TagServices";
export default {
  name: "ProdutosAdicionar",
  async mounted() {
    await this.fetchItems();
    // await this.fetchTags();
    this.getNames();
  },
  data() {
    return {
      items: [],
      itemsName: [],
      tags: [],
      isFraction: false,
      temptimestemp: "",
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
      },
      produto: {
        name: "",
        preco: "",
        descricao: "",
        fotos: null,
        priceData: ""
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
    async adicionarItem() {
      await this.formataItem();
      itemServices.createItem(this.item);
    },
    async formataItem() {
      this.item.priceData[0].timestamp = await new Date(
        this.temptimestemp
      ).getTime();
    },
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario._id;
      this.produto.priceData = [
        {
          price: "1.99",
          brand: "Ana Maria",
          timestamp: 1565563330105,
          local: "Shibata"
        }
      ];
    },
    async adicionarProduto() {
      await this.formatarProduto();
      itemServices.createItem(this.produto).then(() => {
        this.$store.dispatch("getUsuarioProdutos");
      });
    },
    salvar() {
      if (this.itemsName.includes(this.item.name.toUpperCase())) {
        this.update();
      } else {
        this.adicionarItem();
      }
    },
    async update() {
      // let timestamp = new Date(this.timestamp).getTime();
      await this.formataItem();
      await itemServices.atualizaPriceData(
        this.item.name,
        this.item.priceData[0]
      );
    },
    async fetchItems() {
      const items = await itemServices.fetchItems();
      this.items = items.data.items;
    },
    getNames() {
      this.items.forEach(e => {
        this.itemsName.push(e.name.toUpperCase());
      });
    }
  },
  async created() {
    // let tags = await tagServices.fetchTags();
    // this.tags = tags.data.tags;
    // console.log(this.tags);
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