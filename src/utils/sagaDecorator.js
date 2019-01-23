import {
  takeEvery,
  takeLatest,
  throttle,
  takeLeading,
} from 'redux-saga/effects';

const SAGA_SIGN_VALUE = 'SAGA_SIGN_VALUE';

export function initialiseSaga(Class) {
  function filter(obj) {
    if (obj) {
      const arr = Object.getOwnPropertyNames(obj);
      return arr.filter(item => typeof obj[item] === 'function'
        && obj[item][SAGA_SIGN_VALUE] === SAGA_SIGN_VALUE);
    }
    return [];
  }

  const result = [];
  if (Class) {
    result.push(...filter(Class)
      .map(i => Class[i]));
  }
  if (typeof Class === 'function') { // 如果是函数,则new一次
    const entity = new Class();
    result.push(...filter(Object.getPrototypeOf(entity))
      .map(i => entity[i]));
  }
  return result;
}

/**
 * @param pattern 需要监听的actions名称
 * @param args 要传递给已启动任务的参数。takeEvery将传入的动作添加到参数列表中（即动作将是提供给的最后一个参数saga）
 * @return {function({descriptor: *, key: *, kind: *, placement: *}): *} key: 要装饰的函数名
 * @constructor
 */
export function TakeEvery(pattern, ...args) {
  if (!pattern) {
    throw new Error('function TakeEvery argument[0] pattern is require');
  }
  return (target, name, descriptor) => {
    const desc = descriptor || target.descriptor;
    const old = desc.value;

    function* func() {
      return yield takeEvery(pattern, old.bind(this), ...args);
    }

    func[SAGA_SIGN_VALUE] = SAGA_SIGN_VALUE; // 标记当前函数是saga函数
    desc.value = func;
    return desc;
  };
}

/**
 * 产生一个saga对派往相匹配的存储的每个动作pattern。并且如果saga仍在运行，则自动取消先前启动的任务。
 * @param pattern 需要监听的actions名称
 * @param args 要传递给已启动任务的参数
 * @return {function({descriptor: *, key: *, kind: *, placement: *}): *}
 * @constructor
 */
export function TakeLatest(pattern, ...args) {
  if (!pattern) {
    throw new Error('function TakeLatest argument[0] pattern is require');
  }
  return (target, name, descriptor) => {
    const desc = descriptor || target.descriptor;
    const old = desc.value;

    function* func() {
      return yield takeLatest(pattern, old.bind(this), ...args);
    }

    func[SAGA_SIGN_VALUE] = SAGA_SIGN_VALUE; // 标记当前函数是saga函数
    desc.value = func;
    return desc;
  };
}

/**
 * 产生一个saga对匹配的每个动作pattern。产生一次任务后，它会阻塞，直到产生的saga完成，然后再开始侦听pattern。
 * @param pattern 需要监听的actions名称
 * @param args 要传递给已启动任务的参数
 * @return {function({descriptor: *, key: *, kind: *, placement: *}): *}
 * @constructor
 */
export function TakeLeading(pattern, ...args) {
  if (!pattern) {
    throw new Error('function TakeLeading argument[0] pattern is require');
  }
  return (target, name, descriptor) => {
    const desc = descriptor || target.descriptor;
    const old = desc.value;

    function* func() {
      return yield takeLeading(pattern, old.bind(this), ...args);
    }

    func[SAGA_SIGN_VALUE] = SAGA_SIGN_VALUE; // 标记当前函数是saga函数
    desc.value = func;
    return desc;
  };
}

/**
 * 产生saga一个派遣到匹配的商店的行动pattern。产生一个任务后，它仍然接受进入底层的传入动作buffer，最多保持1（最近的一个）
 * 但同时坚持产生新的任务ms毫秒（因此它的名字 - throttle）。其目的是在处理任务时忽略给定时间段内的传入操作。
 * @param ms 时间窗口的长度(以毫秒为单位),在此期间操作将在操作开始处理后被忽略
 * @param pattern 需要监听的actions名称
 * @param args 要传递给已启动任务的参数.
 * @return {function({descriptor: *, key: *, kind: *, placement: *}): *}
 * @constructor
 */
export function Throttle(ms, pattern, ...args) {
  if (!pattern) {
    throw new Error('function Throttle argument[1] pattern is require');
  }

  return (target, name, descriptor) => {
    const desc = descriptor || target.descriptor;
    const old = desc.value;

    function* func() {
      return yield throttle(ms, pattern, old.bind(this), ...args);
    }

    func[SAGA_SIGN_VALUE] = SAGA_SIGN_VALUE; // 标记当前函数是saga函数
    desc.value = func;
    return desc;
  };
}

export default {
  initialiseSaga,
  TakeEvery,
  TakeLatest,
  TakeLeading,
  Throttle,
};
