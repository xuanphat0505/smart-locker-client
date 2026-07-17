import { useNavigate } from 'react-router-dom';
import styles from './Roleselection.module.css';
import { CursorGrid } from '@/components/Ui/CursorGrid/CursorGrid';

type Role = 'shipper' | 'customer';

export function RoleSelection() {
    const navigate = useNavigate();

    const handleSelectRole = (role: Role) => {
        navigate(`/${role}/login`);
    };

    return (
        <div className={`page ${styles.container}`}>
            <CursorGrid />
            {/* Left Column: Visual Brand Illustration (Visible on Desktop) */}
            <div className={styles.brandPanel}>
                <div className={styles.animatedBlob1}></div>
                <div className={styles.animatedBlob2}></div>
                
                <div className={styles.brandContent}>
                    <div className={styles.brandHeader}>
                        <svg
                            className={styles.panelLogo}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="32" height="32" rx="10" fill="url(#logo-grad-panel)"/>
                            <rect x="6" y="9" width="20" height="14" rx="3" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                            <circle cx="16" cy="16" r="2" fill="white"/>
                            <path d="M16 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <defs>
                                <linearGradient id="logo-grad-panel" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#60A5FA"/>
                                    <stop offset="1" stopColor="#3B82F6"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className={styles.brandTitle}>SmartLocker</span>
                    </div>

                    <div className={styles.illustrationWrapper}>
                        <svg className={styles.lockerSvg} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="100" cy="200" rx="60" ry="10" fill="rgba(0,0,0,0.25)" filter="blur(4px)" />
                            <rect x="50" y="20" width="100" height="170" rx="8" fill="url(#locker-body-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <rect x="90" y="32" width="20" height="16" rx="2" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                            <rect x="94" y="36" width="12" height="8" rx="0.5" fill="#60a5fa" opacity="0.8" className="pulse-glow" />
                            
                            <rect x="56" y="58" width="40" height="30" rx="3" fill="url(#slot-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            <rect x="56" y="94" width="40" height="30" rx="3" fill="url(#slot-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            <rect x="56" y="130" width="40" height="50" rx="3" fill="url(#slot-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            
                            <rect x="104" y="58" width="40" height="50" rx="3" fill="url(#slot-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            <rect x="104" y="114" width="40" height="30" rx="3" fill="url(#slot-grad-active)" stroke="url(#active-border-grad)" strokeWidth="1.5" />
                            <circle cx="124" cy="129" r="3" fill="#10b981" />
                            
                            <rect x="104" y="150" width="40" height="30" rx="3" fill="url(#slot-grad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                            <g className={styles.floatingBox}>
                                <rect x="142" y="30" width="28" height="28" rx="14" fill="#3b82f6" fillOpacity="0.15" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                                <path d="M148 44l6-3 6 3v6l-6 3-6-3v-6zm6-3v6" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>

                            <g className={styles.floatingShield}>
                                <rect x="26" y="90" width="28" height="28" rx="14" fill="#10b981" fillOpacity="0.15" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                                <path d="M35 101l5-3 5 3v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-3z" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            
                            <defs>
                                <linearGradient id="locker-body-grad" x1="50" y1="20" x2="150" y2="190" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1e293b" />
                                    <stop offset="1" stopColor="#0f172a" />
                                </linearGradient>
                                <linearGradient id="slot-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                    <stop stopColor="#334155" stopOpacity="0.5" />
                                    <stop offset="1" stopColor="#1e293b" stopOpacity="0.7" />
                                </linearGradient>
                                <linearGradient id="slot-grad-active" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                    <stop stopColor="#1e3a8a" stopOpacity="0.9" />
                                    <stop offset="1" stopColor="#0f172a" />
                                </linearGradient>
                                <linearGradient id="active-border-grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop stopColor="#3b82f6" />
                                    <stop offset="1" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    
                    <h2 className={styles.panelHeadline}>
                        Hệ thống tủ gửi đồ thông minh thế hệ mới
                    </h2>
                    <p className={styles.panelDesc}>
                        Giải pháp giao nhận bưu kiện tự động tiện lợi, bảo mật tuyệt đối 24/7 cho cả người giao và người nhận.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>⚡</span>
                            <div>
                                <h4 className={styles.featureTitle}>Giao Nhận Nhanh Chóng</h4>
                                <p className={styles.featureDesc}>Tiết kiệm thời gian, mở tủ chỉ với vài thao tác.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🛡️</span>
                            <div>
                                <h4 className={styles.featureTitle}>Bảo Mật Tối Đa</h4>
                                <p className={styles.featureDesc}>Bảo vệ đơn hàng với mã OTP xác thực qua Zalo/SMS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className={styles.interactivePanel}>
                <header className={styles.header}>
                    <svg
                        className={styles.logo}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="32" height="32" rx="10" fill="url(#logo-grad)"/>
                        <rect x="6" y="9" width="20" height="14" rx="3" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                        <circle cx="16" cy="16" r="2" fill="white"/>
                        <path d="M16 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <defs>
                            <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2563EB"/>
                                <stop offset="1" stopColor="#1D4ED8"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className={styles.brandName}>SmartLocker</span>
                </header>

                <main className={styles.body}>
                    <h1 className={styles.greeting}>Xin chào!</h1>
                    <p className={styles.subtitle}>
                        Vui lòng chọn vai trò của bạn để tiếp tục.
                    </p>

                    <div className={styles.cards}>
                        <button
                            className={styles.card}
                            onClick={() => handleSelectRole('shipper')}
                            aria-label="Chọn vai trò Shipper"
                        >
                            <span className={`${styles.iconBadge} ${styles.shipperBadge}`}>
                                <svg className={styles.cardSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </span>
                            <div className={styles.cardText}>
                                <div className={styles.cardTitle}>Tôi là Shipper</div>
                                <div className={styles.cardDesc}>Gửi hàng vào tủ cho khách hàng</div>
                            </div>
                            <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        <button
                            className={styles.card}
                            onClick={() => handleSelectRole('customer')}
                            aria-label="Chọn vai trò Khách hàng"
                        >
                            <span className={`${styles.iconBadge} ${styles.customerBadge}`}>
                                <svg className={styles.cardSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                                </svg>
                            </span>
                            <div className={styles.cardText}>
                                <div className={styles.cardTitle}>Tôi là Khách hàng</div>
                                <div className={styles.cardDesc}>Nhận bưu kiện bằng mã OTP bảo mật</div>
                            </div>
                            <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

