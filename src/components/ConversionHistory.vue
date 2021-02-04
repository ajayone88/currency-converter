<template>
    <div class="container">
        <h1>Conversion History</h1>
        <base-card v-if="getConversionHistory.length === 0" class="container_content">
            <h1>Not conversion history present</h1>
        </base-card>
        <base-card v-else class="container_content">
            <div v-for="item in getConversionHistory" 
                :key="item.dateTime"
                class="card">
                <h1>{{item.inputCurrency}} {{ item.inputCurrencyCode }}</h1>
                <p>to</p>
                <h1>{{item.outputCurrency}} {{item.outputCurrencyCode}}</h1>
                <p class="date">on {{item.dateTime.toLocaleDateString()}}</p>
            </div>
        </base-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseCard from '../UI/BaseCard.vue';
export default {
  components: { BaseCard },
    data(){
        return{};
    },
    computed:{
        ...mapGetters(['getConversionHistory'])
    }
}
</script>

<style scoped>
    .container{
        min-height:100vh;
    }
    .container_content{
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items:center;
    }
    .container_content .card{
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        max-width:250px;
        padding:10px;
        margin:10px;
        background-color: #6930c3;
        border-radius:6px;
    }

    h1{
        text-align: center;
    }
    .card .date{
        border-top:1px solid white;
        padding-top:10px;
    }
</style>