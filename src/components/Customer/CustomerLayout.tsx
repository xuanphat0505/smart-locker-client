import {Outlet} from 'react-router-dom'
import styles from './CustomerLayout.module.css'
import {BottomNav} from "@/components/Customer/BottomNav.tsx";
import {CursorGrid} from "@/components/Ui/CursorGrid/CursorGrid";

export function CustomerLayout() {
    return (
        <div className={`page ${styles.wrapper}`}>
            <div className={styles.mainContent}>
                <CursorGrid />
                <Outlet/>
            </div>
            <BottomNav/>
        </div>
    )
}
