import { Outlet } from 'react-router-dom';
import styles from './ShipperLayout.module.css';
import { ShipperBottomNav } from '@/components/Shipper/ShipperBottomNav';
import { CursorGrid } from '@/components/Ui/CursorGrid/CursorGrid';

export function ShipperLayout() {
    return (
        <div className={`page ${styles.wrapper}`}>
            <div className={styles.mainContent}>
                <CursorGrid />
                <Outlet />
            </div>
            <ShipperBottomNav />
        </div>
    );
}

export default ShipperLayout;
