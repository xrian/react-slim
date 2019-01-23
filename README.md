一个基于[Create React App](https://github.com/facebook/create-react-app)搭建的**React全家桶**项目模板.<br />
使用react-app-rewired增加自定义配置.

## TODO List
- [x] babel 自定义配置
- [x] 开发模式代理API请求
- [x] 项目目录别名(webpack alias)
- [x] redux
- [x] redux-saga(redux中间件)
- [x] css预处理(sass,less)
- [x] CSS模块样式
- [x] react router
- [x] 国际化(react-intl-universal)
- [x] redux开发工具(redux-devtools-extension浏览器插件)
- [x] 代码规范(eslint)
- [x] UI库(antd)
- [x] 装饰器
- [ ] 代码分析
- [ ] 服务器渲染
- [ ] 代码拆分

## 为什么会有这个仓库
当你新开始一个项目react时,虽然有Create React App可以创建一个项目模板,但是它只是一个基础框架,并不能满足我们的实际开发需求 <br />
如果想要完成一个大型项目,你需要不断的往项目里添加你需要的插件以实现你的需求.<br />
但是,如果你一开始就知道你将来可能遇到什么困难,需要那些插件,在项目前期就配置在你的项目中,然后再进行开发,是否能加快你的开发速度呢? <br />

## 前置条件
- node version>=8.0
- 掌握HTML,CSS,JS相关基本知识
- 了解React,ES2015

## 使用

#### 1) 克隆仓库代码到本地
#### 2) 安装依赖
``` bash
$ npm i
```
or
```
$ yarn
```
#### 3) 启动开发服务器
```
$ npm start
```
#### 4) 打包生产环境代码
```
$ npm run build
```
> 如果你有需要,可以在package.json中添加`homepage`字段,[详细说明](https://facebook.github.io/create-react-app/docs/deployment)
> ```
> "homepage": "http://mywebsite.com/relativepath",
> ```

## 开发指南

### 自定义babel配置
在项目跟目录下有个`babel.config.js`,只需要修改文件中的内容,就能实现自定义babel配置

### 开发模式代理API请求
在package.json文件中新增`proxy`字段
```
"proxy": "http://localhost:4000",
```
手动配置代理功能随`react-scripts@2.0.0`更高版本提供,[详细使用文档](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development);

### 项目目录别名设置
项目根目录下有个`config-overrides.js`文件,在`addWebpackAlias`函数中增加你想配置的别名即可
注意: 如果新增了项目别名,记得修改eslint配置文件,添加新的别名配置.
> 目前已经配置为`src`的别名.如果你要引用src下面的文件夹,不需要使用../的方式层层返回再引用其他文件,你只需要直接从src开始调用即可

比如:
你当前文件为`src/views/index.js`,如果想引用`src/config/index.js`,在未配置别名前的写法是
```
import Config from '../config/index';
```
在配置别名后的写法是
```
import Config from 'src/config/index';
```
别名的好处就是,**无论你目前处于项目的哪个文件**,你都可以使用`src/config/index`引用到src/config/index.js

### Redux
我在src/reducers文件夹下写了一个index.js,该js文件会自动读取src/reducers下面夹下的全部文件,然后合并.当然,前提是你reducers文件夹下的文件默认导出Object具有以下格式
```
{
  namespace: 'user',
  initState,
  actions,
  reducer: {
    [actions.setState]: (state, data) => ({
      ...state,
      ...data,
    }),
  },
}
```
namespace的值是redux的store中的key <br />
initState的值是redux中store的初始状态值 <br />
actions是将要改变store的事件名 <br />
reducer是响应action并且表示如何改变state的函数.**建议在reducer对象中使用方括号命名法,保证actions和reducer数据一致性** <br />
[更多资料](https://redux.js.org/) <br/>
如果你不喜欢这样的写法,你可以使用更适合你的写法,不过,要记得修改`src/index.js`中`createStore()`的参数

### [redux-saga](https://redux-saga.js.org/)
redux-saga主要是用来处理异步更新redux的情况.可以使用你自己想要的方式使用redux-saga或者按照我已完成的功能来更新state <br />
我编写了一个工具类`src/utils/sagaDecorator.js`,主要实现了,可以通过装饰器的写法,将函数注入到redux-saga中. <br />
使用方法如下: <br />
在src/services目录下新建一个js文件,文件默认导出一个class类
```
export default class Class {}
```
然后导入`src/utils/sagaDecorator.js`文件,在class类的函数上使用sagaDecorator中提供的装饰器函数即可
```
import { TakeEvery, TakeLatest, TakeLeading, Throttle } from 'src/utils/sagaDecorator';

export default class Class {
  @TakeEvery('TEST_ACTIONS')
  static* test(){
  }
}
```
> 上面的代码,会产生下面的效果. <br/>
> 项目启动后,会自动使用takeEvery函数监视所有`TEST_ACTIONS`操作,并执行test函数中的内容

项目启动时,会执行`src/services/index.js`中的forkByDecorator函数,只要是src/services目录下的文件,默认导出的class中如果包含有被sagaDecorator文件中函数装饰过的方法,则会自动加载到redux-saga任务中.<br/>
> 我基于antd的Modal组件,实现了一个promise模态框,src/components/alert文件夹下,在saga函数中,可以使用`yield call(Modal.success, 'success');`的形式弹出模态框,给予用户提示

如果想自己实现saga的功能,你也可以按照你自己的写法实现,只需要最后在src/index.js中`sagaMiddleware.run();`你的自己都代码即可

### CSS预处理
项目已经配置了scss以及less插件,只需要在创建css文件时以`.scss`或者`.less`为后缀名即可

### CSS模块样式
> 在`react-scripts@2.0.0`更高版本已经自带css module功能,只需要在创建css文件时采用`[name].module.css`类似的命名格式即可. <br />

如果你在使用scss或者less,并且想使用css模块功能,那么文件命名应该是`[name].module.scss或[name].module.sass或[name].module.less`.
示例:
```
import React, { Component } from 'react';
import styles from './Button.module.css'; // Import css modules stylesheet as styles

class Button extends Component {
  render() {
    return (
      <div>
        <button className={styles.error}>单个class类名</button>
        <button className={`${styles.success} ${styles.button}`}>拥有多个class类名</button>
      </div>
    );
  }
}
```

### react router
在src/config文件下有个routerConfig.js,里面的代码表示各个页面对应的参数.
如果你不喜欢,你可以自己定义路由信息.
> 建议❗: 将各个页面对应的URL作为变量导出,当其他地方需要用到跳转时,直接使用该URL变量,而不是在代码中使用URL字符串常量.<br/>
> ❌如果跳转页面的时候使用字符串常量,那么后期在维护或者重构的时候,需要修改URL,那么则需要一个个文件去查找引用.

在`src/views/index.js`中,使用率Switch标签和Route标签,将每个页面都遍历出来,当有匹配的URL时,则跳转到对应的页面.<br/>
你也可以按照你喜欢的方式控制路由展示,具体使用方法请参考[react-router](https://reacttraining.com/react-router/core/guides/philosophy)

> 因为已经配置了connected-react-router, 如果要在redux中进行页面跳转,可以参考下面的代码.
> ```
> import { put, call } from 'redux-saga/effects';
> import { push } from 'connected-react-router';
> import { loginPage } from 'src/config/routerConfig';
> import UserReducer from 'src/reducers/user';
>
> const { actions } = UserReducer;
>
> export default class Class {
>   @TakeEvery(actions.gotoLogin)
>   static* gotoLogin({ data }) {
>     // 跳转登录页面
>      yield put(push(loginPage.url));
>   }
> }
> ```

### 代码规范(eslint)
在项目根目录下,有个`.eslintrc.js`文件,该文件是eslint的配置文件.<br/>
目前已配置的功能:
1. 使用babel-eslint作为解析规则
2. 在eslint中使用`import/resolver`插件,用来忽略webpack配置的别名,
3. 配置了airbnb的代码风格,如果你不喜欢(可以修改为其他的代码规范或者自定义代码检查规则)
> 如果在代码中,你要单独忽略某些eslint提示的错误,可以使用下面写法
> ```
> /* eslint 规则名:0 */
> 你的代码;
> ```
> 示例:
> ```
> /* eslint no-underscore-dangle:0 */ // 忽略不能使用_命名的报错
> const _id = '';
> ```

### 国际化(react-intl-universal)
国际化插件使用react-intl-universal实现.
如果需要使用国际化功能,在页面显示前,需要执行初始化操作
```
import intl from 'react-intl-universal';

// 国际化数据对象
const locales = {
  "en-US": require('./locales/en-US.js'),
  "zh-CN": require('./locales/zh-CN.js'),
};

// 初始化操作
intl.init({ // init返回的是一个promise对象,初始化成功后会resolve返回.
  currentLocale: 'en-US', // 当前使用的语言
  locales,
}).then((res)=> {
  // 初始化完成后,就可以使用intl.get方法获取国际化对象中的值,并且可以使用defaultMessage函数设置默认值.
  intl.get('message').defaultMessage('hello');
});
```
如果需要切换当前使用语言,只需要重新执行`intl.init({currentLocale: '需要切换到语言',locales})`方法就行 <br/>
[具体使用文档](https://github.com/alibaba/react-intl-universal)

### redux开发工具
在项目中配置了redux-devtools-extension插件,只需要在浏览器中安装Redux DevTools插件,就可以在F12开发者工具栏看到一个新的TAB标签栏`redux`.
![Redux DevTools](https://lh3.googleusercontent.com/wfhSnnYEQc3TCXbRTpTloa-XZesgDt0xAogzGoLF1BUCU04aYhdwAjueJYTtDxfRiqjUfC539g=w640-h400-e365)


### UI库(antd)
因为已经配置了babel-plugin-import插件,所以,你只需要直接引用antd的组件就行
```
import { Button } from 'antd';
```
antd 组件的 js 和 css 代码只都会按需加载.
[antd使用文档](https://ant.design/docs/react/getting-started-cn)

### 装饰器
目前该项目已经配置了`@babel/plugin-proposal-decorators`插件和`@babel/plugin-proposal-class-properties`插件,你可以自由的使用装饰器
1. 类装饰
2. 类属性装饰器
3. 类方法装饰器
装饰器具体使用方式,可以参考[阮一峰的ES6入门](http://es6.ruanyifeng.com/#docs/decorator)
