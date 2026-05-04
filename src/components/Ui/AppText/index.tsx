import type { HTMLAttributes, ReactNode } from "react";
import styles from "./AppText.module.css";

type AppTextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "label"
  | "error";

type AppTextProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "label";
  variant?: AppTextVariant;
  children: ReactNode;
};

export function AppText({
  as: Tag = "p",
  variant = "body",
  className = "",
  children,
  ...props
}: AppTextProps) {
  return (
    <Tag
      className={`${styles.text} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
