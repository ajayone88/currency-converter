export default {
    baseUri: "https://api.exchangeratesapi.io",
    
    getRatesForBase(currency){
        return fetch(this.baseUri + `/latest?base=${currency}`);
    },
    getRatesForBaseAndBetween(currency, startDate, endDate){
        return fetch(this.baseUri + `/history?start_at=${startDate}&end_at=${endDate}&base=${currency}`);
    },
}
