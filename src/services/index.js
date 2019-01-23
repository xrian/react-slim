/**
 * Created by zhangsong on 2019-01-16.
 */

import { fork } from 'redux-saga/effects';
import { initialiseSaga } from '../utils/sagaDecorator';

const context = require.context('./', true, /\.js$/); // 读取当前目录下全部的 js 文件

// 根据装饰器函数创建saga任务
function* forkByDecorator() {
  const arr = context.keys()
    .filter(item => item !== './index.js');
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    const Class = context(item).default; // 读取该文件
    const list = initialiseSaga(Class);
    for (let n = 0; n < list.length; n += 1) {
      yield fork(list[n]);
    }
  }
}

export default function* rootSaga() {
  yield forkByDecorator();
}
