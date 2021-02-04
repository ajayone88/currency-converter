<template>
    <div>
        <h1>Currency History:</h1>
        <form>
            <div class="form-group">
                <input 
                    id="dateOfHistory" 
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    :max="maxDate" 
                    @change="selectDate"
                    v-model="dateOfHistory"/>
                 <select v-model="selectedCode">
                    <option 
                        v-for="(value, key) in getCurrentExchangeRatesForBase" 
                        :key="key" :value="key">{{ key }}</option>
                </select>
            </div>
        </form>
        <div id="chart" v-if="options != null">
            <apexchart 
                type="bar" 
                height="350" 
                :options="options" 
                :series="series"
            ></apexchart>
        </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props:['sourceCode', 'targetCode', 'graphData'],
        emits:['selected-date'],
        watch:{
            graphData() {
                this.mapGraphData();
                this.selectedCode= this.targetCode;
            },
            selectedCode(){
                this.mapGraphData();
            }
        },
        computed:{
            ...mapGetters(['getCurrentExchangeRatesForBase', 'getExchangeRatesForBaseBetweenDates']),
        },
        data(){
            return {
                maxDate: new Date().toISOString().split("T")[0],
                dateOfHistory: new Date(),
                selectedCode:null,
                xaxis: {categories: []},
                options: null,
                series: []
            }
        },
        methods:{
            selectDate(){
                this.$emit('selected-date', new Date(this.dateOfHistory));
            },
            mapGraphData(){
                const sourceCodeData = []
                const targetCodeData = []
                this.xaxis['categories'] = [];
                const dates = Object.keys(this.graphData).sort((a, b) =>{
                    const date1 = new Date(a);
                    const date2 = new Date(b);
                   return  date1 - date2;
                });
                for(const key of dates){
                   this.xaxis['categories'].push(key);
                   targetCodeData.push(this.graphData[key][this.selectedCode]);
                   sourceCodeData.push(1);
                }
                this.series = [
                    {
                        name: this.sourceCode,
                        data: sourceCodeData
                    },
                    {
                        name: this.selectedCode,
                        data: targetCodeData
                    }
                ];
                this.options = {
                    chart:{
                        type: 'bar',
                        height:350
                    },
                    xaxis: this.xaxis
                }
            }
        }
    }
</script>

<style scoped>
    #chart{
        margin:8px;
        background-color: white;
    }
    .form-group{
        max-width:350px;
        margin-left:0;
    }

    @media(max-width:450px){
        h1{
            padding-top:16px;
            text-align:center;
        }
    }
</style>