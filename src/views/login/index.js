import {
  Button,
  Col,
  Row,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Intl from 'react-intl-universal';
import UserReducer from 'src/reducers/user';
import Styles from './index.module.scss';
import logo from './assets/logo.svg';
import Form from './components/form';

const { namespace, actions } = UserReducer;

@connect(state => ({
  user: state[namespace],
}), dispatch => ({
  login: data => dispatch({
    type: actions.login,
    data,
  }),
  userLogin: data => dispatch({
    type: actions.userLogin,
    data,
  }),
}))
class App extends Component {
  handleLogin = async () => {
    try {
      const values = await this.form.getValue();
      const { login, userLogin } = this.props;
      login(values);
      userLogin(values);
    } catch (e) {
      // 表单校验不通过
    }
  };

  render() {
    return (
      <div className={Styles.mainWrapper}>
        <header className={Styles.headerWrapper}>
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className={Styles.main}>
          <Form
            wrappedComponentRef={(r) => {
              this.form = r;
            }}
          />
          <Row>
            <Col>
              <Button onClick={this.handleLogin}>{Intl.get('loginPage.button.login')}</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
