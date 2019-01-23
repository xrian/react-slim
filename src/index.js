import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import './index.css';
import Router from './views';
import combine from './reducers';
import mySaga from './services';

const history = createHistory(); // 浏览器历史记录对象

const sagaMiddleware = createSagaMiddleware(); // 创建saga中间件对象

const { reducers, state } = combine(history); // 初始state

// 创建store
const store = createStore(
  reducers,
  state,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root'),
);
