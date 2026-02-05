import styles from './MainLayout.module.css';
import {Header} from "../../header/Header";
import {NavbarC} from '../../navigation/Navbar';
import {Footer} from "../../footer/Footer";
export function MainLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.gridContainer}>
        <div className={styles.item1}>
          <h1 className={styles.H1header}>
            <Header />
          </h1>

          <div className={styles.info}>
            <NavbarC />
          </div>
        </div>

        <div className={styles.item2}>
          <div className={styles.twoElementsContainer}>
            <div className={styles.elementOne}>
              <button>Access Tax Files</button>
              <span className="material-symbols-outlined">file_open</span>
            </div>
            <div className={styles.elementTwo}>
              <button>View File Progress</button>
              <span className="material-symbols-outlined">view_apps</span>
            </div>
            <div className={styles.elementThree}>
              <button>Alerts</button>
              <span className="material-symbols-outlined">alarm</span>
            </div>
          </div>
        </div>

        <div className={styles.item3}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
