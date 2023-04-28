<template>
  <base-card>
    <div class="formgroup"> 
        <h3 class="formgroup__header">{{ getLabels[0] }}</h3>
        <input
            class="formgroup__input"
            type="number"
            v-model="input.value"
            @input="updateOutputValue()">
        <select 
            v-model="input.currency"
            @change="getRatesOfBase(this.input.currency)"
            class="formgroup__select">
            <option
                v-for="(symbol, key) in symbols" 
                :key="key + 'first'" 
                :value="key">
                {{ key + ': ' + symbol.description }}
            </option>
        </select>
    </div>
    <div class="formgroup"> 
        <h3 class="formgroup__header">{{ getLabels[1] }}</h3>
        <input
            class="formgroup__input"
            type="number"
            v-model="output.value" 
            @input="updateOutputValue(output.value)">
        <select 
            v-model="output.currency"
            @change="updateOutputValue()"
            class="formgroup__select">
            <option 
                v-for="(symbol, key) in symbols" 
                :key="key + 'second'" 
                :value="key">
                {{ key + ': ' + symbol.description }}
            </option>
        </select>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "@/UI/BaseCard.vue";
import { mapState, mapActions } from 'vuex';
import { CONVERTER } from '@/store/converter/constants';

export default {
  components: { 
    BaseCard,
  },
  data(){
      return {
        ratesDirection: true,
        input:{
            value: 1000,
            currency: 'EUR'
        },
        output: {
            value: 0,
            currency: 'INR'
        }
      }
  },

  async mounted() {
    if(Object.keys(this.symbols).length === 0){
        await this.getSymbols();
    }
    await this.getRatesOfBase(this.input.currency);
  },
  watch:{
    rates() {
        this.updateOutputValue();
    }
  },

  computed: {
    ...mapState(CONVERTER.NAME, ['symbols', 'rates']),
    getLabels() {
        const translations =  [
            this.$t('CONVERTER.INPUT.LABLE'),
            this.$t('CONVERTER.OUTPUT.LABLE')
        ]
        return translations;
    },
  },

  methods: {
    ...mapActions(CONVERTER.NAME, ['getSymbols', 'getRatesOfBase']),
    updateOutputValue (value) {
        if(value) {
            this.input.value = (this.output.value / this.rates[this.output.currency]).toFixed(2);
        } else {
            this.output.value = (this.input.value * this.rates[this.output.currency]).toFixed(2);
        }
    }
  }
}
</script>
<style scoped>
    .formgroup {
        background-color: black;
        margin: 16px;
        padding: 16px;
        border-radius: 15px;
        box-shadow: 10px 10px 10px grey;
        width: 500px;
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
        width: 150px;
        height: 40px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        border: 0px;
        padding: 5px;
        font-size: 24px;
    }
    .formgroup__select {
        width: 250px;
        height: 40px;
        margin-right: 10px;
        border-radius: 10px;
        border: 0px;
        padding: 5px;
        font-size: 20px;
    }
</style>
