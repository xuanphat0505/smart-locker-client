import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import styles from "./AppInput.module.css";

type BaseProps = {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  helperText?: string;
  className?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type AppInputProps = InputProps | TextareaProps;

export function AppInput(props: AppInputProps) {
  const {
    label,
    error,
    icon,
    rightElement,
    helperText,
    className = "",
    multiline,
    ...fieldProps
  } = props;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.controlWrap} ${error ? styles.controlWrapError : ""}`}
      >
        {icon && <span className={styles.icon}>{icon}</span>}

        {multiline ? (
          <textarea
            className={`${styles.control} ${styles.textarea} ${icon ? styles.withIcon : ""} ${rightElement ? styles.withRightElement : ""}`}
            {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={`${styles.control} ${icon ? styles.withIcon : ""} ${rightElement ? styles.withRightElement : ""}`}
            {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {rightElement && <span className={styles.rightElement}>{rightElement}</span>}
      </div>

      {(error || helperText) && (
        <p className={`${styles.message} ${error ? styles.error : ""}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
