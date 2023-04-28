<template>
    <base-card>
        <form class="formgroup">
            <div>
                <h3 class="formgroup__header">{{ $t('CHART.TITLE') }}</h3>
                <input 
                    class="formgroup__input"
                    type="date"
                    :max="currentDate"
                    v-model="pastDate"
                />
            </div>
            <div>
                <h3 class="formgroup__header">{{ $t('CHART.BASE') }}</h3>
                <select 
                    v-model="inputCurrency"
                    class="formgroup__select">
                    <option 
                        v-for="(value, key) in symbols" 
                        :key="key" 
                        :value="key">
                            {{ key + ':' + value.description }}
                    </option>
                </select>
            </div>
          
            <div>
                <h3 class="formgroup__header">{{ $t('CHART.TARGET') }}</h3>
                <select 
                    v-model="outputCurrency"
                    @change="createGraphInput()"
                    class="formgroup__select">
                    <option 
                        v-for="(value, key) in symbols" 
                        :key="key" 
                        :value="key">
                            {{ key + ':' + value.description }}
                    </option>
                </select>
            </div>
        </form>
        <div v-if="options">
            <apexchart 
                type="area" 
                :options="options" 
                :series="series"
            ></apexchart>
        </div>
    </base-card>
</template>

<script>
import BaseCard from "@/UI/BaseCard.vue";
import { mapState, mapActions } from 'vuex';
import { CONVERTER } from '@/store/converter/constants';
import VueApexCharts from 'vue3-apexcharts';
export default {
    components: {
        apexchart: VueApexCharts,
        BaseCard,
    },
    data(){
        return {
            inputCurrency: 'EUR',
            outputCurrency: 'INR',
            currentDate: new Date().toISOString().split('T')[0],
            pastDate: new Date('2023-04-22').toISOString().split('T')[0],
            options: null,
            series: null
        }
    },
    async mounted(){
        if(Object.keys(this.symbols).length === 0){
            await this.getSymbols();
        }
        await this.getRatesOfBaseForDates({ code: this.inputCurrency, sdate: this.pastDate, edate: this.currentDate});
    },
    watch:{
        async updateOnChange () {
            await this.getRatesOfBaseForDates({ code: this.inputCurrency, sdate: this.pastDate, edate: this.currentDate});
        },
        ratesBetweenDates () {
            this.createGraphInput();
        }
    },
    computed:{
        ...mapState(CONVERTER.NAME, ['symbols', 'ratesBetweenDates']),
        updateOnChange() {
            return [ this.pastDate, this.inputCurrency ];
        }
    },
    methods:{
        ...mapActions(CONVERTER.NAME, ['getSymbols','getRatesOfBaseForDates']),
        createGraphInput(){
            const dates = Object.keys(this.ratesBetweenDates);
            const outputCurrenyRates = dates.map(date => this.ratesBetweenDates[date][this.outputCurrency].toFixed(2));
            const tempSeries = [{
                name: this.outputCurrency,
                data: outputCurrenyRates
            }];
            const tempOptions = {
                xaxis: {
                    categories: [...dates]
                }
            };

            this.options = { ...tempOptions };
            this.series = [ ...tempSeries ];
        }
    }
}
</script>

<style scoped>
    .formgroup {
        background-color: black;
        margin-bottom: 20px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: 10px 10px 10px grey;
        width: 100%;
        display:flex;
        gap: 15px;
        flex-wrap: wrap;
    }

    @media(max-width: 610px) {
        .formgroup {
            margin: 12px 0px;
            width:100%;
        }
    }

    .formgroup__header{
        margin: 5px 0px;
    }
    .formgroup__input {
        height: 40px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        border: 0px;
        padding: 5px;
        font-size: 24px;
        cursor: pointer
    }
    .formgroup__select {
        width: 100%;
        height: 40px;
        margin-right: 10px;
        border-radius: 10px;
        border: 0px;
        padding: 5px;
        font-size: 20px;
        cursor: pointer
    }
</style>