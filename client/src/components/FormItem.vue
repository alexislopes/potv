<template>
    <form class="box container" @submit.prevent="insert">
        <div class="field">
            <div class="control">
                <input class="inputx" type="text" required v-model="name" name="name" placeholder="Nome">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input class="input" required v-money="money" v-model="price" type="text" name="price" maxlength="15" placeholder="Preço">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input class="input" required v-model="brand" name="brand" type="text" placeholder="Marca">
            </div>
        </div>
        
        <div class="field is-primary">
            <flat-pickr id="timestamp" required v-model="timestamp" :config="config"></flat-pickr>
        </div>
        <div class="field">
            <div class="control">
        <input class="input" required v-model="local" type="type" name="local" placeholder="Local">
        </div>
        </div>

        <div class="field">
            <div class="control">
                <input id="btn-salvar" class="button is-dark" value="Salvar" type="submit">
            </div>
        </div>
    </form>
</template>

<style>
.box {
    width: 90%;
}

#btn-salvar {
    width: 100%;
}
</style>


<script lang="ts">
import Vue from 'vue'
import axios from "axios"
import { mask } from "vue-the-mask"
import { VMoney } from "v-money"
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Portuguese } from "flatpickr/dist/l10n/pt.js"

export default Vue.extend({
    data(){
        return {
            name: null,
            price: "0,00",
            timestamp: new Date().getTime(),
            local: null,
            brand: null,
            money: {
                decimal: ',',
                thousands: '.',
                // prefix: 'R$ ',
                // suffix: ' #',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            config: {
                locale: Portuguese,
                enableTime: true,
                altInput: true,
                altFormat: "d/m/Y",
                // dateFormat: "d/m/Y - H:i",
                dateFormat: "F d, Y H:i:s",
                defaultDate: new Date().getTime(),
                maxDate: new Date(), 
                disableMobile: true
            }
        }
    },
    methods: {
        insert(){    
            let timestamp = new Date(this.timestamp).getTime();
            const item = { name: this.name, priceData: { price: this.price, brand: this.brand, timestamp: timestamp, local: this.local }}
            
            console.log("insert!!")
            console.log(item);
            axios.post("/item", item).then((res) => {
                console.log(res);
                if(res.status === 201){
                    console.log("criou");
                }
            })
        }
    }, 
    components: {
        flatPickr
    },
    directives: {
        mask,
        money :VMoney 
    }
})
</script>

