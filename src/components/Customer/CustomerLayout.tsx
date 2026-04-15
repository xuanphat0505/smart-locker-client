import {Outlet} from 'react-router-dom'
import styles from './CustomerLayout.module.css'

export function CustomerLayout() {
    return (
        <div className={styles.wrapper}>
            <Outlet/>
        </div>
    )
}