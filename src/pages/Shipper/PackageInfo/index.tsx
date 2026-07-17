import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoUpload } from "@/components/Shipper/PhotoUpload";
import { useShipperStore } from "@/store/userShiperStore";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./PackageInfo.module.css";
import { AppInput } from "@/components/Ui/AppInput";
import { AppButton } from "@/components/Ui/AppButton";
import { AppText } from "@/components/Ui/AppText";

const SIZE_LABEL: Record<string, string> = {
  SMALL: "Nhỏ",
  MEDIUM: "Vừa",
  LARGE: "Lớn",
};

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export function PackageInfo() {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();

  const {
    selectedSlot,
    formData,
    isSubmitting,
    error,
    setFormField,
    submitShipment,
  } = useShipperStore();

  useEffect(() => {
    if (!selectedSlot) {
      navigate("/shipper", { replace: true });
    }
  }, [navigate, selectedSlot]);

  if (!selectedSlot) {
    return null;
  }

  const handleSubmit = async () => {
    await submitShipment();
    const { error: currentError, shipmentResult } = useShipperStore.getState();

    if (!currentError && shipmentResult) {
      navigate("/shipper/success");
    }
  };

  return (
    <div className={`page ${styles.page}`}>
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate("/shipper")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <h1 className="page-header__title">SmartLocker</h1>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title="Đổi giao diện"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="icon-btn"
            title="Đăng xuất"
            onClick={() => {
              signOut();
              navigate("/", { replace: true });
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      <div className="page-body">
        <div className={styles.titleBlock}>
          <AppText as="h2" variant="title">
            Thông tin bưu kiện
          </AppText>
          <AppText variant="subtitle">
            Vui lòng nhập đầy đủ thông tin để tiếp tục.
          </AppText>
        </div>

        <div className={styles.splitLayout}>
          <div className={styles.leftCol}>
            <div className={styles.formCard}>
              <AppInput
                label="Số điện thoại"
                type="tel"
                placeholder="0xxx xxx xxx"
                value={formData.recipientPhone}
                onChange={(e) => setFormField("recipientPhone", e.target.value)}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 12 19.79 19.79 0 01.44 3.37 2 2 0 012.42 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.4a16 16 0 006.72 6.72l.72-.72a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                }
              />

              <AppInput
                label="Tên người nhận"
                type="text"
                placeholder="Nhập tên người nhận"
                value={formData.recipientName}
                onChange={(e) => setFormField("recipientName", e.target.value)}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
            </div>

            <div className={styles.noteInputWrapper}>
              <AppInput
                multiline
                rows={3}
                label="Ghi chú cho khách hàng"
                placeholder="Ví dụ: Hàng dễ vỡ, vui lòng nhận sớm"
                value={formData.note ?? ""}
                onChange={(e) => setFormField("note", e.target.value)}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z" />
                  </svg>
                }
              />
            </div>

            <div className={styles.assignedCard}>
              <div className={styles.assignedIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div className={styles.assignedInfo}>
                <p className={styles.assignedLabel}>LOCKER ASSIGNED</p>
                <p className={styles.assignedVal}>
                  {selectedSlot.id} Ready
                  <span className={styles.assignedSize}>
                    {" "}
                    · {SIZE_LABEL[selectedSlot.size]}
                  </span>
                </p>
              </div>
              <div className={styles.assignedCheck}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <PhotoUpload />
          </div>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}
      </div>

      <footer className="page-footer">
        <AppButton
          fullWidth
          size="lg"
          loading={isSubmitting}
          onClick={() => {
            void handleSubmit();
          }}
          disabled={isSubmitting}
        >
          XÁC NHẬN GỬI HÀNG →
        </AppButton>
      </footer>
    </div>
  );
}
