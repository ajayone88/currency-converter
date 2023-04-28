import { createI18n } from 'vue-i18n';
import translations from './translations';

export default createI18n({
  allowComposition: true,
  locale: 'en',
  messages: {
   'en': {
      ...translations.en
    }
  }
});