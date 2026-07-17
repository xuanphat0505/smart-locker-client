import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ShipperBottomNav.module.css';

const NAV = [
    {
        path: '/shipper/map',
        label: 'Bản đồ tủ',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 15 9 18 3 15"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
        ),
    },
    {
        path: '/shipper/history',
        label: 'Lịch sử gửi',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
        ),
    },
    {
        path: '/shipper',
        label: 'Gửi hàng',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
        ),
    },
    {
        path: '/shipper/report',
        label: 'Báo sự cố',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        ),
    },
    {
        path: '/shipper/profile',
        label: 'Tôi',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        ),
    },
];

export function ShipperBottomNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const navRef = useRef<HTMLElement | null>(null);
    const [width, setWidth] = useState(375);

    useEffect(() => {
        if (!navRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(navRef.current);
        return () => observer.disconnect();
    }, []);

    const cx = width / 2;
    // Curved cutout path geometries
    const pathD = `M 0 16 L ${cx - 48} 16 C ${cx - 30} 16, ${cx - 35} 44, ${cx} 44 C ${cx + 35} 44, ${cx + 30} 16, ${cx + 48} 16 L ${width} 16 L ${width} 72 L 0 72 Z`;
    const borderD = `M 0 16 L ${cx - 48} 16 C ${cx - 30} 16, ${cx - 35} 44, ${cx} 44 C ${cx + 35} 44, ${cx + 30} 16, ${cx + 48} 16 L ${width} 16`;

    // Mobile layout split:
    // Left items: Bản đồ, Lịch sử (index 0, 1)
    // Central FAB: Gửi hàng (index 2)
    // Right items: Báo sự cố, Tôi (index 3, 4)
    const leftItems = [NAV[0], NAV[1]];
    const fabItem = NAV[2];
    const rightItems = [NAV[3], NAV[4]];

    const isRouteActive = (itemPath: string) => {
        if (itemPath === '/shipper') {
            // Active for all shipment wizard steps
            return pathname === '/shipper' || pathname === '/shipper/package-info' || pathname === '/shipper/success';
        }
        return pathname === itemPath;
    };

    const renderItem = (item: typeof NAV[number]) => {
        const active = isRouteActive(item.path);
        return (
            <button
                key={item.path}
                className={`${styles.item} ${active ? styles.itemActive : ''}`}
                onClick={() => navigate(item.path)}
            >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
            </button>
        );
    };

    return (
        <nav className={styles.nav} ref={navRef}>
            {/* ── MOBILE/TABLET VIEW ── */}
            <div className={styles.mobileContainer}>
                <svg className={styles.svgBg} width="100%" height="72" viewBox={`0 0 ${width} 72`} preserveAspectRatio="none">
                    <path d={pathD} className={styles.bgPath} />
                    <path d={borderD} className={styles.borderPath} />
                </svg>

                <button
                    className={`${styles.fab} ${isRouteActive(fabItem.path) ? styles.fabActive : ''}`}
                    onClick={() => navigate(fabItem.path)}
                    aria-label={fabItem.label}
                >
                    <span className={styles.fabIcon}>{fabItem.icon}</span>
                </button>

                <div className={styles.itemsContainer}>
                    {leftItems.map(renderItem)}
                    <div className={styles.centerSpacer} />
                    {rightItems.map(renderItem)}
                </div>
            </div>

            {/* ── DESKTOP VIEW ── */}
            <div className={styles.desktopContainer}>
                {NAV.map(renderItem)}
            </div>
        </nav>
    );
}
