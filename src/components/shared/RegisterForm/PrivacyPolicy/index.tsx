import {useNavigate} from 'react-router-dom'
import styles from './PrivacyPolicy.module.css'

export default function PrivacyPolicy() {
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
                <h1 className={styles.title}>Chính sách bảo mật</h1>
            </header>

            <div className={styles.content}>
                <p className={styles.updated}>Cập nhật lần cuối: 01/01/2025</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Giới thiệu</h2>
                    <p>SmartLocker cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này mô tả cách chúng tôi
                        thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng dịch vụ của chúng tôi.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Thông tin chúng tôi thu thập</h2>
                    <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
                    <ul className={styles.list}>
                        <li><strong>Thông tin cá nhân:</strong> Họ tên, địa chỉ email, số điện thoại khi bạn đăng ký tài
                            khoản.
                        </li>
                        <li><strong>Dữ liệu sử dụng:</strong> Lịch sử giao dịch, thời gian sử dụng tủ, địa điểm tủ.</li>
                        <li><strong>Thông tin thiết bị:</strong> Loại thiết bị, hệ điều hành, địa chỉ IP.</li>
                        <li><strong>Thông tin vị trí:</strong> Vị trí gần tủ khóa khi bạn cho phép (tuỳ chọn).</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Cách chúng tôi sử dụng thông tin</h2>
                    <p>Thông tin của bạn được sử dụng để:</p>
                    <ul className={styles.list}>
                        <li>Cung cấp và cải thiện dịch vụ SmartLocker.</li>
                        <li>Gửi thông báo OTP và cập nhật về đơn hàng.</li>
                        <li>Xác minh danh tính và ngăn chặn gian lận.</li>
                        <li>Hỗ trợ khách hàng khi cần thiết.</li>
                        <li>Phân tích và cải thiện trải nghiệm người dùng.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Chia sẻ thông tin</h2>
                    <p>Chúng tôi <strong>không bán</strong> thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia
                        sẻ thông tin trong các trường hợp:</p>
                    <ul className={styles.list}>
                        <li>Với đơn vị vận chuyển để xử lý giao nhận hàng hóa.</li>
                        <li>Khi có yêu cầu pháp lý từ cơ quan có thẩm quyền.</li>
                        <li>Với nhà cung cấp dịch vụ tin cậy hỗ trợ vận hành hệ thống.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Bảo mật dữ liệu</h2>
                    <p>Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin của bạn:</p>
                    <ul className={styles.list}>
                        <li>Mã hóa dữ liệu truyền tải bằng SSL/TLS.</li>
                        <li>Lưu trữ mật khẩu dưới dạng mã hóa (hash).</li>
                        <li>Kiểm soát truy cập nghiêm ngặt vào hệ thống nội bộ.</li>
                        <li>Giám sát và phát hiện xâm nhập 24/7.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Quyền của bạn</h2>
                    <p>Bạn có quyền:</p>
                    <ul className={styles.list}>
                        <li><strong>Truy cập:</strong> Yêu cầu xem dữ liệu cá nhân chúng tôi lưu trữ về bạn.</li>
                        <li><strong>Chỉnh sửa:</strong> Cập nhật thông tin cá nhân không chính xác.</li>
                        <li><strong>Xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu liên quan.</li>
                        <li><strong>Phản đối:</strong> Từ chối nhận thông tin marketing.</li>
                        <li><strong>Chuyển đổi:</strong> Nhận bản sao dữ liệu của bạn.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Thời gian lưu trữ</h2>
                    <p>Chúng tôi lưu trữ dữ liệu của bạn trong thời gian tài khoản còn hoạt động và tối đa 2 năm sau khi
                        xóa tài khoản, trừ khi pháp luật yêu cầu lưu trữ lâu hơn.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Cookie</h2>
                    <p>Ứng dụng SmartLocker sử dụng cookie và công nghệ lưu trữ cục bộ để duy trì phiên đăng nhập và cải
                        thiện trải nghiệm. Bạn có thể tắt cookie trong cài đặt thiết bị, tuy nhiên một số tính năng có
                        thể bị ảnh hưởng.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Liên hệ</h2>
                    <p>Để thực hiện quyền của mình hoặc có thắc mắc về chính sách bảo mật:</p>
                    <div className={styles.contactBox}>
                        <p>📧 privacy@smartlocker.vn</p>
                        <p>📞 1900 1234</p>
                        <p>🏢 Tầng 5, Tòa nhà Tech Hub, TP. Hồ Chí Minh</p>
                    </div>
                    <p className={styles.responseNote}>
                        Chúng tôi sẽ phản hồi trong vòng 30 ngày làm việc kể từ khi nhận được yêu cầu.
                    </p>
                </section>
            </div>
        </div>
    )
}
