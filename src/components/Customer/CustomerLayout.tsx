import {Outlet} from 'react-router-dom'
import styles from './CustomerLayout.module.css'
import {BottomNav} from "@/components/Customer/BottomNav.tsx";


export function CustomerLayout() {

    return (
        <div className={styles.wrapper}>


            <Outlet/>
            <BottomNav/>
        </div>
    )
}
