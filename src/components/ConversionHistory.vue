<template>
    <div v-if="getConversionHistory.length === 0" class="container">
        <h1>Not converion history present</h1>
    </div>
    <div v-else class="container">
        <ul>
            <li v-for="item in getConversionHistory" :key="item.dateTime">
                <div class="transfer_data">
                    <span>Transfer Amount: {{item.inputCurrency}} {{ item.inputCurrencyCode }}</span>
                </div>
                 <div class="received_data">
                    <span>Received Amount: {{item.outputCurrency}} {{item.outputCurrencyCode}}</span>
                </div>
                <div class="date_time">
                    <span>Date: {{item.dateTime.toLocaleDateString()}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
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
        height:100vh;
        padding:32px;
        background-color: #f9f871;
    }
    ul{
        list-style: none;
        margin:0px auto;
    }
    li{
        cursor: pointer;
        background-color:white;
        width:100%;
        padding:8px;
        margin:4px;
        box-shadow: 3px 3px 10px black;
        display:flex;
        justify-content: space-around;
    }
    li:hover{
        box-shadow: 3px 3px 10px grey;
    }
    .transfer_data{
        margin:4px;
    }
    .received_data{
        margin:4px;
    }
    .date_time{
        margin:4px;
    }
    @media(max-width: 768px){
         .contianer{
             padding:32px 4px;
         }
         li{
             padding:0px;
         }
     }
</style>