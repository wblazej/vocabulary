import { useEffect } from "react";
import styles from "../styles/Switch.module.scss";
import useLocalStorage from "../ts/useLocalStorage";

const ThemeToggler = () => {
    const [ theme, setTheme ] = useLocalStorage('theme', 'dark');
  
    useEffect(() => {
      if (theme) {
        document.querySelector('html')?.setAttribute("data-theme", theme);
      }
    }, [theme]);

    return (
        <div className={styles["theme-switch-container"]}>
            <p>Dark theme</p>
            <div className={styles["toggle-radio"]}>
                <input type="radio" name="rdo" id={styles.yes} checked={theme == "dark"} onChange={() => setTheme('dark')} />
                <input type="radio" name="rdo" id={styles.no} checked={theme == "light"} onChange={() => setTheme('light')} />
                <div className={styles.switch}>
                    <label htmlFor={styles.yes}>Yes</label>
                    <label htmlFor={styles.no}>No</label>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default ThemeToggler;