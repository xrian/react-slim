/**
 * Created by zhangsong on 2019-01-22.
 */
import moment from 'moment';
import React, { Component } from 'react';
import Intl from 'react-intl-universal';
import { connect } from 'react-redux';
import UserReducer from 'src/reducers/user';

@connect(state => ({
  user: state[UserReducer.namespace],
}))
class Class extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <span>{Intl.get('dashboardPage.welcome')}</span>
        <div>{Intl.get('dashboardPage.userInfoTitle')}</div>
        <div>{JSON.stringify(user)}</div>
        <div>{Intl.get('dashboardPage.lastLoginTime')}</div>
        <div>
          {moment().format(Intl.get('datetimeFormat.all'))}
        </div>
      </div>
    );
  }
}

export default Class;
