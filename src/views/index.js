import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Intl from 'react-intl-universal';
import moment from 'moment';
import { LocaleProvider, Select } from 'antd';
import { DEFAULT_LANGUAGE } from 'src/config';
import routerConfig from 'src/config/routerConfig';
import Loading from 'src/components/loading';
import locales, { languageObject } from 'src/locales';
import { localLanguage } from 'src/utils/localStorage';

class App extends Component {
  state = {
    initDone: false,
    language: localLanguage.get() || DEFAULT_LANGUAGE,
  };

  componentDidMount() {
    const { language } = this.state;
    this.loadLocales(language); // 执行初始化本地语言
  }

  /**
   * 更新国际化对象
   * @param language 使用到语言
   */
  loadLocales = (language) => {
    this.setState({ initDone: false });
    Intl
      .init({
        currentLocale: language,
        locales,
      })
      .then(() => {
        moment.locale(Intl.get('locale.moment'));
        localLanguage.set(language);
        this.setState({
          initDone: true,
          language,
        });
      });
  };

  // 国际化插件初始化完成后,渲染路由页面
  renderMain = () => (
    <Switch>
      {
        routerConfig.router.map(i => (
          <Route
            key={i.url}
            path={i.url}
            component={i.component}
            exact
          />
        ))
      }
    </Switch>
  );

  renderSelectLanguage = () => {
    const { language } = this.state;
    return (
      <Select value={language} onChange={this.loadLocales}>
        {
          Object.entries(languageObject)
            .map(([key, name]) => (
              <Select.Option key={key}>{name}</Select.Option>
            ))
        }
      </Select>
    );
  };

  render() {
    const { history } = this.props;
    const { initDone } = this.state;
    return (
      <ConnectedRouter history={history}>
        <div>
          <header>
            {this.renderSelectLanguage()}
          </header>
          {initDone ? (
            <LocaleProvider locale={Intl.get('locale.antd')}>
              {this.renderMain()}
            </LocaleProvider>
          ) : <Loading />}
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
