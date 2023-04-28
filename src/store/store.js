import { createStore } from 'vuex';
import { CONVERTER } from '@/store/converter/constants';
import createConverter from '@/store/converter/module';

export default createStore ({
    modules: {
        [CONVERTER.NAME]: createConverter(),
    }
});