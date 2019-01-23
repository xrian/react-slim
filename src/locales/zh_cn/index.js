/**
 * Created by zhangsong on 2019-01-22.
 */
import zhCN from 'antd/lib/locale-provider/zh_CN';
import loginPage from './loginPage';
import dashboardPage from './dashboard';

export default {
  loginPage,
  dashboardPage,
  datetimeFormat: { // 简体中文对应的日期格式,如果不满足需求,可以继续添加新的时间格式
    all: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
  },
  locale: {
    antd: zhCN,
    moment: 'zh-CN',
  },
};
