import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {BottomNav} from '@/components/Customer/BottomNav.tsx'
import {MOCK_CUSTOMER_NAME} from "@/data/customer.mock.ts";
import styles from './PersonalInfo.module.css'

type TField = {
    key: string
    label: string
    value: string
    type?: string
    placeholder: string
    editable: boolean
}

const INITIAL_FIELDS: TField[] = [
    {
        key: 'name',
        label: 'Họ và tên',
        value: MOCK_CUSTOMER_NAME,
        type: 'text',
        placeholder: 'Nhập họ và tên',
        editable: true
    },
    {key: 'email', label: 'Email', value: 'vanAn@gmail.com', type: 'email', placeholder: 'Nhập email', editable: false},
    {
        key: 'phone',
        label: 'Số điện thoại',
        value: '0777 829 632',
        type: 'tel',
        placeholder: 'Nhập số điện thoại',
        editable: true
    },
    {key: 'dob', label: 'Ngày sinh', value: '01/01/2000', type: 'text', placeholder: 'DD/MM/YYYY', editable: true},
    {key: 'gender', label: 'Giới tính', value: 'Nam', type: 'text', placeholder: 'Nam / Nữ / Khác', editable: true},
    {
        key: 'addr',
        label: 'Địa chỉ',
        value: 'TP. Hồ Chí Minh',
        type: 'text',
        placeholder: 'Nhập địa chỉ',
        editable: true
    },
]

export function PersonalInfo() {
    const navigate = useNavigate()
    const [fields, setFields] = useState(INITIAL_FIELDS)
    const [editing, setEditing] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleChange = (key: string, val: string) => {
        setFields(f => f.map(x => x.key === key ? {...x, value: val} : x))
    }

    const handleSave = () => {
        setSaved(true)
        setEditing(false)
        setTimeout(() => setSaved(false), 2500)
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate('/customer/profile')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className={styles.title}>Thông tin cá nhân</h1>
                <button
                    className={`${styles.editToggle} ${editing ? styles.editToggleActive : ''}`}
                    onClick={() => editing ? handleSave() : setEditing(true)}
                >
                    {editing ? 'Lưu' : 'Sửa'}
                </button>
            </header>

            <div className={styles.body}>

                <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>
                        {MOCK_CUSTOMER_NAME.charAt(0)}
                    </div>
                    {editing && (
                        <button className={styles.avatarEdit}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2">
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                            </svg>
                        </button>
                    )}
                    <p className={styles.avatarName}>{MOCK_CUSTOMER_NAME}</p>
                    <p className={styles.avatarSub}>Thành viên SmartLocker</p>
                </div>

                {/* Toast */}
                {saved && (
                    <div className={styles.toast}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2.5">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        Đã lưu thông tin thành công
                    </div>
                )}

                {/* Fields */}
                <div className={styles.card}>
                    {fields.map((field, idx) => (
                        <div
                            key={field.key}
                            className={`${styles.fieldRow} ${idx !== fields.length - 1 ? styles.fieldBorder : ''}`}
                        >
                            <label className={styles.fieldLabel}>{field.label}</label>
                            {editing && field.editable ? (
                                <input
                                    className={styles.fieldInput}
                                    type={field.type ?? 'text'}
                                    value={field.value}
                                    placeholder={field.placeholder}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                />
                            ) : (
                                <span className={`${styles.fieldValue} ${!field.editable ? styles.fieldLocked : ''}`}>
                                    {field.value}
                                    {!field.editable && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                                        </svg>
                                    )}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <p className={styles.note}>
                    🔒 Email không thể thay đổi. Liên hệ hỗ trợ nếu cần cập nhật.
                </p>

                {editing && (
                    <button className={styles.cancelBtn} onClick={() => {
                        setEditing(false);
                        setFields(INITIAL_FIELDS)
                    }}>
                        Hủy thay đổi
                    </button>
                )}
            </div>

            <BottomNav/>
        </div>
    )
}