import {useEffect, useRef, useState} from "react";
import styles from "./ChatAI.module.css";

export type MessageRole = "user" | "bot";

export interface ChatMessage {
    id: string;
    role: MessageRole;
    text: string;
    timestamp: Date;
    isTyping?: boolean;
}

export interface QuickSuggestion {
    id: string;
    label: string;
    prompt: string;
}

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
    {id: "1", label: "🔐 OTP là gì?", prompt: "OTP là gì và tôi dùng nó thế nào?"},
    {id: "2", label: "📦 Nhận hàng", prompt: "Làm sao để nhận hàng từ tủ locker?"},
    {id: "3", label: "⏱ OTP hết hạn", prompt: "OTP của tôi bị hết hạn, tôi phải làm gì?"},
    {id: "4", label: "📍 Tìm tủ", prompt: "Tủ locker của tôi ở đâu?"},
];

const getMockBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes("otp")) {
        return "Mã OTP là mã 6 số được gửi qua Zalo/SMS khi có kiện hàng vào tủ. Mã có hiệu lực trong **8 phút**. Bạn nhập mã tại màn hình *Mở tủ* để lấy hàng nhé! 🔐";
    }
    if (text.includes("nhận hàng") || text.includes("lấy hàng")) {
        return "Để nhận hàng:\n1️⃣ Kiểm tra thông báo OTP qua Zalo\n2️⃣ Vào mục **Mở tủ** trong app\n3️⃣ Nhập mã OTP 6 số\n4️⃣ Tủ sẽ tự động mở – lấy hàng và đóng cửa lại nhé!";
    }
    if (text.includes("hết hạn")) {
        return "Nếu OTP hết hạn, bạn nhấn **Gửi lại** tại màn hình nhập OTP. Hệ thống sẽ gửi mã mới qua Zalo trong vài giây. Lưu ý: mỗi mã chỉ dùng được **1 lần** nhé! ⏱";
    }
    if (text.includes("tủ") || text.includes("locker") || text.includes("ở đâu")) {
        return "Tủ locker của bạn đang đặt tại địa chỉ được hiển thị trong thông báo. Vào **Trang chủ** → phần *Hàng đang chờ* để xem chi tiết vị trí tủ nhé! 📍";
    }
    return "Xin chào! Tôi là trợ lý SmartLocker 🤖\nTôi có thể giúp bạn:\n• Hướng dẫn nhận hàng\n• Giải đáp về OTP\n• Tìm vị trí tủ\n• Các thắc mắc khác\n\nBạn cần hỗ trợ gì ạ?";
};

const BotAvatar = () => (
    <div className={styles.botAvatar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="8" width="18" height="12" rx="3" fill="white" fillOpacity="0.9"/>
            <rect x="8" y="5" width="8" height="4" rx="2" fill="white" fillOpacity="0.7"/>
            <circle cx="9" cy="14" r="2" fill="#3B5BDB"/>
            <circle cx="15" cy="14" r="2" fill="#3B5BDB"/>
            <rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="#3B5BDB"/>
            <line x1="6" y1="8" x2="4" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="18" y1="8" x2="20" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    </div>
);

const TypingIndicator = () => (
    <div className={styles.typingBubble}>
        <span className={styles.dot}/>
        <span className={styles.dot}/>
        <span className={styles.dot}/>
    </div>
);

const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
        <span key={i}>
      {line
          .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
          .map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**"))
                  return <strong key={j}>{part.slice(2, -2)}</strong>;
              if (part.startsWith("*") && part.endsWith("*"))
                  return <em key={j}>{part.slice(1, -1)}</em>;
              return part;
          })}
            {i < text.split("\n").length - 1 && <br/>}
    </span>
    ));
};

export function ChatAI() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "bot",
            text: "Xin chào! Tôi là trợ lý SmartLocker 🤖\nTôi có thể giúp bạn về OTP, nhận hàng, vị trí tủ và nhiều thứ khác. Bạn cần hỗ trợ gì ạ?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            text: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setShowSuggestions(false);
        setIsLoading(true);

        // TODO: Thay bằng API call tới BE khi có service
        // const response = await ChatAIService.sendMessage(text);
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));
        const botText = getMockBotResponse(text);

        const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "bot",
            text: botText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button
                    className={styles.backBtn}
                    onClick={() => window.history.back()}
                    aria-label="Quay lại"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className={styles.headerInfo}>
                    <div className={styles.headerAvatar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="8" width="18" height="12" rx="3" fill="white" fillOpacity="0.9"/>
                            <rect x="8" y="5" width="8" height="4" rx="2" fill="white" fillOpacity="0.6"/>
                            <circle cx="9" cy="14" r="2" fill="#3B5BDB"/>
                            <circle cx="15" cy="14" r="2" fill="#3B5BDB"/>
                        </svg>
                    </div>
                    <div>
                        <p className={styles.headerName}>Trợ lý SmartLocker</p>
                        <p className={styles.headerStatus}>
                            <span className={styles.statusDot}/>
                            Hoạt động
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.messageList}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.messageRow} ${msg.role === "user" ? styles.userRow : styles.botRow}`}
                    >
                        {msg.role === "bot" && <BotAvatar/>}
                        <div
                            className={`${styles.bubble} ${msg.role === "user" ? styles.userBubble : styles.botBubble}`}
                        >
                            {formatText(msg.text)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={`${styles.messageRow} ${styles.botRow}`}>
                        <BotAvatar/>
                        <TypingIndicator/>
                    </div>
                )}

                {showSuggestions && !isLoading && (
                    <div className={styles.suggestions}>
                        <p className={styles.suggestionsLabel}>Gợi ý nhanh</p>
                        <div className={styles.suggestionGrid}>
                            {QUICK_SUGGESTIONS.map((s) => (
                                <button
                                    key={s.id}
                                    className={styles.suggestionChip}
                                    onClick={() => sendMessage(s.prompt)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div ref={bottomRef}/>
            </div>

            <div className={styles.inputArea}>
                <div className={styles.inputWrapper}>
          <textarea
              ref={inputRef}
              className={styles.textInput}
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
          />
                    <button
                        className={`${styles.sendBtn} ${input.trim() ? styles.sendBtnActive : ""}`}
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isLoading}
                        aria-label="Gửi"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p className={styles.disclaimer}>
                    Trợ lý AI · Câu trả lời chỉ mang tính tham khảo
                </p>
            </div>
        </div>
    );
}

