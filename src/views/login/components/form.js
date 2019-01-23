/**
 * Created by zhangsong on 2019-01-22.
 */
import React, { Component } from 'react';
import Intl from 'react-intl-universal';
import {
  Form,
  Input,
} from 'antd';

@Form.create()
class Class extends Component {
  getValue = () => {
    const { form } = this.props;
    return new Promise((resolve, reject) => {
      form.validateFields((err, values) => {
        if (!err) {
          resolve(values);
        } else {
          reject(err);
        }
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item
          label={Intl.get('loginPage.form.username.name')}
        >
          {getFieldDecorator('username', {
            initialValue: '1',
            rules: [
              {
                required: true,
                message: Intl.get('loginPage.form.username.message'),
              },
            ],
          })(
            <Input
              placeholder={Intl.get('loginPage.form.username.placeholder')}
              maxLength={50}
            />,
          )}
        </Form.Item>
        <Form.Item
          label={Intl.get('loginPage.form.password.name')}
        >
          {getFieldDecorator('password', {
            initialValue: '1',
            rules: [
              {
                required: true,
                message: Intl.get('loginPage.form.password.message'),
              },
            ],
          })(
            <Input
              type="password"
              placeholder={Intl.get('loginPage.form.password.placeholder')}
              maxLength={50}
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Class;
