import styles from './Search.module.scss';

export function Search() {
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        placeholder="Поиск пиццы"
      />
    </div>
  );
}
