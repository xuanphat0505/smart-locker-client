import {useNavigate} from 'react-router-dom'
import {MOCK_CUSTOMER_NAME, MOCK_PACKAGES} from "@/data/customer.mock.ts";
import {EPackageStatus} from '@/types/customer.types.ts'
import styles from './Profile.module.css'

const MENU = [
    {
        group: 'Tài khoản',
        items: [
            {icon: '👤', label: 'Thông tin cá nhân', sub: 'Tên, email, số điện thoại'},
            {icon: '🔒', label: 'Đổi mật khẩu', sub: 'Bảo mật tài khoản'},
            {icon: '🔔', label: 'Thông báo', sub: 'Zalo, SMS, email'},
        ],
    },
    {
        group: 'Hỗ trợ',
        items: [
            {icon: '❓', label: 'Hướng dẫn sử dụng', sub: 'Cách nhận hàng, mở tủ'},
            {icon: '📞', label: 'Liên hệ hỗ trợ', sub: 'Hotline & chat trực tuyến'},
            {icon: '⭐', label: 'Đánh giá ứng dụng', sub: 'Giúp chúng tôi cải thiện'},
        ],
    },
]

export function Profile() {
    const navigate = useNavigate()

    const totalPkg = MOCK_PACKAGES.length
    const receivedPkg = MOCK_PACKAGES.filter(p => p.status === EPackageStatus.RECEIVED).length
    const waitingPkg = MOCK_PACKAGES.filter(p => p.status === EPackageStatus.WAITING).length

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.profileCard}>
                    <div className={styles.avatar}>{MOCK_CUSTOMER_NAME.charAt(0)}</div>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.name}>{MOCK_CUSTOMER_NAME}</h2>
                        <p className={styles.email}>vanAn@gmail.com</p>
                    </div>
                    <button className={styles.editBtn} onClick={() => navigate('/customer/profile/personal-info')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>

                <div className={styles.statsRow}>
                    {[
                        {value: totalPkg, label: 'Tổng đơn'},
                        {value: receivedPkg, label: 'Đã nhận'},
                        {value: waitingPkg, label: 'Đang chờ'},
                    ].map(stat => (
                        <div key={stat.label} className={styles.statBox}>
                            <span className={styles.statVal}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {MENU.map(group => (
                    <div key={group.group} className={styles.menuGroup}>
                        <p className={styles.groupLabel}>{group.group}</p>
                        <div className={styles.menuCard}>
                            {group.items.map((item, idx) => (

                                <button key={item.label}
                                        className={`${styles.menuItem} ${idx !== group.items.length - 1 ? styles.menuItemBorder : ''}`}
                                        onClick={() => {
                                            if (item.label === 'Thông tin cá nhân') navigate('/customer/profile/personal-info')
                                            if (item.label === 'Đổi mật khẩu') navigate('/customer/profile/change-password')
                                            if (item.label === 'Thông báo') navigate('/customer/profile/notifications')
                                            if (item.label === 'Đánh giá ứng dụng') navigate('/customer/profile/app-rating')
                                            if (item.label === 'Hướng dẫn sử dụng') navigate('/customer/profile/user-guide')
                                            if (item.label === 'Liên hệ hỗ trợ') navigate('/customer/profile/contact')
                                        }}>

                                    <span className={styles.menuIcon}>{item.icon}</span>
                                    <span className={styles.menuText}>
                                        <span className={styles.menuLabel}>{item.label}</span>
                                        <span className={styles.menuSub}>{item.sub}</span>
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeWidth="2">
                                        <path d="M9 18l6-6-6-6"/>
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}


                <button className={styles.logoutBtn} onClick={() => navigate('/')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Đăng xuất
                </button>

                <p className={styles.version}>🛡 SmartLocker v1.0.0</p>
            </div>

        </div>
    )
}