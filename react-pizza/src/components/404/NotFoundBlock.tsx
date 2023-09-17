import styles from "./NotFoundBlock.module.scss";
import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
