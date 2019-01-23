/**
 * Created by zhangsong on 2019-01-21.
 */
import Loadable from 'react-loadable';
import Loading from 'src/components/loading';

export const LoginPage = {
  url: '/login',
  loader: () => import('src/views/login'),
};

export const mainPage = {
  url: '/main',
  loader: () => import('src/views/dashboard'),
};

const router = [
  LoginPage,
  mainPage,
];

function wrapper(item) {
  const { url, ...other } = item;
  // Loadable 的一些默认配置
  const defaultObj = {
    loading: Loading,
  };
  return {
    url,
    component: Loadable(Object.assign({}, defaultObj, other)),
  };
}

export default {
  router: router.map(wrapper),
};
