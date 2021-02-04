export default {
    baseUri: "https://api.exchangeratesapi.io",
    
    getRatesForBase(currency){
        return fetch(this.baseUri + `/latest?base=${currency}`);
    },
    
    getRatesFor(firstCurrency, secondCurrency){
        return fetch(this.baseUri + `/latest?symbols=${firstCurrency},${secondCurrency}`);
    },

    getRatesForBaseAndBetween(currency, startDate, endDate){
        return fetch(this.baseUri + `/history?start_at=${startDate}&end_at=${endDate}&base=${currency}`);
    },

    getRatesForAndBetween(firstCurrency, secondCurrency, startDate, endDate){
        return fetch(this.baseUri + `/history?start_at=${startDate}&end_at=${endDate}&symbols=${firstCurrency},${secondCurrency}`)
    },

    getRatesForAllBetween(startDate, endDate){
       return fetch(this.baseUri + `/history?start_at=${startDate}&end_at=${endDate}`);   
    },

    getRatesForAllForDate(date){
        return fetch(this.baseUri + `/${date}`)
    }

}
