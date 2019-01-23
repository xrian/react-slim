/**
 * Created by zhangsong on 2019-01-16.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const context = require.context('./', true, /\.js$/); // 读取当前目录下全部的 js 文件


/**
 * 包装函数,统一处理输入输出格式
 * @param reducers
 * @return {Function}
 */
function wrapper(reducers) {
  return (state = {}, action) => {
    if (Object.prototype.hasOwnProperty.call(reducers, action.type)) {
      return reducers[action.type](state, action.data);
    }
    return state;
  };
}

export default function (history) {
  const array = context.keys().filter(item => item !== './index.js');
  const reduce = {};
  const state = {};
  array.forEach((item) => {
    const o = context(item).default;
    reduce[o.namespace] = o.reducer;
    state[o.namespace] = o.initState;
  });
  Object.keys(reduce)
    .forEach((key) => {
      reduce[key] = wrapper(reduce[key]);
    });
  return {
    reducers: combineReducers({
      router: connectRouter(history),
      ...reduce,
    }),
    state,
  };
}
