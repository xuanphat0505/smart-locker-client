import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShipmentHistory.module.css';

interface ShipmentItem {
  id: string;
  orderCode: string;
  recipientName: string;
  recipientPhone: string;
  slotId: string;
  slotLocation: string;
  slotSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  arrivedAt: Date;
  photoUrl: string;
  note?: string;
}

const INITIAL_SHIPMENTS: ShipmentItem[] = [
  {
    id: 'SH-01',
    orderCode: 'GHN-9847192',
    recipientName: 'Nguyễn Văn An',
    recipientPhone: '0987654321',
    slotId: 'A2',
    slotLocation: 'Trạm Tòa Nhà A · Khu A · Tầng 1',
    slotSize: 'SMALL',
    arrivedAt: new Date(Date.now() - 3 * 3600000), // 3 hours ago
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
    note: 'Hàng hộp carton nhỏ, để cẩn thận'
  },
  {
    id: 'SH-02',
    orderCode: 'VTP-8472918',
    recipientName: 'Trần Thị Bình',
    recipientPhone: '0912345678',
    slotId: 'B3',
    slotLocation: 'Trạm Tòa Nhà A · Khu A · Tầng 1',
    slotSize: 'MEDIUM',
    arrivedAt: new Date(Date.now() - 28 * 3600000), // 28 hours ago
    photoUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
    note: 'Giao hỏa tốc trước 5h chiều'
  },
  {
    id: 'SH-03',
    orderCode: 'GHTK-9028471',
    recipientName: 'Phạm Hồng Quân',
    recipientPhone: '0905558888',
    slotId: 'C1',
    slotLocation: 'Trạm Đại học Quốc Gia · Xuân Thủy',
    slotSize: 'LARGE',
    arrivedAt: new Date(Date.now() - 52 * 3600000), // 52 hours ago
    photoUrl: 'https://images.unsplash.com/photo-1566576912321-d58ded7a214f?w=400&q=80',
    note: 'Hộp to nặng 5kg'
  },
  {
    id: 'SH-04',
    orderCode: 'AHA-1827492',
    recipientName: 'Lê Hoàng Minh',
    recipientPhone: '0888999222',
    slotId: 'A4',
    slotLocation: 'Trạm Vincom Plaza · Cầu Giấy',
    slotSize: 'SMALL',
    arrivedAt: new Date(Date.now() - 10 * 3600000),
    photoUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
  },
  {
    id: 'SH-05',
    orderCode: 'GHN-1123490',
    recipientName: 'Vũ Hoài Nam',
    recipientPhone: '0977666555',
    slotId: 'B4',
    slotLocation: 'Trạm Tòa Nhà A · Khu A · Tầng 1',
    slotSize: 'MEDIUM',
    arrivedAt: new Date(Date.now() - 1.2 * 3600000), // 1.2 hours ago
    photoUrl: 'https://images.unsplash.com/photo-1580913180963-c79314e4135a?w=400&q=80',
  }
];

const SIZE_LABEL = {
  SMALL: 'Size S',
  MEDIUM: 'Size M',
  LARGE: 'Size L'
};

export function ShipmentHistory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null);

  const filteredShipments = INITIAL_SHIPMENTS.filter(s => {
    return s.orderCode.toLowerCase().includes(search.toLowerCase()) || 
           s.recipientPhone.includes(search) || 
           s.recipientName.toLowerCase().includes(search.toLowerCase());
  });

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
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1 className={styles.title}>Lịch sử ký gửi hàng</h1>
          <p className={styles.subtitle}>Danh sách các bưu kiện đã được bạn giao và ký gửi vào tủ locker thành công</p>
        </div>
      </header>

      <div className={styles.body}>
        {/* Simple count info */}
        <div className={styles.statsSummary}>
          <span>Tổng số đơn đã ký gửi: <strong>{INITIAL_SHIPMENTS.length} đơn</strong></span>
        </div>

        {/* Search controls */}
        <div className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Tìm theo Mã vận đơn, Tên hoặc SĐT người nhận..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Shipment Cards Grid */}
        <div className={styles.listLayout}>
          <div className={styles.cardsGrid}>
            {filteredShipments.length === 0 ? (
              <div className={styles.empty}>
                <p>Không tìm thấy đơn ký gửi nào khớp.</p>
              </div>
            ) : (
              filteredShipments.map(item => {
                const active = selectedShipment?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`${styles.card} ${active ? styles.cardActive : ''}`}
                    onClick={() => setSelectedShipment(item)}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.orderCode}>{item.orderCode}</span>
                      <span className={styles.statusBadge}>Đã ký gửi</span>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Người nhận:</span>
                        <span className={styles.value}>{item.recipientName} ({item.recipientPhone})</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Vị trí tủ:</span>
                        <span className={styles.value}>Ngăn {item.slotId} · {SIZE_LABEL[item.slotSize]}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Gửi lúc:</span>
                        <span className={styles.value}>{formatDate(item.arrivedAt)}</span>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <button className={styles.btnDetails} onClick={() => setSelectedShipment(item)}>
                        Chi tiết đơn →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Details panel on the right (Desktop) */}
          {selectedShipment && (
            <div className={styles.detailsPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Chi tiết ký gửi</h2>
                <button className={styles.btnClose} onClick={() => setSelectedShipment(null)}>✕</button>
              </div>

              <div className={styles.panelBody}>
                {/* Photo proof */}
                <div className={styles.photoContainer}>
                  <p className={styles.sectionLabel}>ẢNH MINH CHỨNG KÝ GỬI</p>
                  <img src={selectedShipment.photoUrl} alt="Ảnh bưu kiện" className={styles.packagePhoto} />
                </div>

                <div className={styles.panelDetailsList}>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Mã vận đơn:</span>
                    <span className={styles.panelValue}>{selectedShipment.orderCode}</span>
                  </div>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Khách nhận hàng:</span>
                    <span className={styles.panelValue}>{selectedShipment.recipientName}</span>
                  </div>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Số điện thoại:</span>
                    <span className={styles.panelValue}>{selectedShipment.recipientPhone}</span>
                  </div>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Ngăn tủ:</span>
                    <span className={styles.panelValue}>Ngăn {selectedShipment.slotId} ({SIZE_LABEL[selectedShipment.slotSize]})</span>
                  </div>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Vị trí trạm tủ:</span>
                    <span className={styles.panelValue}>{selectedShipment.slotLocation}</span>
                  </div>
                  <div className={styles.panelRow}>
                    <span className={styles.panelLabel}>Thời điểm gửi:</span>
                    <span className={styles.panelValue}>{formatDate(selectedShipment.arrivedAt)}</span>
                  </div>
                  {selectedShipment.note && (
                    <div className={styles.panelRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                      <span className={styles.panelLabel}>Ghi chú ký gửi:</span>
                      <span className={styles.panelValue} style={{ background: 'var(--surface-2)', padding: '8px 12px', borderRadius: 8, width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
                        {selectedShipment.note}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.panelActions}>
                  <button className={styles.btnReport} onClick={() => navigate('/shipper/report', { state: { slotId: selectedShipment.slotId } })}>
                    🚨 Báo sự cố về ngăn tủ này
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShipmentHistory;
