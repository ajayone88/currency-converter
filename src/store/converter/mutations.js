import { CONVERTER } from './constants';

export const createMutations = ()=> ({
  [CONVERTER.MUTATIONS.SETRATESOFBASE]( state, payload) {
      state.rates = payload;
  },

  [CONVERTER.MUTATIONS.SETRATESOFBASEFORDATES]( state, payload) {
    state.ratesBetweenDates = payload;
  },

  [CONVERTER.MUTATIONS.SETSYMBOLS]( state, payload) {
      state.symbols = payload.symbols;
  }
});