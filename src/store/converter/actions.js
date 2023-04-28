import { CONVERTER } from './constants';
import api from '@/api/converter/converter';

export const createActions = () => ({
  async [CONVERTER.ACTIONS.GETSYMBOLS]( { commit }) {
    const result = await api.getSymbols();
    if(result !== 'error') { 
      commit(CONVERTER.MUTATIONS.SETSYMBOLS, result)
    }
  },

  async [CONVERTER.ACTIONS.GETRATESOFBASE]( { commit }, payload) {
      const result = await api.getRatesOfBase(payload);
      if(result !== 'error') {
        const rates = result.rates;
        commit(CONVERTER.MUTATIONS.SETRATESOFBASE, rates);
      }
  },

  async [CONVERTER.ACTIONS.GETRATESOFBASEFORDATES]( { commit }, payload) {
    const result = await api.getRatesOfBaseForDates(payload);
    if(result !== 'error') {
      const rates = result.rates;
      commit(CONVERTER.MUTATIONS.SETRATESOFBASEFORDATES, rates);
    }
}
});