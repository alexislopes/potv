<template>
    <form @submit.prevent="insert">
        <input v-model="name" type="text" name="name" placeholder="nome">
        <input v-money="money" v-model="price" type="text" name="price" maxlength="15" placeholder="preço">
        <input v-mask="['##/##/####']" v-model="timestamp" name="timestamp" placeholder="data">
        <input v-model="local" type="type" name="local" placeholder="local">
        <input type="submit">
    </form>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from "axios"
import { mask } from "vue-the-mask"
import { VMoney } from "v-money"

export default Vue.extend({
    data(){
        return {
            name: null,
            price: null,
            timestamp: null,
            local: null,
            money: {
                decimal: ',',
                thousands: '.',
                // prefix: 'R$ ',
                // suffix: ' #',
                precision: 2,
                masked: false /* doesn't work with directive */
            }
        }
    },
    methods: {
        insert(){
            let times = null
            if(this.timestamp === null){
                times = new Date().getTime()
            }
            
            const item = { name: this.name, priceData: { price: this.price, timestamp: this.timestamp, local: this.local }}
            console.log("insert!!")
            console.log(times)
            console.log(item);
            axios.post("/item", item).then((res) => {
                console.log(res);
                if(res.status === 201){
                    console.log("criou");
                }
            })
        }
    }, 
    directives: {
        mask,
        money :VMoney 
    }
})
</script>

