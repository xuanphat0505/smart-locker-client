import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSelection.module.css';

type Role = 'shipper' | 'customer';

export function RoleSelection(){
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Role>('shipper');

    const handleSelectRole = (role: Role) => {
        setActiveTab(role);
        navigate(`/${role}/login`);
        console.log(activeTab);
    }

    return (
        <div className={`page ${styles.container}`}>
            <header className={styles.header}>
                <svg
                    className={styles.logo}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="28" height="28" rx="8" fill="#2563EB" />
                    <rect x="5" y="8" width="18" height="13" rx="2" fill="white" fillOpacity="0.9" />
                    <rect x="5" y="8" width="18" height="5" rx="2" fill="white" />
                    <circle cx="14" cy="15.5" r="1.5" fill="#2563EB" />
                    <rect x="13.25" y="15.5" width="1.5" height="2.5" fill="#2563EB" />
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
                    >
            <span className={`${styles.iconBadge} ${styles['iconBadge--blue']}`}>
              📦
            </span>
                        <div className={styles.cardText}>
                            <div className={styles.cardTitle}>Tôi là Shipper</div>
                            <div className={styles.cardDesc}>Gửi hàng vào tủ cho khách</div>
                        </div>
                        <span className={styles.arrow}>›</span>
                    </button>

                    <button
                        className={styles.card}
                        onClick={() => handleSelectRole('customer')}
                    >
            <span className={`${styles.iconBadge} ${styles['iconBadge--green']}`}>
              🔑
            </span>
                        <div className={styles.cardText}>
                            <div className={styles.cardTitle}>Tôi là Khách hàng</div>
                            <div className={styles.cardDesc}>Nhận hàng bằng mã OTP</div>
                        </div>
                        <span className={styles.arrow}>›</span>
                    </button>
                </div>
            </main>


        </div>
    );
};

