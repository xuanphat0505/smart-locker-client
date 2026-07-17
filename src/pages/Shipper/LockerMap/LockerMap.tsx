import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LockerMap.module.css';

interface LockerStation {
  id: string;
  name: string;
  address: string;
  company: string;
  distance: string;
  availSlots: {
    small: number;
    medium: number;
    large: number;
  };
  coords: { x: number; y: number }; // Percentage coords on mock vector map
  lat: number;
  lng: number;
  status: 'active' | 'maintenance' | 'full';
}

const MOCK_STATIONS: LockerStation[] = [
  {
    id: 'ST-01',
    name: 'Trạm SmartLocker - Tòa Nhà A',
    address: 'Sảnh chính Tòa A, Đường Trần Duy Hưng, Cầu Giấy, Hà Nội',
    company: 'SmartLocker Inc',
    distance: '250 m',
    availSlots: { small: 8, medium: 4, large: 2 },
    coords: { x: 30, y: 40 },
    lat: 21.0065,
    lng: 105.7985,
    status: 'active'
  },
  {
    id: 'ST-02',
    name: 'Trạm Viettel Post - Bưu cục Cầu Giấy',
    address: 'Số 15, Ngõ 82, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    company: 'Viettel Post',
    distance: '650 m',
    availSlots: { small: 3, medium: 0, large: 1 },
    coords: { x: 55, y: 25 },
    lat: 21.0285,
    lng: 105.7820,
    status: 'active'
  },
  {
    id: 'ST-03',
    name: 'Trạm Giao Hàng Tiết Kiệm - Tòa B',
    address: 'Hầm gửi xe B2, Tòa B, Nguyễn Chí Thanh, Đống Đa, Hà Nội',
    company: 'GHTK',
    distance: '1.1 km',
    availSlots: { small: 12, medium: 7, large: 4 },
    coords: { x: 25, y: 70 },
    lat: 21.0205,
    lng: 105.8080,
    status: 'active'
  },
  {
    id: 'ST-04',
    name: 'Trạm Giao Hàng Nhanh - Vincom Plaza',
    address: 'Sân sau Trung tâm thương mại Vincom, Cầu Giấy, Hà Nội',
    company: 'GHN',
    distance: '1.5 km',
    availSlots: { small: 0, medium: 2, large: 0 },
    coords: { x: 75, y: 65 },
    lat: 21.0360,
    lng: 105.7915,
    status: 'full'
  },
  {
    id: 'ST-05',
    name: 'Trạm SmartLocker - Đại học Quốc Gia',
    address: 'Khuôn viên Ký túc xá Đại học Quốc Gia, Xuân Thủy, Cầu Giấy, Hà Nội',
    company: 'SmartLocker Inc',
    distance: '1.9 km',
    availSlots: { small: 5, medium: 3, large: 0 },
    coords: { x: 45, y: 80 },
    lat: 21.0375,
    lng: 105.7815,
    status: 'active'
  }
];

