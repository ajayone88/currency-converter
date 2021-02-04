<template>
    <div class="container">
       <teleport to="body">
            <dialog-card v-if="showDialog">
                <h1>Transfer done</h1>
                <button type="button" class="btn" @click="showDialog = !showDialog">Close</button>
            </dialog-card>
       </teleport>
        <base-card>
            <div class="upper-box">
                <form>
                    <div class="form-group">
                        <label 
                            for="inputCurrency" 
                            class="form-label">You Have</label>
                        <input 
                            id="inputCurrency" 
                            class="form-control"
                            type="number"
                            @input ="calculateConversion('inputCurrency');"
                            v-model="inputCurrency"/>
                        <select 
                            class="form-control-selection" v-model="inputCurrencyCode">
                            <option 
                                v-for="(value, key) in currentRates" 
                                :key="key" :value="key">{{ key }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div class="image-container">
                            <img class="imageClass" @click="exchange" src="../assets/refresh.png" alt="Refresh"/>
                        </div>
                    </div>   
                        <div class="form-group">
                            <label 
                                for="outputCurrency" 
                                class="form-label">You Get</label>
                            <input 
                                id="outputCurrency" 
                                class="form-control" 
                                type="number" 
                                @input ="calculateConversion('outputCurrency');"
                                v-model="outputCurrency" />
                            <select 
                                class="form-control-selection" v-model="outputCurrencyCode">
                                <option 
                                    v-for="(value, key) in currentRates" 
                                    :key="key" :value="key">{{ key }}</option>
                            </select>
                            <button 
                                type="button"
                                class="btn"
                                @click.prevent="convert">Convert</button>
                    </div>
                </form>
                <hr>
                <div class="displayData-container">
                    <div class="displayData">
                        <h2 for="inputCurrency" class="form-label">{{ inputCurrencyCode }} : {{ inputCurrency }}</h2>
                        <h2 for="outputCurrency" class="form-label">{{ outputCurrencyCode }} : {{ outputCurrency }}</h2>
                    </div>
                </div>
           </div>
        </base-card>
        <hr>
        <div class="lower-box">
            <chart 
                :sourceCode="inputCurrencyCode" 
                :targetCode="outputCurrencyCode"
                :graphData="getExchangeRatesForBaseBetweenDates"
                @selected-date="fetchPreviousExchangeRates" 
            ></chart>
        </div>
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
            if(date === undefined){
                date = new Date();
            }
            const startDate = new Date(date);
            const  endDate = new Date(date);
            startDate.setDate(startDate.getDate() + 3);
            endDate.setDate(endDate.getDate() - 3);
            const payload = {
                currency: this.inputCurrencyCode,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            }
            this.fetchExchangeRatesForBaseBetweenDates(payload)
        },
        calculateConversion(source){
            if(source === 'inputCurrency' && this.currentRates != null){
                const rate = this.currentRates[this.outputCurrencyCode];
                this.outputCurrency = parseFloat(rate * this.inputCurrency);

            }else if(source === 'outputCurrency' && this.currentRates != null){
                const rate = this.currentRates[this.outputCurrencyCode];
                this.inputCurrency = parseFloat(this.outputCurrency / rate);
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
    .container{
        background-color: #f9f871;
        padding:32px;
    }
    .form-group{
        margin:16px;
    }
    .form-label{
       display: block;
       font-size:2rem;
       margin-bottom:4px;
    }
    .form-control{
        width:250px;
        height:40px;
        font-size:20px;
        padding:0 16px;
    }
    .form-control-selection{
        width:150px;
        height:45px;
        font-size:20px;
        padding:0 16px;
    }
    .btn{
        cursor: pointer;
        display: block;
        margin: 16px 0;
        width:250px;
        height:40px;
        background-color: #ffc75f;
    }
    .image-container{
        width:250px;
        display:flex;
        justify-content: center;
    }
    .imageClass{
        cursor: pointer;
        box-shadow: 3px 3px 10px black;
        margin:20px;
        width:40px;
        height:40px;
        border-radius: 40%;
        padding:20px;
    }
    .imageClass:hover{
         box-shadow: 3px 3px 10px grey;
    }
    .imageClassArrow{
        margin:20px;
        width:40px;
        height:40px;
        border-radius: 40%;
        padding:20px;
    }
    .upper-box{
        display:flex;
        justify-content: space-between;
    }
    .displayData-container{
        margin:16px;
        flex-grow: 1;
        align-self: center;
        display:flex;
        justify-content: center;
    }
    .displayData{
        width:100%;
        display:flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    @media(max-width: 768px){
        .container{
            padding:0;
        }
        .upper-box{
            flex-direction: column-reverse;
        }
        .lower-box{
            padding:4px;
        }
        
    }

    @media(max-width: 600px){
        .displayData{
            flex-direction: column;
        }
    }
</style>
