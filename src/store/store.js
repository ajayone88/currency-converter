import { createStore } from 'vuex';
import currencyConverter from '../data-access/currency-converter';

export default createStore({
    state() {
        return {
            currentExchangeRatesForBase: null,
            exchangeRatesForBaseBetweenDates: null,
            conversionHistory:[]
        }
    },
    getters: {
        getCurrentExchangeRatesForBase(state){
            return state.currentExchangeRatesForBase;
        },
        getExchangeRatesForBaseBetweenDates(state){
            return state.exchangeRatesForBaseBetweenDates;
        },
        getConversionHistory(state){
            return state.conversionHistory;
        }
    },
    mutations: {
        updateCurrentExchangeRatesForBase(state, payload){
            state.currentExchangeRatesForBase = payload.data['rates'];
        },
        updateExchangeRatesForBaseBetweenDates(state, payload){
            state.exchangeRatesForBaseBetweenDates = payload.data['rates'];
        },
        updateConversionHistory(state, payload){
            state.conversionHistory.push(payload);
        }
    },
    actions: {
        fetchCurrentExchangeRatesForBase(context, payload){
            currencyConverter.getRatesForBase(payload.currency)
            .then((response) => response.json()).then(data =>{
                data['rates'][payload.currency] = 1;
                context.commit('updateCurrentExchangeRatesForBase', {data: data});
            })
        },

        fetchExchangeRatesForBaseBetweenDates(context, payload){
            const startDate = payload.startDate;
            const endDate = payload.endDate;
            const  formattedStartDate = startDate.getFullYear()  + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate();
            const  formattedEndDate = endDate.getFullYear()  + "-" + (endDate.getMonth()+1) + "-" + endDate.getDate();
            currencyConverter.getRatesForBaseAndBetween(payload.currency, formattedEndDate, formattedStartDate)
            .then((response) => response.json()).then(data =>{
                const outputPayload = {
                    currency: payload.currency,
                    data: data
                };
                context.commit('updateExchangeRatesForBaseBetweenDates', outputPayload);
            })
        },
        addConversionHistory(context, payload){
            context.commit('updateConversionHistory',payload);
        }
    }
});
