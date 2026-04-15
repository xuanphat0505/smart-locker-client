import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Notifications.module.css'

type Channel = {
    id: string
    icon: string
    name: string
    desc: string
    color: string
    bg: string
}

type NotifSetting = {
    enabled: boolean
    newPackage: boolean
    reminder: boolean
    promotion: boolean
}

const CHANNELS: Channel[] = [
    {id: 'zalo', icon: '💬', name: 'Zalo', desc: 'Nhận tin qua Zalo OA', color: '#0068ff', bg: '#eff6ff'},
    {id: 'sms', icon: '📱', name: 'SMS', desc: 'Tin nhắn đến số điện thoại', color: '#7c3aed', bg: '#f5f3ff'},
    {id: 'email', icon: '✉️', name: 'Email', desc: 'Gửi đến vanAn@gmail.com', color: '#059669', bg: '#ecfdf5'},
]

const DEFAULT_SETTINGS: NotifSetting = {
    enabled: true,
    newPackage: true,
    reminder: true,
    promotion: false,
}

export function Notifications() {
    const navigate = useNavigate()
    const [settings, setSettings] = useState<Record<string, NotifSetting>>(
        Object.fromEntries(CHANNELS.map(c => [c.id, {...DEFAULT_SETTINGS}]))
    )

    const toggle = (channelId: string, key: keyof NotifSetting) => {
        setSettings(prev => {
            const updated = {...prev[channelId], [key]: !prev[channelId][key]}
            // if master off, turn off all sub
            if (key === 'enabled' && !updated.enabled) {
                updated.newPackage = false
                updated.reminder = false
                updated.promotion = false
            }
            // if any sub on, turn master on
            if (key !== 'enabled' && updated[key]) {
                updated.enabled = true
            }
            return {...prev, [channelId]: updated}
        })
    }

    const Switch = ({on, onToggle}: { on: boolean; onToggle: () => void }) => (
        <button
            className={`${styles.switch} ${on ? styles.switchOn : ''}`}
            onClick={onToggle}
            type="button"
        >
            <span className={styles.switchThumb}/>
        </button>
    )

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className={styles.title}>Thông báo</h1>
                <div style={{width: 40}}/>
            </div>

            <div className={styles.body}>
                <div className={styles.illustration}>
                    <div className={styles.bellCircle}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 01-3.46 0"/>
                        </svg>
                    </div>
                    <p className={styles.illustrationText}>Tuỳ chỉnh thông báo</p>
                    <p className={styles.illustrationSub}>Chọn kênh và loại thông báo bạn muốn nhận</p>
                </div>

                {CHANNELS.map(ch => (
                    <div key={ch.id} className={styles.channelCard}>
                        {/* Channel header */}
                        <div className={styles.channelHeader}>
                            <div className={styles.channelIconWrap} style={{background: ch.bg}}>
                                <span className={styles.channelIcon}>{ch.icon}</span>
                            </div>
                            <div className={styles.channelInfo}>
                                <span className={styles.channelName} style={{color: ch.color}}>{ch.name}</span>
                                <span className={styles.channelDesc}>{ch.desc}</span>
                            </div>
                            <Switch on={settings[ch.id].enabled} onToggle={() => toggle(ch.id, 'enabled')}/>
                        </div>

                        {/* Sub-settings */}
                        <div className={`${styles.subList} ${!settings[ch.id].enabled ? styles.subListDisabled : ''}`}>
                            {[
                                {
                                    key: 'newPackage' as const,
                                    label: 'Bưu kiện mới đến',
                                    sub: 'Khi có hàng vào tủ của bạn'
                                },
                                {
                                    key: 'reminder' as const,
                                    label: 'Nhắc nhở lấy hàng',
                                    sub: 'Trước khi hết thời gian lưu'
                                },
                                {
                                    key: 'promotion' as const,
                                    label: 'Khuyến mãi & tin tức',
                                    sub: 'Ưu đãi và cập nhật dịch vụ'
                                },
                            ].map((item, idx, arr) => (
                                <div key={item.key}
                                     className={`${styles.subItem} ${idx < arr.length - 1 ? styles.subItemBorder : ''}`}>
                                    <div className={styles.subText}>
                                        <span className={styles.subLabel}>{item.label}</span>
                                        <span className={styles.subDesc}>{item.sub}</span>
                                    </div>
                                    <Switch
                                        on={settings[ch.id][item.key]}
                                        onToggle={() => toggle(ch.id, item.key)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <p className={styles.note}>
                    💡 Bạn vẫn sẽ nhận thông báo quan trọng liên quan đến bảo mật dù đã tắt.
                </p>

                <button className={styles.saveBtn}>Lưu thay đổi</button>
            </div>
        </div>
    )
}