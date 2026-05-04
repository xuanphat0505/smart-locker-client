import {useRef} from 'react'
import type {MouseEvent} from 'react'
import {useShipperStore} from '@/store/userShiperStore.ts'
import styles from './PhotoUpload.module.css'

export function PhotoUpload() {
    const inputRef = useRef<HTMLInputElement>(null)
    const {formData, setFormField} = useShipperStore()
    const hasPhoto = !!formData.photoPreviewUrl

    const handlePhotoChange = (file: File) => {
        if (formData.photoPreviewUrl) {
            URL.revokeObjectURL(formData.photoPreviewUrl)
        }
        setFormField('photoFile', file)
        setFormField('photoPreviewUrl', URL.createObjectURL(file))
    }

    const handleRemovePhoto = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (formData.photoPreviewUrl) {
            URL.revokeObjectURL(formData.photoPreviewUrl)
        }
        setFormField('photoFile', null)
        setFormField('photoPreviewUrl', '')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className={styles.section}>
            <p className={styles.label}>CHỤP ẢNH MINH CHỨNG</p>
            <div
                className={`${styles.zone} ${hasPhoto ? styles.zoneFilled : ''}`}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
                {hasPhoto ? (
                    <div className={styles.previewWrap}>
                        <img src={formData.photoPreviewUrl} alt="Preview" className={styles.preview}/>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={handleRemovePhoto}
                            aria-label="Xóa ảnh"
                            title="Xóa ảnh"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2">
                                <path d="M18 6L6 18"/>
                                <path d="M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.icon}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2">
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                            </svg>
                        </div>
                        <p className={styles.title}>Chạm để chụp ảnh</p>
                        <p className={styles.sub}>Yêu cầu thấy rõ mã vận đơn</p>
                    </>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{display: 'none'}}
                onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handlePhotoChange(file)
                }}
            />
        </div>
    )
}
