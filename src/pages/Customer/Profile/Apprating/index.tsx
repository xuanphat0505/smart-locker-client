import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Apprating.module.css'

const ASPECTS = [
    {id: 'ui', label: 'Giao diện đẹp'},
    {id: 'speed', label: 'Tốc độ nhanh'},
    {id: 'easy', label: 'Dễ sử dụng'},
    {id: 'reliable', label: 'Ổn định'},
    {id: 'support', label: 'Hỗ trợ tốt'},
    {id: 'useful', label: 'Tính năng hữu ích'},
]

const STAR_LABELS = ['', 'Tệ', 'Không hay', 'Bình thường', 'Khá tốt', 'Tuyệt vời!']
const STAR_COLORS = ['', '#ef4444', '#f97316', '#f59e0b', '#3b82f6', '#22c55e']

export function AppRating() {
    const navigate = useNavigate()
    const [stars, setStars] = useState(0)
    const [hovered, setHovered] = useState(0)
    const [aspects, setAspects] = useState<string[]>([])
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const display = hovered || stars

    const toggleAspect = (id: string) => {
        setAspects(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
    }

    if (submitted) {
        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <button className={styles.backBtn} onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2.5">
                            <path d="M19 12H5M12 5l-7 7 7 7"/>
                        </svg>
                    </button>
                    <h1 className={styles.title}>Đánh giá ứng dụng</h1>
                    <div style={{width: 40}}/>
                </div>
                <div className={styles.thankWrap}>
                    <div className={styles.thankCircle}>🎉</div>
                    <h2 className={styles.thankTitle}>Cảm ơn bạn!</h2>
                    <p className={styles.thankText}>Đánh giá của bạn giúp chúng tôi cải thiện SmartLocker tốt hơn mỗi
                        ngày.</p>
                    <button className={styles.saveBtn} onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className={styles.title}>Đánh giá ứng dụng</h1>
                <div style={{width: 40}}/>
            </div>

            <div className={styles.body}>
                {/* Hero */}
                <div className={styles.heroCard}>
                    <div className={styles.appIcon}>📦</div>
                    <p className={styles.appName}>SmartLocker</p>
                    <p className={styles.appSub}>Ứng dụng nhận hàng thông minh</p>

                    {/* Stars */}
                    <div className={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <button
                                key={i}
                                className={styles.starBtn}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(0)}
                                onClick={() => setStars(i)}
                                type="button"
                            >
                                <svg
                                    width="40" height="40" viewBox="0 0 24 24"
                                    fill={i <= display ? (STAR_COLORS[display] || '#f59e0b') : 'none'}
                                    stroke={i <= display ? (STAR_COLORS[display] || '#f59e0b') : '#d1d5db'}
                                    strokeWidth="1.5"
                                    className={`${styles.starSvg} ${i <= display ? styles.starActive : ''}`}
                                >
                                    <polygon
                                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                            </button>
                        ))}
                    </div>

                    {display > 0 && (
                        <p className={styles.starLabel} style={{color: STAR_COLORS[display]}}>
                            {STAR_LABELS[display]}
                        </p>
                    )}
                    {display === 0 && <p className={styles.starPlaceholder}>Chạm để đánh giá</p>}
                </div>

                {/* Aspects */}
                {stars > 0 && (
                    <>
                        <div className={styles.card}>
                            <p className={styles.sectionLabel}>Điều bạn thích ở SmartLocker</p>
                            <div className={styles.aspectGrid}>
                                {ASPECTS.map(a => (
                                    <button
                                        key={a.id}
                                        className={`${styles.aspectChip} ${aspects.includes(a.id) ? styles.aspectChipOn : ''}`}
                                        onClick={() => toggleAspect(a.id)}
                                        type="button"
                                    >
                                        {aspects.includes(a.id) && <span className={styles.chipCheck}>✓ </span>}
                                        {a.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.card}>
                            <p className={styles.sectionLabel}>Góp ý thêm (không bắt buộc)</p>
                            <textarea
                                className={styles.textarea}
                                placeholder="Chia sẻ trải nghiệm của bạn để chúng tôi cải thiện..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                rows={4}
                            />
                            <p className={styles.charCount}>{comment.length}/300</p>
                        </div>
                    </>
                )}

                <button
                    className={`${styles.saveBtn} ${stars === 0 ? styles.saveBtnDisabled : ''}`}
                    disabled={stars === 0}
                    onClick={() => setSubmitted(true)}
                >
                    ⭐ Gửi đánh giá
                </button>

                <button className={styles.skipBtn} onClick={() => navigate(-1)}>
                    Bỏ qua
                </button>
            </div>
        </div>
    )
}