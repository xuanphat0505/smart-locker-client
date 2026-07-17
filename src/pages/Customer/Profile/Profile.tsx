import {useNavigate} from 'react-router-dom'
import {MOCK_CUSTOMER_NAME, MOCK_PACKAGES} from "@/data/customer.mock.ts";
import {EPackageStatus} from '@/types/customer.types.ts'
import styles from './Profile.module.css'
import {useAuthStore} from '@/store/useAuthStore'

const MENU = [
    {
        group: 'Tài khoản',
        items: [
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                ),
                label: 'Thông tin cá nhân',
                sub: 'Tên, email, số điện thoại'
            },
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                ),
                label: 'Đổi mật khẩu',
                sub: 'Bảo mật tài khoản'
            },
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                ),
                label: 'Thông báo',
                sub: 'Zalo, SMS, email'
            },
        ],
    },
    {
        group: 'Hỗ trợ',
        items: [
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                ),
                label: 'Hướng dẫn sử dụng',
                sub: 'Cách nhận hàng, mở tủ'
            },
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                ),
                label: 'Liên hệ hỗ trợ',
                sub: 'Hotline & chat trực tuyến'
            },
            {
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                ),
                label: 'Đánh giá ứng dụng',
                sub: 'Giúp chúng tôi cải thiện'
            },
        ],
    },
]

export function Profile() {
    const navigate = useNavigate()
    const {signOut} = useAuthStore()

    const totalPkg = MOCK_PACKAGES.length
    const receivedPkg = MOCK_PACKAGES.filter(p => p.status === EPackageStatus.RECEIVED).length
    const waitingPkg = MOCK_PACKAGES.filter(p => p.status === EPackageStatus.WAITING).length

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.splitLayout}>
                    <div className={styles.leftCol}>
                        <div className={styles.profileCard}>
                            <div className={styles.avatar}>{MOCK_CUSTOMER_NAME.charAt(0)}</div>
                            <div className={styles.profileInfo}>
                                <h2 className={styles.name}>{MOCK_CUSTOMER_NAME}</h2>
                                <p className={styles.email}>vanAn@gmail.com</p>
                            </div>
                            <button className={styles.editBtn} onClick={() => navigate('/customer/profile/personal-info')} aria-label="Sửa hồ sơ">
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

                        <button
                            className={styles.logoutBtn}
                            onClick={() => {
                                signOut()
                                navigate('/', {replace: true})
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Đăng xuất
                        </button>
                    </div>

                    <div className={styles.rightCol}>
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

                        <p className={styles.version}>🛡 SmartLocker v1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}