const COMPANY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'SmartLocker Inc': { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6', dot: '#3b82f6' },
  'Viettel Post': { bg: 'rgba(239, 68, 68, 0.12)', text: '#ef4444', dot: '#ef4444' },
  'GHTK': { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981', dot: '#10b981' },
  'GHN': { bg: 'rgba(249, 115, 22, 0.12)', text: '#f97316', dot: '#f97316' },
};

export function LockerMap() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<LockerStation>(MOCK_STATIONS[0]);

  // Filters logic
  const filteredStations = MOCK_STATIONS.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          st.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany ? st.company === selectedCompany : true;
    return matchesSearch && matchesCompany;
  });

  const companies = ['All', 'SmartLocker Inc', 'Viettel Post', 'GHTK', 'GHN'];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1 className={styles.title}>Bản đồ mạng lưới Locker</h1>
          <p className={styles.subtitle}>Tìm kiếm trạm tủ đối tác trống ngăn để ký gửi hàng</p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.layout}>
          {/* Left panel: List and search */}
          <div className={styles.leftCol}>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm trạm hoặc địa chỉ..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Company chips filter */}
              <div className={styles.chipsRow}>
                {companies.map(comp => {
                  const label = comp === 'All' ? 'Tất cả' : comp;
                  const active = comp === 'All' ? selectedCompany === null : selectedCompany === comp;
                  return (
                    <button
                      key={comp}
                      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                      onClick={() => setSelectedCompany(comp === 'All' ? null : comp)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.listContainer}>
              {filteredStations.length === 0 ? (
                <div className={styles.empty}>
                  <p>Không tìm thấy trạm tủ phù hợp</p>
                </div>
              ) : (
                filteredStations.map(st => {
                  const colors = COMPANY_COLORS[st.company] || { bg: '#e2e8f0', text: '#64748b', dot: '#64748b' };
                  const isSelected = selectedStation.id === st.id;
                  return (
                    <div
                      key={st.id}
                      className={`${styles.stationItem} ${isSelected ? styles.stationActive : ''}`}
                      onClick={() => setSelectedStation(st)}
                    >
                      <div className={styles.stationTop}>
                        <span className={styles.badge} style={{ backgroundColor: colors.bg, color: colors.text }}>
                          {st.company}
                        </span>
                        <span className={styles.distance}>{st.distance}</span>
                      </div>
                      <h3 className={styles.stationName}>{st.name}</h3>
                      <p className={styles.stationAddress}>{st.address}</p>

                      <div className={styles.slotsStatus}>
                        <div className={styles.slotItem}>
                          <span className={styles.slotLabel}>S:</span>
                          <span className={st.availSlots.small > 0 ? styles.slotCount : styles.slotCountZero}>
                            {st.availSlots.small} trống
                          </span>
                        </div>
                        <div className={styles.slotItem}>
                          <span className={styles.slotLabel}>M:</span>
                          <span className={st.availSlots.medium > 0 ? styles.slotCount : styles.slotCountZero}>
                            {st.availSlots.medium} trống
                          </span>
                        </div>
                        <div className={styles.slotItem}>
                          <span className={styles.slotLabel}>L:</span>
                          <span className={st.availSlots.large > 0 ? styles.slotCount : styles.slotCountZero}>
                            {st.availSlots.large} trống
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right panel: Vector Map and detail popup */}
          <div className={styles.rightCol}>
            <div className={styles.mapFrame}>
              {/* Interactive Vector Map drawing city roads/parks/river */}
              <svg className={styles.vectorMap} width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                {/* Background map base */}
                <rect width="100%" height="100%" fill="var(--map-bg, #111827)" />
                
                {/* Parks and green areas */}
                <rect x="20" y="30" width="100" height="90" rx="10" fill="var(--map-green, rgba(16, 185, 129, 0.08))" />
                <rect x="250" y="240" width="120" height="110" rx="15" fill="var(--map-green, rgba(16, 185, 129, 0.08))" />

                {/* River path */}
                <path d="M -20,200 Q 100,210 180,180 T 350,150 T 420,130" fill="none" stroke="var(--map-river, #3b82f6)" strokeWidth="18" strokeOpacity="0.25" strokeLinecap="round" />
                <path d="M -20,200 Q 100,210 180,180 T 350,150 T 420,130" fill="none" stroke="var(--map-river-inner, #60a5fa)" strokeWidth="6" strokeOpacity="0.5" strokeLinecap="round" />

                {/* Road grid lines */}
                <line x1="0" y1="80" x2="400" y2="80" stroke="var(--map-road, #374151)" strokeWidth="6" />
                <line x1="0" y1="280" x2="400" y2="280" stroke="var(--map-road, #374151)" strokeWidth="6" />
                <line x1="120" y1="0" x2="120" y2="400" stroke="var(--map-road, #374151)" strokeWidth="6" />
                <line x1="280" y1="0" x2="280" y2="400" stroke="var(--map-road, #374151)" strokeWidth="6" />

                {/* Diagonals/Secondary streets */}
                <line x1="0" y1="0" x2="400" y2="400" stroke="var(--map-road-thin, #1f2937)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="400" y1="0" x2="0" y2="400" stroke="var(--map-road-thin, #1f2937)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Pins layer absolutely positioned on top of the vector map */}
              <div className={styles.pinsLayer}>
                {filteredStations.map(st => {
                  const colors = COMPANY_COLORS[st.company] || { bg: '#94a3b8', text: '#ffffff', dot: '#94a3b8' };
                  const isSelected = selectedStation.id === st.id;
                  return (
                    <button
                      key={st.id}
                      className={`${styles.mapPin} ${isSelected ? styles.pinSelected : ''}`}
                      style={{
                        left: `${st.coords.x}%`,
                        top: `${st.coords.y}%`,
                        '--pin-color': colors.dot
                      } as React.CSSProperties}
                      onClick={() => setSelectedStation(st)}
                      title={st.name}
                    >
                      {/* Pulse ring for selected pin */}
                      {isSelected && <span className={styles.pinPulse} style={{ borderColor: colors.dot }} />}
                      
                      {/* Central marker pin */}
                      <span className={styles.pinPoint} style={{ backgroundColor: colors.dot }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"/>
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Floating Bottom Card: details for selected station */}
              <div className={styles.popupCard}>
                <div className={styles.popupHeader}>
                  <div>
                    <span className={styles.badge} style={{ backgroundColor: COMPANY_COLORS[selectedStation.company]?.bg, color: COMPANY_COLORS[selectedStation.company]?.text }}>
                      {selectedStation.company}
                    </span>
                    <h3 className={styles.popupName}>{selectedStation.name}</h3>
                  </div>
                  <span className={styles.popupDist}>{selectedStation.distance}</span>
                </div>
                <p className={styles.popupAddress}>{selectedStation.address}</p>

                <div className={styles.popupStats}>
                  <div className={styles.popupSlot}>
                    <span className={styles.slotBadge}>S</span>
                    <span className={selectedStation.availSlots.small > 0 ? styles.slotText : styles.slotTextZero}>
                      {selectedStation.availSlots.small} trống
                    </span>
                  </div>
                  <div className={styles.popupSlot}>
                    <span className={styles.slotBadge}>M</span>
                    <span className={selectedStation.availSlots.medium > 0 ? styles.slotText : styles.slotTextZero}>
                      {selectedStation.availSlots.medium} trống
                    </span>
                  </div>
                  <div className={styles.popupSlot}>
                    <span className={styles.slotBadge}>L</span>
                    <span className={selectedStation.availSlots.large > 0 ? styles.slotText : styles.slotTextZero}>
                      {selectedStation.availSlots.large} trống
                    </span>
                  </div>
                </div>

                <div className={styles.popupActions}>
                  <button className={styles.btnDirection} onClick={() => alert(`Đang mở bản đồ chỉ đường GPS tới: ${selectedStation.address}`)}>
                    🚗 Chỉ đường
                  </button>
                  <button className={styles.btnDeposit} onClick={() => navigate('/shipper')}>
                    📦 Ký gửi tại đây
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockerMap;
