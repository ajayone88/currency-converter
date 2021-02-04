<template>
    <div class="container">
        <base-card>
            <div class="container_content">
                <form>
                    <h3 for="inputCurrency">You Have</h3>
                    <div class="form-group">
                        <input 
                            id="inputCurrency" 
                            type="number"
                            @input ="calculateConversion('inputCurrency');"
                            v-model="inputCurrency"/>
                        <select v-model="inputCurrencyCode">
                            <option 
                                v-for="(value, key) in currentRates" 
                                :key="key" :value="key">{{ key }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <h1 class="image" @click="exchange">↕️</h1>
                        <!-- <img class="image" @click="exchange" src="../assets/refresh.png" alt="Exchange"/> -->
                    </div>   
                    <h3 for="outputCurrency">You Get</h3>
                    <div class="form-group">
                        <input 
                            id="outputCurrency" 
                            type="number" 
                            @input ="calculateConversion('outputCurrency');"
                            v-model="outputCurrency" />
                        <select v-model="outputCurrencyCode">
                            <option 
                                v-for="(value, key) in currentRates" 
                                :key="key" :value="key">{{ key }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn" @click.prevent="convert">Convert</button>
                    </div>
                </form>
                <div class="container_content column" v-if="currentRates">
                    <h2>Your conversion rate is:</h2>
                    <h1 for="inputCurrency" 
                        class="form-label">{{currentRates[inputCurrencyCode].toFixed(4)}} {{ inputCurrencyCode }}</h1>
                    <h1>=</h1>
                    <h1 for="outputCurrency" 
                        class="form-label">{{currentRates[outputCurrencyCode].toFixed(4)}} {{ outputCurrencyCode }}</h1>
                </div>
           </div>
        </base-card>
        <base-card>
            <chart 
                :sourceCode="inputCurrencyCode" 
                :targetCode="outputCurrencyCode"
                :graphData="getExchangeRatesForBaseBetweenDates"
                @selected-date="fetchPreviousExchangeRates" 
            ></chart>
        </base-card>
        <teleport to="body">
            <dialog-card v-if="showDialog">
                <h1>Transfer done</h1>
                <button type="button" class="btn" @click="showDialog = !showDialog">Close</button>
            </dialog-card>
        </teleport>
    </div>
</template>

<script>
import baseCard from "../UI/BaseCard.vue";
import chart from "../charts/Chart.vue";
import dialogCard from "../UI/DialogCard";

import { mapGetters, mapActions } from 'vuex';
export default {
    components: { 
        baseCard,
        chart,
        dialogCard
    },
    data(){
        return {
            showDialog: false,
            inputCurrencyCode:'EUR',
            outputCurrencyCode:'USD',
            currentRates: null,
            inputCurrency: 1000,
            outputCurrency: null
        }
    },
    created(){
        this.fetchCurrentExchangeRatesForBase({ currency : this.inputCurrencyCode });
        this.fetchPreviousExchangeRates();
    },
    watch:{
        getCurrentExchangeRatesForBase(){
            this.currentRates = this.getCurrentExchangeRatesForBase;
            this.calculateConversion('inputCurrency');
        },
        outputCurrencyCode(){
            this.fetchCurrentExchangeRatesForBase({ currency : this.inputCurrencyCode });
            this.fetchPreviousExchangeRates();
        },
        inputCurrencyCode(){
            this.fetchCurrentExchangeRatesForBase({ currency : this.inputCurrencyCode });
            this.fetchPreviousExchangeRates();
        },
        outputCurrency() {
            const input = String(this.inputCurrency);
            if(input.length > 9){
                this.outputCurrency = +String(this.outputCurrency).substring(0, 9);
            }
        },
        inputCurrency(){
            const output = String(this.outputCurrency);
            if(output.length > 9){
                this.inputCurrency = +String(this.inputCurrency).substring(0,9);
            }
        }
    },
    computed:{
        ...mapGetters(['getCurrentExchangeRatesForBase', 'getExchangeRatesForBaseBetweenDates']),
    },
    methods:{
        ...mapActions(['fetchCurrentExchangeRatesForBase', 'fetchExchangeRatesForBaseBetweenDates', 'addConversionHistory']),
        
        fetchPreviousExchangeRates(date){
            date  = date ? date : new Date();
            const startDate = new Date(date);
            const  endDate = new Date(date);
            startDate.setDate(startDate.getDate() + 3);
            endDate.setDate(endDate.getDate() - 3);
            const payload = {
                currency: this.inputCurrencyCode,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            }
            this.fetchExchangeRatesForBaseBetweenDates(payload);
        },

        calculateConversion(source){
            if(source === 'inputCurrency' && this.currentRates != null){
                const rate = this.currentRates[this.outputCurrencyCode];
                this.outputCurrency = parseFloat(rate * this.inputCurrency).toFixed(4);

            }else if(source === 'outputCurrency' && this.currentRates != null){
                const rate = this.currentRates[this.outputCurrencyCode];
                this.inputCurrency = parseFloat(this.outputCurrency / rate).toFixed(4);
            }
        },

        convert(){
            const payload = {
                inputCurrencyCode: this.inputCurrencyCode,
                outputCurrencyCode: this.outputCurrencyCode,
                inputCurrency: this.inputCurrency,
                outputCurrency:this.outputCurrency,
                dateTime : new Date()
            }
            this.addConversionHistory(payload);
            this.showDialog = true;
        },

        exchange(){
            const temp = this.inputCurrencyCode;
            this.inputCurrencyCode = this.outputCurrencyCode;
            this.outputCurrencyCode = temp;
            this.inputCurrency = this.outputCurrency;
        }
    }
}
</script>

<style scoped>
    .container_content{
        display:flex;
        justify-content: space-around;
        align-items:center;
        flex-wrap: wrap-reverse;
    }
    .container_content .column{
        flex-direction: column;
    }
    .container_content .column h2{
        padding: 10px 5px;
    }
    h3{
        margin-left:10px;
    }
   
    .form-group .image{
        cursor: pointer;
        width: 50px;
        border: 1px solid grey;
        border-radius: 6px;
        padding: 10px 0 10px 16px;
        background-color: #6930c3;
        box-shadow: 2px 2px 6px black;
    }

    .btn{
        padding:10px;
        font-size:1.5em;
        border:none;
        border-radius: 6px;
        font-weight:bold;
        background-color: #6930c3;
        color:white;
    }

    @media(max-width:1000px){
        .container_content{
            flex-direction: column-reverse;
            margin-bottom:32px;
        }
    }
</style>
