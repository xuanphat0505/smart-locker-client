import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Userguide.module.css'


const GUIDES = [
    {
        id: 'receive',
        icon: '📦',
        color: '#6366f1',
        bg: '#ede9fe',
        title: 'Cách nhận hàng',
        steps: [
            {
                icon: '🔔',
                title: 'Nhận thông báo',
                desc: 'Khi bưu kiện được giao vào tủ, bạn sẽ nhận thông báo qua Zalo / SMS / Email kèm mã OTP.'
            },
            {icon: '📱', title: 'Mở ứng dụng', desc: 'Vào mục "Mở tủ" trên thanh điều hướng phía dưới.'},
            {icon: '🔢', title: 'Nhập mã OTP', desc: 'Điền mã OTP nhận được hoặc quét mã QR để xác thực.'},
            {icon: '🚪', title: 'Lấy hàng', desc: 'Tủ tự động mở. Lấy hàng và đóng cửa lại sau khi nhận xong.'},
        ],
    },
    {
        id: 'locker',
        icon: '🔒',
        color: '#0891b2',
        bg: '#e0f2fe',
        title: 'Tủ thông minh',
        steps: [
            {
                icon: '📏',
                title: 'Các cỡ tủ',
                desc: 'Tủ SmartLocker có 3 kích thước: Nhỏ (30×30cm), Vừa (40×50cm), Lớn (60×60cm).'
            },
            {
                icon: '⏰',
                title: 'Thời gian lưu trữ',
                desc: 'Bưu kiện được lưu tối đa 48 giờ. Sau thời gian này hệ thống sẽ gửi nhắc nhở.'
            },
            {
                icon: '🔐',
                title: 'Bảo mật',
                desc: 'Mỗi lần mở tủ dùng OTP khác nhau. Camera giám sát 24/7 tại khu vực tủ.'
            },
        ],
    },
    {
        id: 'shipper',
        icon: '🛵',
        color: '#059669',
        bg: '#d1fae5',
        title: 'Dành cho shipper',
        steps: [
            {
                icon: '🔍',
                title: 'Tìm tủ',
                desc: 'Chọn toà nhà và khu vực cần giao, hệ thống hiển thị tủ còn trống gần nhất.'
            },
            {
                icon: '📋',
                title: 'Nhập thông tin',
                desc: 'Điền thông tin bưu kiện: tên người nhận, số điện thoại, kích thước.'
            },
            {
                icon: '📤',
                title: 'Đặt hàng vào tủ',
                desc: 'Ô tủ tự mở. Đặt hàng vào và đóng lại. Hệ thống tự gửi OTP cho người nhận.'
            },
        ],
    },
    {
        id: 'faq',
        icon: '❓',
        color: '#d97706',
        bg: '#fef3c7',
        title: 'Câu hỏi thường gặp',
        steps: [
            {
                icon: '😟',
                title: 'Quên lấy hàng?',
                desc: 'Liên hệ hotline 1900 1234. Nhân viên sẽ hỗ trợ gia hạn hoặc chuyển tủ.'
            },
            {
                icon: '🔄',
                title: 'OTP không hoạt động?',
                desc: 'Kiểm tra số điện thoại trong hồ sơ. Chọn "Gửi lại OTP" sau 60 giây.'
            },
            {
                icon: '📵',
                title: 'Không có internet?',
                desc: 'Gọi hotline và đọc mã đơn hàng, nhân viên sẽ mở tủ từ xa cho bạn.'
            },
        ],
    },
]

export function UserGuide() {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState<string>('receive')

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className={styles.title}>Hướng dẫn sử dụng</h1>
                <div style={{width: 40}}/>
            </div>

            <div className={styles.body}>
                <div className={styles.illustration}>
                    <div className={styles.heroCircle}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v4M12 16h.01"/>
                        </svg>
                    </div>
                    <p className={styles.heroText}>Hướng dẫn chi tiết</p>
                    <p className={styles.heroSub}>Tất cả những gì bạn cần biết về SmartLocker</p>
                </div>

                {GUIDES.map(guide => {
                    const isOpen = expanded === guide.id
                    return (
                        <div key={guide.id} className={styles.accordion}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => setExpanded(isOpen ? '' : guide.id)}
                            >
                                <div className={styles.accIconWrap} style={{background: guide.bg}}>
                                    <span className={styles.accIcon}>{guide.icon}</span>
                                </div>
                                <span className={styles.accTitle} style={{color: isOpen ? guide.color : '#111827'}}>
                                    {guide.title}
                                </span>
                                <svg
                                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke={isOpen ? guide.color : '#9ca3af'} strokeWidth="2.5"
                                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                                >
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </button>

                            {isOpen && (
                                <div className={styles.accordionBody}>
                                    {guide.steps.map((step, i) => (
                                        <div key={i} className={styles.step}>
                                            <div className={styles.stepLeft}>
                                                <div className={styles.stepNumWrap} style={{background: guide.bg}}>
                                                    <span className={styles.stepNum}
                                                          style={{color: guide.color}}>{i + 1}</span>
                                                </div>
                                                {i < guide.steps.length - 1 && (
                                                    <div className={styles.stepLine} style={{background: guide.bg}}/>
                                                )}
                                            </div>
                                            <div className={styles.stepContent}>
                                                <div className={styles.stepHeader}>
                                                    <span className={styles.stepIcon}>{step.icon}</span>
                                                    <span className={styles.stepTitle}>{step.title}</span>
                                                </div>
                                                <p className={styles.stepDesc}>{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

                <div className={styles.contactCard}>
                    <p className={styles.contactText}>Vẫn còn thắc mắc?</p>
                    <button className={styles.contactBtn} onClick={() => navigate('/customer/profile/contact')}>
                        📞 Liên hệ hỗ trợ ngay
                    </button>
                </div>
            </div>
        </div>
    )
}