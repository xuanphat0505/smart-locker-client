import {useNavigate} from 'react-router-dom'
import styles from './TermsOfService.module.css'

export default function TermsOfService() {
    const navigate = useNavigate()

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className={styles.title}>Điều khoản dịch vụ</h1>
            </header>

            <div className={styles.content}>
                <p className={styles.updated}>Cập nhật lần cuối: 01/01/2025</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Chấp nhận điều khoản</h2>
                    <p>Bằng cách sử dụng ứng dụng SmartLocker, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và
                        điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng
                        không sử dụng dịch vụ của chúng tôi.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Mô tả dịch vụ</h2>
                    <p>SmartLocker cung cấp dịch vụ tủ khóa thông minh cho phép người dùng:</p>
                    <ul className={styles.list}>
                        <li>Nhận hàng hóa tại các tủ khóa thông minh được đặt tại nhiều địa điểm.</li>
                        <li>Tra cứu trạng thái đơn hàng và lịch sử giao nhận.</li>
                        <li>Sử dụng mã OTP để mở tủ và lấy hàng an toàn.</li>
                        <li>Nhận thông báo khi có kiện hàng mới.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Tài khoản người dùng</h2>
                    <p>Để sử dụng dịch vụ SmartLocker, bạn phải:</p>
                    <ul className={styles.list}>
                        <li>Đăng ký tài khoản với thông tin chính xác và đầy đủ.</li>
                        <li>Duy trì bảo mật thông tin đăng nhập của mình.</li>
                        <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép.</li>
                        <li>Chịu trách nhiệm về mọi hoạt động diễn ra trên tài khoản của bạn.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Quyền và nghĩa vụ người dùng</h2>
                    <p>Người dùng có quyền:</p>
                    <ul className={styles.list}>
                        <li>Truy cập và sử dụng dịch vụ theo đúng điều khoản.</li>
                        <li>Yêu cầu hỗ trợ kỹ thuật khi gặp sự cố.</li>
                        <li>Xóa tài khoản và yêu cầu xóa dữ liệu cá nhân.</li>
                    </ul>
                    <p className={styles.spacedText}>Người dùng có nghĩa vụ:</p>
                    <ul className={styles.list}>
                        <li>Không sử dụng dịch vụ cho các mục đích bất hợp pháp.</li>
                        <li>Không cố gắng truy cập trái phép vào hệ thống.</li>
                        <li>Không gửi nội dung gây hại, lừa đảo hoặc vi phạm pháp luật.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Giới hạn trách nhiệm</h2>
                    <p>SmartLocker không chịu trách nhiệm về:</p>
                    <ul className={styles.list}>
                        <li>Thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.</li>
                        <li>Mất mát dữ liệu do lỗi kỹ thuật ngoài tầm kiểm soát của chúng tôi.</li>
                        <li>Hành vi của bên thứ ba liên quan đến giao nhận hàng hóa.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Thay đổi điều khoản</h2>
                    <p>SmartLocker có quyền thay đổi các điều khoản này bất kỳ lúc nào. Chúng tôi sẽ thông báo cho người
                        dùng về những thay đổi quan trọng qua email hoặc thông báo trong ứng dụng. Việc tiếp tục sử dụng
                        dịch vụ sau khi thay đổi được coi là chấp nhận các điều khoản mới.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Liên hệ</h2>
                    <p>Nếu có câu hỏi về Điều khoản dịch vụ, vui lòng liên hệ:</p>
                    <div className={styles.contactBox}>
                        <p>📧 support@smartlocker.vn</p>
                        <p>📞 1900 1234</p>
                        <p>🏢 Tầng 5, Tòa nhà Tech Hub, TP. Hồ Chí Minh</p>
                    </div>
                </section>
            </div>
        </div>
    )
}
