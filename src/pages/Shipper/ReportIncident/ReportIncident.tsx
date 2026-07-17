import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ReportIncident.module.css';

interface IncidentReport {
  id: string;
  stationName: string;
  slotId: string;
  type: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'CANCELLED';
  createdAt: Date;
  photoUrl?: string;
  adminReply?: string;
}

const MOCK_STATIONS = [
  'Trạm SmartLocker - Tòa Nhà A',
  'Trạm Viettel Post - Bưu cục Cầu Giấy',
  'Trạm Giao Hàng Tiết Kiệm - Tòa B',
  'Trạm Giao Hàng Nhanh - Vincom Plaza',
  'Trạm SmartLocker - Đại học Quốc Gia'
];

const INCIDENT_TYPES = [
  { value: 'STUCK_DOOR', label: '🔒 Kẹt cửa tủ / Không thể đóng-mở' },
  { value: 'SCREEN_ERROR', label: '📱 Hỏng màn hình hiển thị cảm ứng' },
  { value: 'QR_ERROR', label: '📷 Đầu đọc mã QR không quét được' },
  { value: 'OFFLINE', label: '📡 Tủ mất kết nối / Ngoại tuyến' },
  { value: 'PHYSICAL_DAMAGE', label: '💥 Nứt vỡ, móp méo vỏ tủ bên ngoài' },
  { value: 'OTHER', label: '❓ Sự cố kỹ thuật khác' }
];

const TYPE_LABELS: Record<string, string> = {
  STUCK_DOOR: 'Kẹt cửa tủ',
  SCREEN_ERROR: 'Hỏng màn hình',
  QR_ERROR: 'Lỗi đầu đọc QR',
  OFFLINE: 'Tủ ngoại tuyến',
  PHYSICAL_DAMAGE: 'Hư hại vật lý',
  OTHER: 'Lỗi khác'
};

const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: 'REP-102',
    stationName: 'Trạm SmartLocker - Tòa Nhà A',
    slotId: 'B5',
    type: 'STUCK_DOOR',
    description: 'Cửa ngăn tủ không tự bung ra khi nhấn mở trên hệ thống, nghe tiếng chốt kẹt lạch cạch.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 5 * 24 * 3600000), // 5 days ago
    photoUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80',
    adminReply: 'Đã cử đội kỹ thuật viên đến thay chốt lò xo khóa cơ học vào lúc 14:00 ngày 13/07. Cửa tủ đã hoạt động bình thường.'
  },
  {
    id: 'REP-105',
    stationName: 'Trạm Giao Hàng Nhanh - Vincom Plaza',
    slotId: 'C2',
    type: 'QR_ERROR',
    description: 'Đầu đọc laser bị mờ sương, đưa mã vạch hay mã QR đều không phản hồi bíp bíp.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 6 * 3600000), // 6 hours ago
  }
];

