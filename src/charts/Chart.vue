<template>
    <div>
        <h1>Currency History:</h1>
        <form>
            <div class="form-group">
                <label 
                    for="dateOfHistory" 
                    class="form-label">Select the Date</label>
                <input 
                    id="dateOfHistory" 
                    class="form-control" 
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    :max="maxDate" 
                    @change="selectDate"
                    v-model="dateOfHistory"/>
            </div>
             <div class="form-group">
                <label 
                    for="newCurrency" 
                    class="form-label">Select Currency</label>
                 <select 
                    class="form-control-selection" 
                    v-model="selectedCode">
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
                   return   date1 - date2;
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
    h1{
        margin:16px 0;
    }
   .form-group{
        margin:16px 0;
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
        margin:8px 0;
        width:150px;
        height:45px;
        font-size:20px;
        padding:0 16px;
    }
    #chart{
        margin: 16px auto;
        background-color: white;

    }
</style>