/**
 * Created by zhangsong on 2019-01-21.
 */

const LOCAL_KEY_CONSTANT = {
  language: 'local_language',
};

export const localLanguage = {
  set: (language) => {
    localStorage.setItem(LOCAL_KEY_CONSTANT.language, language);
  },
  get: () => localStorage.getItem(LOCAL_KEY_CONSTANT.language),
};

export default {};
