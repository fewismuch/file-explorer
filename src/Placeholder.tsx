import React from "react";
// @ts-ignore
import styles from "./Placeholder.module.css";

export const Placeholder = (props) => {
  const left = (props.depth + 1) * 24;
  const left2 = props.depth * 24



  return (
    <div className={styles.root} style={{left}}>
      {
        Array.from({length: props.depth}).map((_, i) => {
          return <div key={i} className={styles.rootBg} style={{left: -(props.depth-i) * 24}}></div>
        })
      }
      {/*<div className={styles.rootBg} style={{left: -(props.depth) * 24}}></div>*/}
      {/*<div className={styles.rootBg} style={{left: -(props.depth-1) * 24}}></div>*/}
    </div>

  );
};
