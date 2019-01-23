/**
 * Created by zhangsong on 2019-01-16.
 */

const initState = {

};

const actions = {
  setState: Symbol('setState'),
  login: Symbol('login'),
  userLogin: Symbol('userLogin'),
};

export default {
  namespace: 'user',
  actions,
  initState,
  reducer: {
    [actions.setState]: (state, data) => ({
      ...state,
      ...data,
    }),
  },
};
