<template>
  <form class="ui form container" @submit.prevent="salvar">
    <div class="field">
      <input type="text" required v-model="name" name="name" placeholder="Nome" />
    </div>

    <div class="field">
      <sui-dropdown
        v-model="selectTags"
        multiple
        fluid
        :options="tags"
        placeholder="Tags"
        search
        selection
      />
    </div>

    <div class="field">
      <input
        required
        v-money="money"
        v-model="price"
        type="text"
        name="price"
        maxlength="15"
        placeholder="Preço"
      />
    </div>

    <div class="field">
      <input v-model="brand" name="brand" type="text" placeholder="Marca" />
    </div>

    <div class="field">
      <flat-pickr id="timestamp" required v-model="timestamp" :config="config"></flat-pickr>
    </div>

    <div class="field">
      <input required v-model="local" type="text" name="local" placeholder="Local" />
    </div>

    <div class="field">
      <input id="btn-salvar" class="ui secondary button" value="Salvar" type="submit" />
    </div>
  </form>
</template>

<style>
.box {
  width: 90%;
}

#btn-salvar {
  float: left;
  text-align: center;
}
</style>


<script lang="js">



import Vue from 'vue'
import axios from "axios"
import { mask } from "vue-the-mask"
import { VMoney } from "v-money"
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Portuguese } from "flatpickr/dist/l10n/pt.js"



export default Vue.extend({
    async mounted(){
        await this.fetchItems();
        await this.fetchTags();
        this.getNames();
    },
    data(){
        return {
            name: "",
            price: "0,00",
            timestamp: new Date().getTime(),
            local: null,
            brand: null,
            money: {
                decimal: ',',
                thousands: '.',
                //prefix: 'R$ ',
                // suffix: ' #',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            config: {
                enableTime: true,
                altInput: true,
                altFormat: "d/m/Y",
                // dateFormat: "d/m/Y - H:i",
                dateFormat: "D, d M Y H:i:ss",
                defaultDate: new Date().getTime(),
                maxDate: new Date(), 
                disableMobile: true
            },
            items: [],
            itemsName: [],
            selectTags: null,
            tags: []
        }
    },
    methods: {
        insert(){    
            let timestamp = new Date(this.timestamp).getTime();
            const item = { name: this.name, tags: this.selectTags, priceData: { price: this.price, brand: this.brand, timestamp: timestamp, local: this.local }}
            axios.post("/item", item).then((res) => {
                if(res.status === 201){
                    alert("criou: " + res.data.item.name);
                }
            })
            console.log("vues: ", this.timestamp)
            console.log("let: ", timestamp)
            
        },
        async update() {
            let timestamp = new Date(this.timestamp).getTime();
            let priceData = { price: this.price, brand: this.brand, timestamp: timestamp, local: this.local }
            const name = { name: this.name }
            var item = { _id: "1" };
            
            await axios.get("/itemByName", { params: name}).then((res) => {
                item = res.data.item[0];
            });
            const id = item._id;


            axios.patch("/item", { id: id, priceData: priceData }).then((res) => {
                if(res.status === 204){
                    alert("atualizou: " + res.data.name);
                }
            })
        },
        salvar() {
            if (this.itemsName.includes(this.name.toUpperCase())){
                this.update();
            } else {
                this.insert();
            }
        },
        async fetchTags() {
            let tags = [];
            await axios.get("/tag").then(res => { tags = res.data.tags })
            tags.forEach(e => {
                this.tags.push({ key: e._id, value: e._id, text: e.name })
            })
            console.log(tags);
        },
        async fetchItems(){
            await axios.get("/item").then(res => { this.items = res.data.items })
        },
        getNames(){
            this.items.forEach(e => {
                this.itemsName.push(e.name.toUpperCase());
            });
        }
        
    },
    components: {
        flatPickr,
    },
    directives: {
        mask,
        money :VMoney
    }
})
</script>
