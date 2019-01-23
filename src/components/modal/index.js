/**
 * Created by zhangsong on 2019-01-22.
 */
import {
  Modal,
} from 'antd';

function generatorObj(params, resolve, reject) {
  const defaultValue = {
    onOk: () => {
      resolve();
    },
    onCancel: () => {
      reject();
    },
  };
  if (typeof params === 'string') {
    defaultValue.title = params;
  } else if (typeof params === 'object') {
    if (params.autoFocusButton) { // 指定自动获得焦点的按钮
      defaultValue.autoFocusButton = params.autoFocusButton;
    }
    if (params.cancelText) { // 取消按钮文字
      defaultValue.cancelText = params.cancelText;
    }
    if (params.centered) { // 垂直居中展示 Modal
      defaultValue.centered = params.centered;
    }
    if (params.className) { // 容器类名
      defaultValue.className = params.className;
    }
    if (params.content) { // 内容
      defaultValue.content = params.content;
    }
    if (params.icon) { // 自定义图标（3.12.0 新增）
      defaultValue.icon = params.icon;
    }
    if (params.iconType) { // 图标类型（3.12.0 后废弃，请使用 icon）
      defaultValue.iconType = params.iconType;
    }
    if (params.maskClosable) { // 点击蒙层是否允许关闭
      defaultValue.maskClosable = params.maskClosable;
    }
    if (params.okText) { // 确认按钮文字
      defaultValue.okText = params.okText;
    }
    if (params.okType) { // 确认按钮类型
      defaultValue.okType = params.okType;
    }
    if (params.okButtonProps) { // ok 按钮 props
      defaultValue.okButtonProps = params.okButtonProps;
    }
    if (params.cancelButtonProps) { // cancel 按钮 props
      defaultValue.cancelButtonProps = params.cancelButtonProps;
    }
    if (params.title) { // 标题
      defaultValue.title = params.title;
    }
    if (params.width) { // 宽度
      defaultValue.width = params.width;
    }
    if (params.zIndex) { // 设置 Modal 的 z-index
      defaultValue.zIndex = params.zIndex;
    }
  }
  return defaultValue;
}

const success = params => new Promise((resolve, reject) => {
  const obj = generatorObj(params, resolve, reject);
  Modal.success(obj);
});

const info = params => new Promise((resolve, reject) => {
  const obj = generatorObj(params, resolve, reject);
  Modal.info(obj);
});
const error = params => new Promise((resolve, reject) => {
  const obj = generatorObj(params, resolve, reject);
  Modal.error(obj);
});
const warning = params => new Promise((resolve, reject) => {
  const obj = generatorObj(params, resolve, reject);
  Modal.warning(obj);
});
const confirm = params => new Promise((resolve, reject) => {
  const obj = generatorObj(params, resolve, reject);
  Modal.confirm(obj);
});

export default {
  success,
  info,
  error,
  warning,
  confirm,
};
