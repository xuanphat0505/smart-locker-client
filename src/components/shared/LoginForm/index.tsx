import { useState } from "react";
import type { FormEvent } from "react";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { EUserRole } from "@/types/user.types.ts";
import styles from "./LoginForm.module.css";
import { AppInput } from "@/components/Ui/AppInput";
import { AppButton } from "@/components/Ui/AppButton";
import { AppText } from "@/components/Ui/AppText";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  role: EUserRole;
  onSuccess: () => void;
  onSwitchToRegister: () => void;
};

export function LoginForm({ role, onSuccess, onSwitchToRegister }: Props) {
  const { signIn, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localErr, setLocalErr] = useState("");

  function validate() {
    if (!emailRegex.test(email.trim())) {
      setLocalErr("Email không đúng định dạng");
      return false;
    }
    if (password.length < 6) {
      setLocalErr("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalErr("");
    clearError();

    if (!validate()) return;

    const ok = await signIn({
      email: email.trim(),
      password,
      role,
    });

    if (ok) onSuccess();
  }

  const errorMsg = localErr || error;
  const roleLabel = role === EUserRole.shipper ? "Shipper" : "Khách hàng";

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <AppText as="h1" variant="title">
          Đăng nhập {roleLabel}
        </AppText>
        <AppText variant="subtitle">
          Chào mừng trở lại! Đăng nhập để tiếp tục sử dụng dịch vụ SmartLocker.
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
            placeholder="••••••••"
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
        </div>

        <AppButton type="submit" fullWidth size="lg" loading={isLoading}>
          Đăng nhập
        </AppButton>
      </form>

      <p className={styles.footer}>
        Chưa có tài khoản?{" "}
        <span onClick={onSwitchToRegister}>Đăng ký ngay</span>
      </p>
    </div>
  );
}
