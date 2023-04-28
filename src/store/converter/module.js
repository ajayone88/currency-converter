import { createActions } from './actions';
import { createMutations } from './mutations';

const state = {
  ratesBetweenDates: '',
  rates: '',
  symbols: {},
};

export default () => ({
  namespaced: true,
  state,
  actions: createActions(),
  mutations: createMutations(),
});