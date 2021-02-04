import { createStore } from 'vuex';
import currencyConverter from '../data-access/currency-converter';

export default createStore({
    state() {
        return {
            currentExchangeRatesForBase: null,
            exchangeRatesForBaseBetweenDates: null,
            conversionHistory:[],
            serviceFailed:false
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
        },
        getServiceFailed(state){
            return state.serviceFailed;
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
        },
        updateFail(state, payload){
            state.serviceFailed = payload;
        }
    },
    actions: {
        fetchCurrentExchangeRatesForBase(context, payload){
            context.commit('updateFail', false);
            currencyConverter.getRatesForBase(payload.currency)
            .then((response) => response.json()).then(data =>{
                data['rates'][payload.currency] = 1;
                context.commit('updateCurrentExchangeRatesForBase', {data: data});
            }).catch(()=>{
                context.commit('updateFail', true);
            })
        },

        fetchExchangeRatesForBaseBetweenDates(context, payload){
            context.commit('updateFail', false);
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
            }).catch(()=>{
                context.commit('updateFail', true);
            });
        },
        addConversionHistory(context, payload){
            context.commit('updateConversionHistory',payload);
        }
    }
});
