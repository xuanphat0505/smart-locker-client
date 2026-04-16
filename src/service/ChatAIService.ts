/**
 * ChatAIService – placeholder cho BE integration
 *
 * Khi BE sẵn sàng, implement các method bên dưới và xoá mock ở ChatAI.tsx
 *
 * Suggested BE endpoints:
 *   POST /api/chat/message        → gửi tin nhắn, nhận phản hồi AI
 *   GET  /api/chat/history        → lấy lịch sử chat của user
 *   POST /api/chat/train          → (admin) thêm intent/answer mới
 *
 * Training data nên cover các intent:
 *   - otp_explain      : OTP là gì, dùng thế nào
 *   - otp_expired      : OTP hết hạn
 *   - otp_resend       : Gửi lại OTP
 *   - package_pickup   : Cách nhận hàng
 *   - locker_location  : Tìm vị trí tủ
 *   - locker_not_open  : Tủ không mở được
 *   - history_order    : Xem lịch sử đơn hàng
 *   - profile_update   : Đổi thông tin cá nhân
 *   - greeting         : Lời chào
 *   - fallback         : Câu hỏi ngoài scope
 */

export interface SendMessagePayload {
    message: string;
    userId: string;
    sessionId?: string;
}

export interface SendMessageResponse {
    reply: string;
    sessionId: string;
    intent?: string;
    confidence?: number;
}

export interface ChatHistoryItem {
    id: string;
    role: "user" | "bot";
    text: string;
    timestamp: string;
}

// TODO: thay BASE_URL bằng env variable
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const ChatAIService = {

    async sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
        const res = await fetch(`${BASE_URL}/api/chat/message`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Chat API error");
        return res.json();
    },

    /**
     * Lấy lịch sử chat (optional – tuỳ yêu cầu UX)
     */
    async getHistory(userId: string): Promise<ChatHistoryItem[]> {
        const res = await fetch(`${BASE_URL}/api/chat/history?userId=${userId}`);
        if (!res.ok) throw new Error("History API error");
        return res.json();
    },
};