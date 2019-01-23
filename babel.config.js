/**
 * 导出需要加载的 babel 插件
 * @type {{plugins: *[][]}}
 */

module.exports = {
  presets: [],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }], // 增加解析装饰器插件
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'ant',
    ],
  ],
};
