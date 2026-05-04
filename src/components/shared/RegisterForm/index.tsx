import { useState } from "react";
import type { FormEvent } from "react";
import { EUserRole } from "@/types/user.types.ts";
import { useAuthStore } from "@/store/useAuthStore.ts";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import { AppInput } from "@/components/Ui/AppInput";
import { AppButton } from "@/components/Ui/AppButton";
import { AppText } from "@/components/Ui/AppText";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

type Props = {
  role: EUserRole;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
};

export function RegisterForm({ role, onSuccess, onSwitchToLogin }: Props) {
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localErr, setLocalErr] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const roleLabel = role === EUserRole.shipper ? "Shipper" : "Khách hàng";

  function validate() {
    if (name.trim().length < 2) {
      setLocalErr("Họ tên phải có ít nhất 2 ký tự");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      setLocalErr("Email không đúng định dạng");
      return false;
    }
    if (phone && !phoneRegex.test(phone.trim())) {
      setLocalErr("Số điện thoại không đúng định dạng");
      return false;
    }
    if (password.length < 6) {
      setLocalErr("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (password !== confirm) {
      setLocalErr("Mật khẩu xác nhận không khớp");
      return false;
    }
    if (!agreed) {
      setLocalErr("Vui lòng đồng ý với điều khoản dịch vụ");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalErr("");
    clearError();

    if (!validate()) return;

    const ok = await signUp({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      password,
      role,
    });

    if (ok) onSuccess();
  }

  const errorMsg = localErr || error;
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <AppText as="h1" variant="title">
          Đăng ký tài khoản {roleLabel}
        </AppText>
        <AppText variant="subtitle">
          Tham gia cộng đồng SmartLocker ngay hôm nay để trải nghiệm dịch vụ lưu
          trữ thông minh.
        </AppText>
      </div>

      {errorMsg && (
        <div
          className={styles.error}
          onClick={() => {
            setLocalErr("");
            clearError();
          }}
        >
          {errorMsg} <span>✕</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <AppInput
            label="Họ và tên"
            type="text"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            }
          />

          <AppInput
            label="Số điện thoại (tuỳ chọn)"
            type="tel"
            placeholder="0901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            }
          />
        </div>

        <div className={styles.card}>
          <AppInput
            label="Email"
            type="email"
            placeholder="email@vi-du.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            }
          />

          <AppInput
            label="Mật khẩu"
            type="password"
            placeholder="Tối thiểu 6 ký tự"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            }
          />

          <AppInput
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
          />
        </div>

        <div className={styles.terms}>
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Tôi đồng ý với{" "}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => navigate("/terms-of-service")}
            >
              Điều khoản dịch vụ
            </button>{" "}
            và{" "}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => navigate("/privacy-policy")}
            >
              Chính sách bảo mật
            </button>{" "}
            của SmartLocker.
          </span>
        </div>

        <AppButton type="submit" fullWidth size="lg" loading={isLoading}>
          Đăng ký
        </AppButton>
      </form>

      <p className={styles.footer}>
        Đã có tài khoản? <span onClick={onSwitchToLogin}>Đăng nhập</span>
      </p>
    </div>
  );
}
