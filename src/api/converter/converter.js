
const  baseUri =  "https://api.exchangerate.host";

export default {
    async getSymbols(){
        try{
            const result = await fetch(baseUri + '/symbols');
            return await result.json()
        } catch (error) {
            return 'error';
        }
    },
    async getRatesOfBase(currency){
        try {
            const result = await fetch(baseUri + `/latest?base=${currency}`);
            return await result.json();
        } catch (error) {
            return 'error';
        }
    },
    async getRatesOfBaseForDates({code, sdate, edate}){
        try {
            const result = await fetch(baseUri + `/timeseries?start_date=${sdate}&end_date=${edate}&base=${code}`);
            return await result.json();
        } catch (error) {
            return 'error';
        }
    }
       
}