export function ReportIncident() {
  const location = useLocation();
  const state = location.state as { slotId?: string } | null;

  // Form State
  const [station, setStation] = useState(MOCK_STATIONS[0]);
  const [slotId, setSlotId] = useState('');
  const [type, setType] = useState('STUCK_DOOR');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // List of reports
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle prefilled slot ID from History Page redirection
  useEffect(() => {
    if (state?.slotId) {
      setSlotId(state.slotId);
      // Automatically match station if possible, or keep default
      triggerToast(`📥 Đã điền sẵn mã ngăn tủ lỗi: Ngăn ${state.slotId}`);
    }
  }, [state]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotId.trim()) {
      alert('Vui lòng điền số ngăn tủ gặp sự cố!');
      return;
    }
    if (!description.trim()) {
      alert('Vui lòng mô tả chi tiết sự cố!');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newReport: IncidentReport = {
        id: `REP-${Math.floor(100 + Math.random() * 900)}`,
        stationName: station,
        slotId: slotId.toUpperCase(),
        type,
        description,
        status: 'PENDING',
        createdAt: new Date(),
        photoUrl: photoPreview || undefined
      };

      setReports(prev => [newReport, ...prev]);
      setIsSubmitting(false);
      triggerToast('✅ Đã gửi báo cáo sự cố thành công lên Admin để xử lý!');
      
      // Reset form
      setSlotId('');
      setDescription('');
      setPhotoPreview(null);
    }, 800);
  };

  const handleCancelReport = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy yêu cầu báo cáo sự cố này?')) {
      setReports(prev => prev.map(rep => {
        if (rep.id === id) {
          return { ...rep, status: 'CANCELLED' };
        }
        return rep;
      }));
      triggerToast('🗑️ Đã hủy yêu cầu báo cáo sự cố.');
    }
  };

  const formatDate = (d: Date) => {
    return d.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.page}>
      {toastMessage && (
        <div className={styles.toast}>
          <div className={styles.toastContent}>{toastMessage}</div>
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1 className={styles.title}>Báo cáo sự cố kỹ thuật</h1>
          <p className={styles.subtitle}>Gửi phản hồi lỗi tủ locker trực tiếp đến đội ngũ quản trị Admin</p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.layout}>
          {/* Left Panel: Incident Form */}
          <div className={styles.formCol}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Tạo phiếu báo cáo lỗi</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Trạm tủ Locker gặp lỗi:</label>
                  <select 
                    className={styles.select}
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                  >
                    {MOCK_STATIONS.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Ngăn tủ số (Slot ID):</label>
                    <input 
                      type="text" 
                      className={styles.input}
                      placeholder="Ví dụ: A2, B4..."
                      value={slotId}
                      onChange={(e) => setSlotId(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phân loại sự cố:</label>
                    <select 
                      className={styles.select}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {INCIDENT_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Mô tả chi tiết sự cố:</label>
                  <textarea 
                    className={styles.textarea}
                    placeholder="Mô tả hiện tượng lỗi (Ví dụ: Cửa tủ bị kẹt khóa, màn hình bị đơ, không mở được khi nhập OTP...)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Hình ảnh chụp hiện trường (Không bắt buộc):</label>
                  <div className={styles.photoUploadWrapper}>
                    {photoPreview ? (
                      <div className={styles.previewContainer}>
                        <img src={photoPreview} alt="Ảnh sự cố" className={styles.previewImage} />
                        <button type="button" className={styles.btnRemovePhoto} onClick={() => setPhotoPreview(null)}>✕ Xóa ảnh</button>
                      </div>
                    ) : (
                      <label className={styles.dropzone}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span>Nhấn để chọn ảnh lỗi tủ</span>
                        <input type="file" accept="image/*" className={styles.fileInput} onChange={handlePhotoChange} />
                      </label>
                    )}
                  </div>
                </div>

                <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi báo cáo...' : '🚀 Gửi báo cáo sự cố'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: Support Tickets History */}
          <div className={styles.historyCol}>
            <h2 className={styles.cardTitle} style={{ padding: '0 8px' }}>Yêu cầu hỗ trợ đã gửi ({reports.length})</h2>
            <div className={styles.ticketsList}>
              {reports.map(rep => {
                return (
                  <div key={rep.id} className={`${styles.ticketCard} ${styles[`ticket${rep.status}`]}`}>
                    <div className={styles.ticketHeader}>
                      <span className={styles.ticketId}>{rep.id}</span>
                      <span className={`${styles.statusBadge} ${styles[rep.status]}`}>
                        {rep.status === 'PENDING' ? '⏳ Chờ xử lý' : rep.status === 'RESOLVED' ? '✅ Đã khắc phục' : '🗑️ Đã hủy'}
                      </span>
                    </div>

                    <div className={styles.ticketBody}>
                      <h4 className={styles.ticketStation}>{rep.stationName}</h4>
                      <div className={styles.ticketMeta}>
                        <span>Ngăn tủ: <strong>{rep.slotId}</strong></span>
                        <span>Loại lỗi: <strong>{TYPE_LABELS[rep.type]}</strong></span>
                      </div>
                      <p className={styles.ticketDesc}>"{rep.description}"</p>
                      
                      {rep.photoUrl && (
                        <div className={styles.ticketPhotoWrapper}>
                          <img src={rep.photoUrl} alt="Minh chứng" className={styles.ticketPhoto} />
                        </div>
                      )}

                      {/* Admin response block */}
                      {rep.adminReply && (
                        <div className={styles.adminReplyBlock}>
                          <span className={styles.adminReplyTitle}>💬 Phản hồi từ Admin:</span>
                          <p className={styles.adminReplyText}>{rep.adminReply}</p>
                        </div>
                      )}
                    </div>

                    <div className={styles.ticketFooter}>
                      <span className={styles.ticketTime}>{formatDate(rep.createdAt)}</span>
                      {rep.status === 'PENDING' && (
                        <button className={styles.btnCancelReport} onClick={() => handleCancelReport(rep.id)}>
                          Hủy yêu cầu
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportIncident;
