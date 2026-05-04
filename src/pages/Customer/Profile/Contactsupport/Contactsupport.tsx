import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppButton} from '@/components/Ui/AppButton'
import {AppInput} from '@/components/Ui/AppInput'
import {AppText} from '@/components/Ui/AppText'
import styles from './Contactsupport.module.css'

const CONTACT_METHODS = [
    {
        id: 'hotline',
        icon: '☎',
        color: '#059669',
        bg: '#d1fae5',
        label: 'Hotline',
        value: '1900 1234',
        sub: 'Miễn phí - 7:00 đến 22:00 hằng ngày',
        action: 'Gọi ngay',
    },
    {
        id: 'zalo',
        icon: '💬',
        color: '#0068ff',
        bg: '#eff6ff',
        label: 'Zalo OA',
        value: 'SmartLocker Official',
        sub: 'Phản hồi trong vòng 15 phút',
        action: 'Nhắn tin',
    },
    {
        id: 'email',
        icon: '✉',
        color: '#7c3aed',
        bg: '#f5f3ff',
        label: 'Email',
        value: 'support@smartlocker.vn',
        sub: 'Phản hồi trong 24 giờ làm việc',
        action: 'Gửi mail',
    },
]

const FAQS = [
    {q: 'Tủ không mở được?', a: 'Thử lại OTP, nếu vẫn lỗi gọi hotline 1900 1234 để được hỗ trợ mở tủ từ xa.'},
    {q: 'Hàng bị hư hỏng trong tủ?', a: 'Chụp ảnh ngay và liên hệ hotline trong vòng 24h để được xử lý bồi thường.'},
    {q: 'Đổi số điện thoại nhận OTP?', a: 'Vào Thông tin cá nhân, cập nhật số điện thoại mới và xác thực OTP.'},
    {q: 'Quá thời gian 48h chưa lấy?', a: 'Liên hệ hotline để gia hạn. Phí giữ hàng thêm là 5.000đ/giờ.'},
]

export function ContactSupport() {
    const navigate = useNavigate()
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <AppText as="h1" variant="body" className={styles.title}>Liên hệ hỗ trợ</AppText>
                <div style={{width: 40}}/>
            </div>

            <div className={styles.body}>
                <div className={styles.heroCard}>
                    <div className={styles.heroCircle}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path
                                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                    </div>
                    <div>
                        <AppText variant="body" className={styles.heroText}>Chúng tôi luôn ở đây</AppText>
                        <AppText variant="caption" className={styles.heroSub}>
                            Đội ngũ hỗ trợ sẵn sàng giúp bạn 7 ngày/tuần
                        </AppText>
                    </div>
                </div>

                <div className={styles.sectionLabel}>Kênh liên hệ</div>
                <div className={styles.methodsCard}>
                    {CONTACT_METHODS.map((m, idx) => (
                        <div key={m.id}
                             className={`${styles.methodRow} ${idx < CONTACT_METHODS.length - 1 ? styles.methodRowBorder : ''}`}>
                            <div className={styles.methodIcon} style={{background: m.bg}}>
                                <span>{m.icon}</span>
                            </div>
                            <div className={styles.methodInfo}>
                                <span className={styles.methodLabel}>{m.label}</span>
                                <span className={styles.methodValue} style={{color: m.color}}>{m.value}</span>
                                <span className={styles.methodSub}>{m.sub}</span>
                            </div>
                            <button className={styles.methodBtn} style={{background: m.bg, color: m.color}}>
                                {m.action}
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.sectionLabel}>Câu hỏi thường gặp</div>
                <div className={styles.faqCard}>
                    {FAQS.map((faq, i) => (
                        <div key={i} className={`${styles.faqItem} ${i < FAQS.length - 1 ? styles.faqItemBorder : ''}`}>
                            <button
                                className={styles.faqQ}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span>{faq.q}</span>
                                <svg
                                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke={openFaq === i ? '#6366f1' : '#9ca3af'} strokeWidth="2.5"
                                    className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ''}`}
                                >
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </button>
                            {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
                        </div>
                    ))}
                </div>

                <div className={styles.sectionLabel}>Gửi yêu cầu hỗ trợ</div>
                {sent ? (
                    <div className={styles.sentCard}>
                        <span className={styles.sentIcon}>✓</span>
                        <AppText variant="body" className={styles.sentTitle}>Đã gửi thành công!</AppText>
                        <AppText variant="caption" className={styles.sentSub}>
                            Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                        </AppText>
                        <AppButton variant="secondary" onClick={() => {
                            setSent(false)
                            setTopic('')
                            setMessage('')
                        }}>
                            Gửi yêu cầu khác
                        </AppButton>
                    </div>
                ) : (
                    <div className={styles.formCard}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Chủ đề</label>
                            <select
                                className={styles.select}
                                value={topic}
                                onChange={e => setTopic(e.target.value)}
                            >
                                <option value="">Chọn vấn đề gặp phải...</option>
                                <option value="locker">Tủ không mở được</option>
                                <option value="otp">Không nhận được OTP</option>
                                <option value="package">Vấn đề về bưu kiện</option>
                                <option value="account">Tài khoản / đăng nhập</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <AppInput
                                multiline
                                rows={4}
                                label="Mô tả chi tiết"
                                placeholder="Mô tả vấn đề bạn gặp phải..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <p className={styles.charCount}>{message.length}/500</p>
                        </div>
                        <AppButton
                            fullWidth
                            disabled={!topic || !message}
                            onClick={() => setSent(true)}
                        >
                            Gửi yêu cầu
                        </AppButton>
                    </div>
                )}
            </div>
        </div>
    )
}
