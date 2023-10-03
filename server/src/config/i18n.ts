import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'vi'],
  register: global,
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  cookie: 'language',
  queryParameter: 'hl', // host language
  preserveLegacyCase: true, // en-US becomes en-us.
  api: {
    __: 'translate', // now req.__ becomes req.t
    __n: 'translateN' // and req.__n can be called as req.tn
  },
  autoReload: true
});

export { i18n };
