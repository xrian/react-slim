import enGB from 'antd/lib/locale-provider/en_GB';
import loginPage from './loginPage';
import dashboardPage from './dashboard';

export default {
  loginPage,
  dashboardPage,
  datetimeFormat: {
    all: 'YYYY/MM/DD HH:mm:ss',
    date: 'YYYY/MM/DD',
    time: 'HH:mm',
  },
  locale: {
    antd: enGB,
    moment: 'en-gb',
  },
};
