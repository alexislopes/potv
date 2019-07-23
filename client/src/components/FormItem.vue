<template>
    <form @submit.prevent="insert">
        <input required v-model="name" type="text" name="name" placeholder="nome">
        <input required v-money="money" v-model="price" type="text" name="price" maxlength="15" placeholder="preço">
        <input required v-model="brand" name="brand" type="text" placeholder="marca">
        <!-- <input v-mask="['##/##/####']" v-model="timestamp" name="timestamp" placeholder="data"> -->
        <flat-pickr required v-model="timestamp" :config="config"></flat-pickr>
        <input required v-model="local" type="type" name="local" placeholder="local">
        <input type="submit">
    </form>
</template>

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
                defaultDate: new Date().getTime()
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

