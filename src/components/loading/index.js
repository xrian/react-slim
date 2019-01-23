/**
 * Created by zhangsong on 2019-01-21.
 */
import React from 'react';
import Styles from './index.module.scss';

export default ({ spinning = true, children }) => (
  <div className={Styles.wrapper}>
    {spinning ? (
      <div className={Styles.center}>
        <div className={Styles.skFoldingCube}>
          <div className={Styles.skCube} />
          <div className={`${Styles.skCube} ${Styles.skCube2}`} />
          <div className={`${Styles.skCube} ${Styles.skCube4}`} />
          <div className={`${Styles.skCube} ${Styles.skCube3}`} />
        </div>
      </div>
    ) : null}
    {
      React.Children.map(children, i => i)
    }
  </div>
);
