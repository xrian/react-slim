/**
 * Created by zhangsong on 2019-01-16.
 */
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Intl from 'react-intl-universal';
import Modal from 'src/components/modal';
import { mainPage } from 'src/config/routerConfig';
import { TakeEvery } from '../utils/sagaDecorator';
import UserReducer from '../reducers/user';

const { actions } = UserReducer;

export default class User {
  @TakeEvery(actions.login)
  static* login({ data }) {
    console.log(data);
    if (data.password) {
      yield call(Modal.success, Intl.get('loginPage.alert.loginSuccess'));
      yield put({
        type: UserReducer.actions.setState,
        data,
      });
      yield put(push(mainPage.url));
    } else {
      yield call(Modal.error, Intl.get('loginPage.alert.loginError'));
    }
  }
}
