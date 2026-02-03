import styles from './MainLayout.module.css';
export function MainLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.gridContainer}>
        <div className={styles.item1}>
          <span className="material-symbols-outlined">view_apps</span>

          <h1 className={styles.H1header}>welcome</h1>

          <p className={styles.info}>contact</p>
        </div>
        <div className={styles.item2}>
          <div className={styles.twoElementsContainer}>
            <div className={styles.elementOne}>
              access tax files
              <span className={styles.fileIcon}>file_open</span>
            </div>
            <div className={styles.elementTwo}>
              view all the current progress
              <span>view_apps</span>
            </div>
          </div>
        </div>
        <div className={styles.item3}>&copy;2026 Ricardo Alvear</div>
      </div>
    </div>
  );
}
