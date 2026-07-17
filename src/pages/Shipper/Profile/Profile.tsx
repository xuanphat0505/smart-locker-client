import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './Profile.module.css';

export function ShipperProfile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  // Tabs management
  const [activeTab, setActiveTab] = useState<'INFO' | 'PASSWORD' | 'NOTIFICATIONS'>('INFO');
  
  // Info Form State
  const [name, setName] = useState(user?.name || 'Shipper Hệ thống');
  const [phone, setPhone] = useState(user?.phone || '0987654321');
  const [email, setEmail] = useState(user?.email || 'shipper@smartlocker.vn');
  const [courier, setCourier] = useState('GHTK');
  const [licensePlate, setLicensePlate] = useState('29-E1 123.45');
  const [operationArea, setOperationArea] = useState('Quận Cầu Giấy, Hà Nội');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notification Toggles State
  const [notifyCustomerReceived, setNotifyCustomerReceived] = useState(true);
  const [notifyOverdueWarning, setNotifyOverdueWarning] = useState(true);
  const [notifyMaintenanceUpdate, setNotifyMaintenanceUpdate] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('✅ Đã cập nhật thông tin cá nhân Shipper thành công!');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp với mật khẩu mới!');
      return;
    }

    triggerToast('✅ Đã thay đổi mật khẩu tài khoản thành công!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    triggerToast('✅ Đã lưu cấu hình nhận thông báo bưu cục!');
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi cổng Shipper?')) {
      signOut();
      navigate('/', { replace: true });
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .slice(-2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
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
          <h1 className={styles.title}>Quản lý tài khoản tôi</h1>
          <p className={styles.subtitle}>Quản lý thông tin shipper, cấu hình bảo mật và nhận thông báo đơn hàng</p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.layout}>
          {/* Left panel: Profile Overview & Tabs */}
          <div className={styles.sidebarPanel}>
            <div className={styles.profileOverview}>
              <div className={styles.avatar}>
                {getInitials(name)}
              </div>
              <h2 className={styles.profileName}>{name}</h2>
              <span className={styles.shipperId}>Mã Shipper: {user?.id.slice(-8).toUpperCase() || 'SH-84291'}</span>
              <span className={styles.companyBadge}>{courier} Partner</span>
            </div>

            <div className={styles.tabMenu}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'INFO' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('INFO')}
              >
                👤 Thông tin cá nhân
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'PASSWORD' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('PASSWORD')}
              >
                🔑 Thay đổi mật khẩu
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'NOTIFICATIONS' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('NOTIFICATIONS')}
              >
                🔔 Cài đặt thông báo
              </button>
            </div>

            <button className={styles.btnLogout} onClick={handleLogout}>
              Đăng xuất cổng Shipper
            </button>
          </div>

          {/* Right panel: Detail edit forms */}
          <div className={styles.formPanel}>
            {activeTab === 'INFO' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Thông tin cá nhân</h3>
                <form onSubmit={handleSaveInfo} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Họ và tên:</label>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Số điện thoại:</label>
                      <input 
                        type="tel" 
                        className={styles.input} 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Địa chỉ Email:</label>
                    <input 
                      type="email" 
                      className={styles.input} 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Hãng vận chuyển vận hành:</label>
                      <select 
                        className={styles.select}
                        value={courier}
                        onChange={(e) => setCourier(e.target.value)}
                      >
                        <option value="Viettel Post">Viettel Post</option>
                        <option value="GHTK">Giao Hàng Tiết Kiệm (GHTK)</option>
                        <option value="GHN">Giao Hàng Nhanh (GHN)</option>
                        <option value="Ahamove">Ahamove</option>
                        <option value="GrabExpress">GrabExpress</option>
                        <option value="Khác">Khác / Tự do</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Biển số xe vận chuyển:</label>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={licensePlate} 
                        onChange={(e) => setLicensePlate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Khu vực tuyến đường chạy ship chính:</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={operationArea} 
                      onChange={(e) => setOperationArea(e.target.value)}
                      placeholder="Ví dụ: Quận Cầu Giấy, Nam Từ Liêm..."
                    />
                  </div>

                  <button type="submit" className={styles.btnSave}>
                    💾 Lưu thay đổi thông tin
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'PASSWORD' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Thay đổi mật khẩu tài khoản</h3>
                <form onSubmit={handleSavePassword} className={styles.form}>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Mật khẩu hiện tại:</label>
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={showCurrent ? 'text' : 'password'} 
                        className={styles.input} 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        required 
                      />
                      <button 
                        type="button" 
                        className={styles.btnToggleVisible}
                        onClick={() => setShowCurrent(!showCurrent)}
                      >
                        {showCurrent ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Mật khẩu mới:</label>
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={showNew ? 'text' : 'password'} 
                        className={styles.input} 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        required 
                      />
                      <button 
                        type="button" 
                        className={styles.btnToggleVisible}
                        onClick={() => setShowNew(!showNew)}
                      >
                        {showNew ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Xác nhận mật khẩu mới:</label>
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={showConfirm ? 'text' : 'password'} 
                        className={styles.input} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu mới"
                        required 
                      />
                      <button 
                        type="button" 
                        className={styles.btnToggleVisible}
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className={styles.btnSave}>
                    🔐 Cập nhật mật khẩu mới
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'NOTIFICATIONS' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Thiết lập nhận thông báo bưu cục</h3>
                <div className={styles.form} style={{ gap: '20px' }}>
                  
                  <div className={styles.notifyOption}>
                    <div className={styles.notifyTexts}>
                      <h4 className={styles.notifyLabel}>Thông báo Khách nhận hàng</h4>
                      <p className={styles.notifyDesc}>Gửi thông báo đẩy và cập nhật danh sách lịch sử khi khách hàng nhập OTP lấy hàng thành công.</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifyCustomerReceived}
                        onChange={(e) => setNotifyCustomerReceived(e.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>

                  <div className={styles.notifyOption}>
                    <div className={styles.notifyTexts}>
                      <h4 className={styles.notifyLabel}>Cảnh báo bưu kiện Quá hạn</h4>
                      <p className={styles.notifyDesc}>Cảnh báo ngay lập tức qua SMS/Zalo khi bưu kiện nằm trong tủ locker vượt quá 24h quy định để shipper đến thu hồi.</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifyOverdueWarning}
                        onChange={(e) => setNotifyOverdueWarning(e.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>

                  <div className={styles.notifyOption}>
                    <div className={styles.notifyTexts}>
                      <h4 className={styles.notifyLabel}>Cập nhật tình trạng trạm Locker</h4>
                      <p className={styles.notifyDesc}>Nhận thông báo khi các trạm tủ locker thuộc tuyến chạy ship của bạn gặp sự cố kỹ thuật hoặc bảo trì.</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifyMaintenanceUpdate}
                        onChange={(e) => setNotifyMaintenanceUpdate(e.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>

                  <button className={styles.btnSave} style={{ marginTop: '8px' }} onClick={handleSaveNotifications}>
                    💾 Lưu thiết lập thông báo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipperProfile;
